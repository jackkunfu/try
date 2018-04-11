<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
        //-     nav-center
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 片区配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="片区名称查询")
                            el-input(placeholder="输入片区关键字，请勿带符号" v-model="searchMsg.areaName")
                        //- el-form-item(label="下属门店查询" style="margin-left: 80px;")
                            el-input(placeholder="输入门店关键字，请勿带符号" v-model="searchMsg.storeName")
                    el-button(type="primary" icon="search" @click="tableList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add" v-if="!notOp") 添加片区

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @edit="edit" @shelf="shelf" :canOp="notOp")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}片区
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="片区名称")
                            el-input(type="text" auto-complete="off" v-model="editItem.areaName" placeholder="20个以内的汉字和数字组合")
                        el-button.left(type="primary" @click="editOk") 完成
                        //- router-link(:to = "{ path:'sa-store',query:{op:'add'}}")
                        //- el-button.left(type="success" @click="editOk2(goToStore)") 完成，去添加对应门店
                        el-button.left(type="success" @click="goStore") 完成，去添加对应门店
                        .goBack(@click="goBack") 返回

            //- div.edit-ctn(v-if="isLot")
            //-     .page-title 批量增加店员
            //-     .form-ctn
            //-         el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
            //-             i(class="el-icon-upload")
            //-             div(class="el-upload__text") 将文件拖到此处，或
            //-                 em 点击上传
            //-         el-button(type="primary" @click="isEdit=false,isInput=false,isLot=false") 完成

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
            status: 1,
            isLot: false,
            curOperate: '添加',
            keys: [
                {key: 'areaName', str: '片区名称'},
                {key: 'vendorName', str: '供应商'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                // {f: 'del', str: '删除'},
                {f: 'edit', str: '编辑'},
            ],
            // 搜索的各个字段配置
            searchKeys: ['areaName'],
            // 编辑的各个字段配置
            editKeys: ['areaName','areaId'],
            editName: '',
            areaId: '',
        }
    },
    mounted(){
        this.searchMsg.status = 1;
        // this.searchMsg.type = 2;
        // this.tableList();
    },
    methods: {
        goBack(){
            this.isInput = false;
            this.searchMsg.areaName = '';
            this.editItem.areaName = '';
        },
        selfEdit(item){
            this.areaId = item.row.id;
            this.editName = item.row.areaName;
        },
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                type: 2,
                status: this.status,
                keyword: this.searchMsg.areaName,
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            if(!opts1.status) opts1.status = 1;
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = userData;
        },
        async shelf(scope){
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
        async editOk(){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                //- alert('名称不能为空');
                this.$message({
                    type: 'warning',
                    message: '名称不能为空'
                })
            }else{
                var opts1 = {
                    _api: 'pd.area.add',
                    _v: '2.0',
                    vendorId: venId,
                    keyword: this.editItem.areaName,
                    areaId: this.areaId,
                    type: 2
                }
                var user = await tryAwait('get', '', opts1, true); 
                if(user && user.success){
                    if(this.curOperate == '添加'){
                        this.$message({
                            type: 'success',
                            message:"片区添加成功~",
                            offset: 100
                        });
                    }else if(this.curOperate == '编辑'){
                        this.$message({
                            type: 'success',
                            message:"片区编辑成功~",
                            offset: 100
                        });
                    }
                    
                    this.clearSearch();
                    this.isInput = false;
                    this.tableList();
                }else{
                    this.$message({
                        type: 'error',
                        message: user.msgInfo,
                        offset: 100
                    });
                }
            }
            
        },
        
        async goStore(){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                //- alert('名称不能为空');
                this.$message({
                    type: 'warning',
                    message: '名称不能为空'
                })
            }else{
                var opts1 = {
                    _api: 'pd.area.add',
                    _v: '2.0',
                    vendorId: venId,
                    areaId: this.areaId,
                    keyword: this.editItem.areaName,
                    type: 2
                }
                var area = await tryAwait('get', '', opts1, true); 
                if(area && area.success){
                    console.log(area.model);
                    var data = area.model;
                    this.$router.push({path:'/sa-store', query:{areaId: data.id, op: 'add', info: data }});
                }else{
                    this.$message({
                        type: 'error',
                        message: user.msgInfo,
                        offset: 100
                    });
                }
            }
        },












    // =======================================================================================
        testRule(){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '名称不能为空~'
                })
                return false;
            }
            if(this.editItem.areaName.trim() == this.editName){
                this.isInput = false;
                return false
            }
            return true;
        },
        async editOk2(cb){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                //- alert('名称不能为空');
                this.$message({
                    type: 'error',
                    message: '名称不能为空'
                })
                return false;
            }

            if(this.editItem.areaName.trim() == this.editName){   //  编辑的时候没更改时下一步
                this.editItem.model = this.editItem.id;
                cb(this.editItem);
            }else{
                var curSubmit = this.curEditing.id ? 'edit' : 'add';
                var d = await tryAwait(this.selfApi[curSubmit].type, this.selfApi[curSubmit].url, this.editItem);
                if (d.success) {
                    if(this.curEditing.id) d.model = this.curEditing.id;
                    cb(d);
                } else {
                    this.$message({ type: 'error', message: d.msgInfo });
                }
            }
        },
        goToStore(d){
            if(!isNaN(d.model)){
                var id = localStorage.storePageId;  // 此id是跳到门店页面的获取权限的门店页面对应的id
                this.$router.push({path:'/sa-store',query:{op:'add', areaId:d.model, id: id}});
            }else{
                alert('没返回获取到id');
            }
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
