<template lang="pug">
    div(style="height:100%;")
        //- .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput && !isSort")
                .page-title 内容分类配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="所属分类")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.sort")
                                el-option(v-for="(item, i) in sortList" :label="item.label" :value="item.value" :key="i")

                        //- el-form-item(label="是否考试")
                            el-radio-group(v-model="searchMsg.isTest")
                                el-radio(label="是")
                                el-radio(label="否")

                        el-form-item(label="状态")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.isActive")
                                el-option(v-for="(item, i) in statuList" :label="item.str" :value="item.key" :key="i")

                    el-button(type="primary" icon="search" ref="search" @click="tableList") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="isInput = true" ref="add") 添加分类
                    el-button(type="success" @click="isSort = true" ) 分类排序

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @shelf="shelf" @edit="edit")

            .edit-ctn(v-if="isInput && !isSort")
                .page-title {{curOperate}}分类
                .form-ctn
                    el-form(v-model="editItem" label-width="80px")
                        el-form-item(label="分类名称" )
                             el-input(type="text" placeholder="请输入分类的名称~" v-model="editItem.title")
                        el-form-item(label="分类状态")
                            el-select(placeholder="请选择" auto-complete="off" v-model="editItem.isActive")
                                el-option(v-for="(item, i) in statuList" :label="item.str" :value="item.key" :key="i")
                    .sure.left(@click="editOk") 完成
                    .goBack(@click="goBack") 返回

            .edit-ctn(v-show="isSort")
                .page-title 分类排序
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="分类" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData"
                                :titles="['全部分类', '上架分类']")

                        el-form-item(label="排序" class="transfer-item" style="position: relative")
                            div.sortBox.left
                                .chooseSort(v-if="chooseSortList.length!=0" v-for="(item,i) in chooseSortList" :key='i') {{item.label}}
                                    i(class="fa fa-arrow-up" @click="sortUp(i)")
                                .chooseSort(v-if="chooseSortList.length==0" style="color: #8391a5") 无数据
                        
                        el-button(type="primary" @click="sync") 完成
                        .goBack(@click="goBack") 返回



</template>

<script>

import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'sort',
    mixins: [mixTable],
    components: {
        navCenter
    },
    data(){
        return {
            isInput: false,
            isSort: false,
            curOperate: '添加',
            activeTab: '0',
            keys: [
                // {key: 'orderNum', str: '序号'},
                {key: 'title', str: '分类名称'},
                {key:'createdTime', str: '添加时间'},
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'shelf1', str: '上下架'},
            ],
            selfApi: {
                list: ()=>{
                    return this.api.userList;
                },
                del: {type: 'post', url: '/delRole'}
            },
            sortList: [],    //  分类下拉列表数据
            statuList: [
                {key:false, str: '下架'},
                {key:true, str: '上架'},
            ],   // 状态下拉列表数据
            transferData: [],
            chooseTransfer: [],
            newsSort: [],
            serNum: [],
            chooseSortList: [],
            searchKeys: ['isActive'],
            editKeys: ['title', 'isActive']
        }
    },
    mounted(){
        this.getAll();
    },
    methods: {
        async getAll(){
            var allCategoryData = (await tryAwait('post', '', {
                _api: 'saas.discover.category.list',
                offset: 0,
                limit: 100
            }, true)).model || [];
            this.transferData = allCategoryData.map( v =>{
                return {    //  需要这种格式，所以
                    key: v.id,
                    label: v.title,
                    id: v.id
                }
            });
            allCategoryData.forEach((v,i)=>{
                if(v.status===true){
                    this.newsSort.push(v);
                }
            });
            this.chooseSortList = this.newsSort.map(v =>{
                return {    //  需要这种格式，所以
                    key: v.id,
                    label: v.title,
                    id: v.id
                }
            });
            this.chooseTransfer = this.newsSort.map(v => v.id);
        },
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'saas.discover.category.list',
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var newSort = await tryAwait('get', '', opts1, true)
            var sortData = newSort.model || [];
            this.tableData = sortData;
            this.totalPage = newSort.count;
        },
        // 编辑
        async edit(scope){
            this.isInput = true;
            this.curOperate = '编辑';
            var sortMsg = scope.row;
            this.editItem.id = sortMsg.id;
            this.editItem.title = sortMsg.title;
            this.editItem.isActive = sortMsg.status;
        },
        // 上下架
        async shelf(scope, status){
            var sortMsg = scope.row;
            var res = (await tryAwait('post', '', {
                _api: 'saas.discover.category.update',
                id: sortMsg.id,
                title: sortMsg.title,
                isActive: status === 0 ? false : true    //0=下架，1=上架，
            }, true));
            if(res.success){
                this.$message({
                    type: 'success',
                    message: res.msgInfo || '操作成功',
                    offset: 100
                });
                this.tableList();
                this.curOperate = '添加';
            }
        },
        async editOk(){
            if(this.editItem.title == ''){
                this.$message({
                    type: 'warning',
                    message: '请将信息填写完整~'
                });
                return
            }
            var opts = $.extend(true, {
                _api: this.curOperate == '添加' ? 'saas.discover.category.add' : 'saas.discover.category.update',
            }, this.editItem)
            var res = await tryAwait('post', '', opts, true);
            if(res.success){
                this.$message({
                    type: 'success',
                    message: "分类"+this.curOperate+"成功~"
                });
                this.isInput = false;
                this.tableList();
                this.editItem.title = '';
                this.editItem.isActive = '';
            }
        },
        async sync(){
            if(this.chooseTransfer.length == 0){
                this.$message({
                    type: 'error',
                    message: '已选分类不能为空'
                })
                return
            }
            this.serNum = this.chooseSortList.map( v => v.id )
            var data = (await tryAwait('post', '', {
                _api: 'saas.discover.category.sort',
                ids: this.serNum.join(',')
            }, true))
            if(data.success){
                this.isInput = false;
                this.isSort = false;
                this.tableList();
            }
        },
        fullSort(){
            var sortAll = this.transferData;
            var sortId = this.chooseTransfer;
            var chooseSort = this.chooseSortList;

            var newIds = chooseSort.map( v => v.id )

            if(sortId.length < newIds.length){
                var lessArr = chooseSort.filter( v => sortId.indexOf(v.id) < 0 ).map( vv => vv.id )
                this.chooseSortList = chooseSort.filter(v => sortId.indexOf(v.id) > -1)
            }else if(sortId.length > newIds.length){
                var addArr = sortId.filter( v => chooseSort.map(v => v.id ).indexOf(v) < 0 )
                console.log(addArr)
                this.chooseSortList = this.chooseSortList.concat( sortAll.filter( v => addArr.indexOf(v.id) > -1 ) )
            }  
        },
        
        sortUp(i){
            if(i!=0){
                this.chooseSortList.splice(i-1 , 0, this.chooseSortList.splice(i, 1)[0]);
            }
        },

        goBack(){
            this.isInput = false;
            this.isSort = false;
        }

    },
    watch: {
        chooseTransfer(v){
            this.fullSort();
        },
    }
}
</script>

<style lang="sass" scoped>
.edit-ctn .form-ctn .transfer-item
    width: 550px;
.el-menu
    background-color: #f9fafc;
.el-menu-item.is-active
    border-bottom: 5px solid #20a0ff;
ul.choose-ctn
    margin-top: 30px;
    li
        display: none;
        &.show
            display: block;

.next
    width: 180px;
    height: 36px;
    border-radius: 4px;
    background-color: #13ce66;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-top: 20px;
    cursor: pointer;

.sure
    margin-left: 0;
.goBack
    top: 13px;
</style>
