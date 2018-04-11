<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 区域配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="区域名称")
                            el-input(placeholder="输入区域名称，请勿带符号" v-model="searchMsg.keyword")
                        //- el-form-item(label="下属片区" style="margin-left: 80px;")
                            el-input(placeholder="输入片区关键字，请勿带符号" v-model="searchMsg.childAreaName")
                    el-button(type="primary" icon="search" @click="tableList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add" v-if="!notOp") 添加区域

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" ref="table" :tabOp="tabOp"
                    @pageChange="pageChange" @shelf="shelf" @del="del" @edit="edit" :canOp="notOp")

            div.edit-ctn(v-if="isInput && !isLot")
                .page-title {{curOperate}}区域
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="区域名称")
                            el-input(type="text" auto-complete="off" placeholder="20个以内的汉字和数字组合" v-model="editItem.keyword")
                        el-form-item(label="下属片区" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData"
                                :titles="['全部片区', '已选片区']")

                        el-button.left(type="primary" @click="editOk1") 完成
                        .goBack(@click="goBack") 返回


            div.edit-ctn(v-if="isLot")
                .page-title 批量增加店员
                .form-ctn
                    el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
                        i(class="el-icon-upload")
                        div(class="el-upload__text") 将文件拖到此处，或
                            em 点击上传
                    el-button(type="primary" @click="isEdit=false,isInput=true,isLot=false") 完成

</template>

<script>
var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
var roleLevel = localStorage.roleLevel;
export default {
    name: 'role',
    mixins: [mixTable],
    data(){
        return {
            notOp: localStorage.roleLevel != 'ALL',  // 没权限是true
            isLot: false,
            keys: [
                {key: 'areaName', str: '区域名称'},
                {key: 'vendorName', str: '供应商'},
                {key: 'areaStr', str: '下属片区'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'del', str: '删除'}
            ],
            // 搜索的各个字段配置
            searchKeys: ['keyword'],
            // 编辑的各个字段配置
            editKeys: ['keyword', 'childrenIds'],
            transferData: [    //   下属片区数组
                //- { key: 0, label: `备选项 1`}
            ],
            chooseTransfer: []    // 已选中的下属片区序号数组
        }
    },
    mounted(){
        // this.searchMsg.status = 1;
        // this.searchMsg.type = 1;
        // this.tableList();
        // this.searchList1();
        this.areaList();
    },
    methods: {
        // 获取列表，搜索
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                keyword: this.searchMsg.areaName,
                status: 1,
                type: 1,
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            
            this.tableData = userData.map( v=>{
                v.areaStr = '';
                if(v.childrens && v.childrens.length > 0){
                    v.childrens.forEach( el => {
                        v.areaStr += el.areaName + ';';
                    });
                }
                return v
            });
        },
        // 获取片区
        async areaList(){
            var opts1 = $.extend(true, {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                type: 2,
                status: 1,
                limit: 500,
                offset: (this.currentPage - 1)*10
            },true)
            var area = await tryAwait('get', '', opts1, true)
            var areaData = area.model || [];
            var data = [];
            for(var i=0;i<areaData.length;i++){
                data.push({
                    key: areaData[i].id,
                    label: areaData[i].areaName, 
                })
            }
            this.transferData = data;
            console.log(this.transferData);
        },
        // 删除区域
        async shelf(scope){
            console.log(scope);
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var res = await tryAwait('get','',{
                    _api: 'pd.area.delete',
                    _v: '2.0',
                    vendorId: venId,
                    id: scope.row.id
                },true);
                if (res && res.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.tableData.splice(scope.$index, 1);
                    this.tableList();

                } else {
                    this.$message({
                        type: 'error',
                        message: res.msgInfo
                    });
                }
            })
            
        },
        
        // 添加区域
        async editOk1(){
            console.log(this.chooseTransfer);
            var opts1 = $.extend(true, {
                _api: 'pd.area.add',
                _v: '2.0',
                vendorId: venId,
                type: 1,
            },this.editItem);
            var addRegion = await tryAwait('get','',opts1,true);
            if(addRegion && addRegion.success){
                this.$message({
                    type: 'success',
                    message: '操作成功~',
                    offset: 100
                });
                this.isInput = false;
                this.tableList();
            }else{
                this.$message({
                    type: 'error',
                    message: addRegion.msgInfo,
                    offset: 100
                });
            }
        },











    // ===================================================================
        testRule(){
            return true;
        },
        async selfEdit(scope){
            //- this.chooseTransfer = this.editItem.childArea.split(',');
            // 由于穿梭框组件需求数据与实际数据字段不同，所以这里处理下
            var data = (await tryAwait('type', '', {
                vendorId: venId,
                id: scope.row.id,
                _api: 'pd.area.select.single'
            }, true));
            this.editItem.areaId = this.curEditing.id;
            this.editItem.keyword = scope.row.areaName;
            if(data && data.success && data.model){
                var model = data.model;
                if(model.id) this.editItem.areaId = model.id;
                if(model.areaName) this.editItem.keyword = model.areaName;
                if(model.childIds){
                    //   不 v - 0 转换成 数字类型 ，默认的 id 是字符串 和 控件不匹配
                    this.chooseTransfer = model.childIds.split(',').map( v => v-0 );
                }
            }
        },
        selfEditCancel(){
            this.chooseTransfer = [];
            this.curEditing.id = null;
            delete this.editItem.areaId;
            this.editItem.keyword = '';
        }
    },
    watch: {
        chooseTransfer(v){
            this.editItem.childrenIds = v.join(',')
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
