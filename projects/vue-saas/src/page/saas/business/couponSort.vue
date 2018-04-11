<template lang="pug">
    div(style="height:100%;")
        .table-main
            .table-ctn(v-if="!isAdd")
                .page-title 优惠券分类配置
                .search-ctn

                    //- el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="clearSearch")  清空筛选条件
                    //- el-button(type="success" @click="add" ref="add") 添加分类(所有供应商可用)
                    //- el-button(type="success" @click="editThisAll" ref="add") 编辑当前供应商分类列表

                el-button(type="success" @click="isAdd = true" ref="add" style="margin-bottom: 10px;") 编辑当前供应商分类
                mtable(:keys="keys" :tableData="tableData" :ops="[]" :tabOp="tabOp"
                    :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange")

            .edit-ctn(v-show="isAdd")
                .page-title 编辑当前供应商优惠券分类
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="分类" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData"
                                :titles="['全部分类', '已选分类']")

                        //- el-form-item
                            el-input(v-for="(item,i) in chooseTransfer" v-model="serNum[i]" placeholder="已选分类对应展示位置" :key="i")

                        el-form-item(label="排序" class="transfer-item" style="position: relative")
                            div.sortBox.left
                                .chooseSort(v-if="chooseSortList.length!=0" v-for="(item,i) in chooseSortList" :key='i') {{item.label}}
                                    i(class="fa fa-arrow-up" @click="sortUp(i)")
                                .chooseSort(v-if="chooseSortList.length==0" style="color: #8391a5") 无数据
                            //- div.sortIcon
                                i(class="fa fa-arrow-up")
                                i(class="fa fa-arrow-down")

                        el-button(type="primary" @click="sync") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>

import upfile from '@/basic/mixins/upfile.js'

export default {
    name: 'couponSort',
    mixins: [mixTable, upfile],
    data(){
        return {
            allCategoryList: [],     // 所有分类
            couponCatelogoList: [],   // 当前供应商分类
            isAdd: false,
            keys: [
                {key: 'imgUrl', str: '图标'},
                {key: 'categoryName', str: '分类名称'},
                {key: 'status', str: '状态'}
            ],
            transferData: [],
            chooseTransfer: [],    // 已选中的下属分类id数组
            serNum: [],
            chooseSortList: [],
        }
    },
    async mounted(){

        // 所有优惠券分类
        this.getAll();
        
        
    },
    methods: {

        async getAll(){
            var allCategoryData = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.search',
                offset: 0,
                limit: 100
            }, true)).model || []

            this.transferData = allCategoryData.map( v =>{
                return {    //  需要这种格式，所以
                    key: v.id,
                    label: v.categoryName,
                    id: v.id
                }
            })
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
        
        async tableList(){
            var data = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.fetch',
            }, true))
            
            if(data && data.success){
                var model = data.model || [];

                this.tableData = this.changeTableData(model);
                // this.chooseSortList
                this.chooseSortList = this.tableData.map( v =>{
                    return {    //  需要这种格式，所以
                        key: v.categoryId,
                        label: v.categoryName,
                        id: v.categoryId
                    }
                })
                
                var cpModel = JSON.parse(JSON.stringify(model));
                // cpModel.sort(function(a,b){return a.categoryName.localeCompare(b.categoryName)})   // 按照汉字排序
                cpModel.sort(function(a,b){return a.categoryId > b.categoryId})   //  插件是按categoryId大小排序，这里也排下，保证对应
                this.chooseTransfer = cpModel.map( v=> v.categoryId )    //  这里须取categoryId  不然编辑时不能匹配
            }
        },

        changeTableData(v){
            return v.map( el => this.changeItem(el) )
        },

        changeItem(item){
            return item
        },

        async shelf(scope, status){    // 上下架删除
            // console.log(scope)
            var sta = !!status ? -1 : scope.row.status==1 ? 0 : 1;
            var res = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.shelf',
                // id: scope.row.categoryId,
                id: scope.row.id,
                status: sta    //0=上架，1=下架，-1=删除
            }, true))
            var thisData = JSON.parse(JSON.stringify(scope.row))
            if(res.success){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.getAll();
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
            console.log(this.chooseSortList);
            console.log(this.serNum)
            
            var data = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.sync',
                categoryIds: this.serNum.join('-')
            }, true))

            if(data.success){
                this.isAdd = false;
                this.tableList();
            }
        },
        selfEdit(item){
            this.editItem = {
                name: item.row.categoryName,
                icon: item.row.categoryIcon
            }
            alert(item.row.categoryId)
            this.curEditing.id = item.row.categoryId;
        },

        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map((v)=>{
                v.statusKey = v.status;
                v.imgUrl = v.categoryIcon;
                v.status = v.status == 1 ? '上架' : '下架';
                return v;
            });
        },
        
        upImgSuccess(v){
            if(!v.success){
                this.fileList = [];
                this.$message({
                    type: 'error',
                    message: v.msgInfo
                })
                return
            }
            var img0 = v.model[0]
            this.fileList = [{
                name: img0.filename,
                url: img0.url
            }]
            this.editItem.categoryIcon = img0.url + img0.filename;
        },
        testRule() {
            if(this.editItem.serialNum == undefined || isNaN((this.editItem.serialNum+'').trim()-0) || ((this.editItem.serialNum+'').trim()-0) < 0){
                this.$message({
                    type: 'error',
                    message: '序号未填或有误：大于0'
                })
                return false
            }
            if(!this.editItem.categoryName || this.editItem.categoryName.trim() == '' || this.editItem.categoryName.trim().length>4){
                this.$message({
                    type: 'error',
                    message: '分类未填或有误，1-4位字符'
                })
                return false
            }
            if(!this.editItem.categoryIcon || this.editItem.categoryIcon == ''){
                this.$message({
                    type: 'error',
                    message: '图标未传'
                })
                return false
            }
            if(this.editItem.id){  // 如果是编辑状态
                this.editItem.shelves = this.editItem.statusKey;
                delete this.editItem.status;
            }
            return true;
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
.sortIcon
    position: absolute;
    top: 50%;
    left: 220px;
    i
        font-size: 20px;
        margin-right: 10px;
        color: #BFCBDE;
.sortBox
    width: 200px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
    .chooseSort
        padding: 0 20px;
        color: #48576a;
        cursor: pointer;
        position: relative;
        i
            position: absolute;
            right: 20px;
            top: 10px;
            &:hover
                color: #409EFF;
        &:hover
            background: #E4E8F1;
        &:active
            background: #E4E8F1;
.edit-ctn .form-ctn .transfer-item
    width: 550px;

.el-upload__tip
    margin-top: -35px;
    text-align: center;

.edit-address
    .address
        select
            width: 115px!important;
            height: 36px!important;
            border-radius: 5px!important;
            border: 1px solid #8391a5!important;

.avatar-uploader
    .el-upload
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

.avatar-uploader
    .el-upload
        &:hover
            border-color: #20a0ff;

.avatar-uploader-icon
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

.avatar
    width: 178px;
    height: 178px;
    display: block;


</style>
