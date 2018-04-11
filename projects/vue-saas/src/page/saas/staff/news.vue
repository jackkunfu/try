<template lang="pug">
    div(style="height:100%;")
        //- .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 内容分类配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="所属分类")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.categoryId")
                                el-option(v-for="(item, i) in sortList" :label="item.title" :value="item.id" :key="i")

                        el-form-item(label="分类状态")
                            el-radio(v-for="(item,i) in statuList" v-model="searchMsg.status" 
                                    :label="item.str" :value="item.key" :key="i")
    
                    el-button(type="primary" icon="search" ref="search" @click="tableList") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="addNews" ref="add") 添加内容

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @shelf="shelf" @edit="edit")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}内容
                .form-ctn
                    el-form(v-model="editItem" label-width="80px")
                        el-form-item(label="标题配图")
                            div.upfile
                                input(type="file" ref="icon1" @change="chooseIcon")
                                button 点击上传
                            img(:src="editItem.iconUrl" style="max-width: 100px;max-height: 100px;")

                        .border-line
                        el-form-item(label="内容标题")
                            el-input(type="text" v-model="editItem.title" placeholder="请输入内容标题~")
                        el-form-item(label="内容详情")
                            el-input(type="textarea" v-model="editItem.content" placeholder="请输入内容详情~")

                        .border-line
                        el-form-item(label="内容类型")
                            el-radio-group(v-model="editItem.type")
                                el-radio(v-for="(item,i) in newsType" :label="item.key") {{item.label}}
                        el-form-item(label="URL链接" v-if="editItem.type==1")
                            el-input(type="text" v-model="editItem.sourceUrl" placeholder="请输入内容URL链接~")
                        el-form-item(label="视频链接" v-if="editItem.type==2")
                            el-input(type="text" v-model="editItem.sourceUrl" placeholder="请输入内容视频链接~")
                        el-form-item(label="上传图片" v-if="editItem.type==3")
                            div.upfile
                                input(type="file" ref="icon2" multiple="multiple" @change="upIcon")
                                button 点击上传
                            img(v-for="item in editItem.sourceUrl" :src="item" style="max-width: 100px;max-height: 100px;")
                        el-form-item(label="所属分类")
                            el-select(v-model="editItem.categoryId" placeholder="请选择内容所属分类~")
                                el-option(v-for="(item,i) in sortList" :label="item.title" :value="item.id" :key="item.id")
                        el-form-item(label="内容状态")
                            el-radio(v-for="(item,i) in statuList" v-model="editItem.status" :label="item.key") {{item.str}}
                    .sure.left(@click="editOk") 完成
                    .goBack(@click="goBack") 返回



</template>

<script>

import navCenter from '@/page/public/nav-center.vue'
import upOss from '@/basic/mixins/upOss.js'

export default {
    name: 'sort',
    mixins: [mixTable,upOss],
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
            newsType: [
                {key: 1, label: 'URL'},
                {key: 2, label: '视频'},
                {key: 3, label: '图片'},
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
            searchKeys: ['status','categoryId'],
            editKeys: ['iconUrl', 'title', 'content',  'type', 'sourceUrl', 'categoryId', 'status']
        }
    },
    async mounted(){
        this.getAll();
    },
    methods: {
        selfInitKeys(){
            this.editItem.sourceUrl = []
        },
        chooseIcon(){
            this.upOss(this.$refs.icon1.files[0]).then( res =>{
                this.$set(this.editItem, 'iconUrl', 'http://files.iputong.com/Saas2/' + res);
            });
        },
        addNews(){
            this.isInput = true;
            this.curOperate = '添加';
            this.itemSet();
        },
        async upIcon(){
            // this.upOssMore(this.$refs.icon2.files).then( res =>{
            //     console.log(res)
            //     this.$set(this.editItem, 'sourceUrl', res.map(v => 'http://files.iputong.com/Saas2/' + v));
            //     console.log(this.editItem.sourceUrl);
            // });
            var arr = await this.upOssMore(this.$refs.icon2.files)
            var arr1 = arr.map(v => 'http://files.iputong.com/Saas2/' + v)
            this.$set(this.editItem, 'sourceUrl', arr1)

            // var arr = this.upOssMore(this.$refs.icon2.files)
            // arr.forEach(pms => {
            //     pms.then(v => {
            //         console.log(v)
            //         this.editItem.sourceUrl.push('http://files.iputong.com/Saas2/' + v)
            //     })
            // })
        },
        async getAll(){
            var allCategoryData = (await tryAwait('post', '', {
                _api: 'saas.discover.category.list',
                offset: 0,
                limit: 100
            }, true)).model || [];
            allCategoryData.forEach((v,i)=>{
                if(v.status===true){
                    this.sortList.push(v);
                }
            });
            this.searchMsg.categoryId = this.sortList[0].id;
            this.tableList();
        },
        async tableList(){
            if(this.searchMsg.categoryId === '') return;
            var opts1 = $.extend(true, {
                _api: 'saas.discover.category.article.list',
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var news = await tryAwait('get', '', opts1, true)
            var newsData = news.model || [];
            this.tableData = newsData;
            this.totalPage = news.count;
        },
        // 编辑
        async edit(scope){
            console.log(scope)
            this.isInput = true;
            this.curOperate = '编辑';
            var newsMsg = scope.row;
            for(var i in this.editItem){
                for(var j in newsMsg){
                    if(i==j){
                        this.$set(this.editItem, i, newsMsg[j]);
                    }
                }
            }
            this.editItem.id = newsMsg.id;
            this.editItem.sourceUrl = JSON.parse(this.editItem.sourceUrl);
        },
        // 上下架
        async shelf(scope, status){
            var sortMsg = scope.row;
            var res = (await tryAwait('post', '', {
                _api: 'saas.discover.category.article.shelf',
                id: sortMsg.id,
                status: status === 0 ? false : true    //0=下架，1=上架，
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
            console.log(this.editItem)
            // if(!this.testRule()) return;
            var opts = $.extend(true, {
                _api: this.curOperate == '添加' ? 'saas.discover.category.article.add' : 'saas.discover.category.article.update',
            }, this.editItem)
            opts.sourceUrl = JSON.stringify(this.editItem.sourceUrl)
            var res = await tryAwait('post', '', opts, true);
            if(res.success){
                this.$message({
                    type: 'success',
                    message: "分类"+this.curOperate+"成功~"
                });
                this.isInput = false;
                this.tableList();
                this.itemSet();
                // for(var i in this.editItem){
                //     if(this.editItem.hasOwnProperty(i)){
                //         this.$set(this.editItem, i, '');
                //     }
                // }
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
        testRule(){
            if(this.editItem.iconUrl == ''){
                this.$message({
                    type:'warning',
                    message: '标题配图未上传~'
                });
                return;
            }else if(this.editItem.title == ''){
                this.$message({
                    type:'warning',
                    message: '内容标题未填写~'
                });
                return;
            }else if(this.editItem.content == ''){
                this.$message({
                    type:'warning',
                    message: '内容详情未填写~'
                });
                return;
            }else if(this.editItem.type == ''){
                this.$message({
                    type:'warning',
                    message: '内容类型未选择~'
                });
                return;
            }else if(this.editItem.sourceUrl == ''){
                this.$message({
                    type:'warning',
                    message: '内容详情未填写~'
                });
                return;
            }else if(this.editItem.categoryId == ''){
                this.$message({
                    type:'warning',
                    message: '内容分类未选择~'
                });
                return;
            }else if(this.editItem.status == ''){
                this.$message({
                    type:'warning',
                    message: '内容状态未选择~'
                });
                return;
            }else{
                return true;
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
