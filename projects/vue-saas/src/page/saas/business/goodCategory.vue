<template lang="pug">
    div(style="height:100%;")
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 商品分类配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="分类名称")
                            el-input(type="text" v-model="searchMsg.keyword" placeholder="分类名称")
                            
                        //- el-form-item(label="分类名称")
                            el-select(placeholder="请选择" v-model="searchMsg.name")
                                el-option(v-for="(item, i) in couponCatelogoList" :label="item.categoryName" :value="item.categoryName" :key="i")

                        //- el-form-item(label="状态")
                            el-select(placeholder="请选择" v-model="searchMsg.status")
                                el-option(label="上架" value="1")
                                el-option(label="下架" value="0")

                        //- el-form-item( class="search-time" label="最后编辑于")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加分类

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :tabOp="tabOp"
                    :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange"
                    @edit="edit" @shelf="shelf")

            .edit-ctn(v-show="isInput")
                .page-title {{curOperate}}商品分类
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")

                        el-form-item(label="分类名称")
                            el-input(type="text" v-model="editItem.className" placeholder="分类名称")

                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回
</template>

<script>
// table 公共逻辑 mixins
import upfile from '@/basic/mixins/upfile.js'
import upOss from '@/basic/mixins/upOss.js'

var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';

import navCenter from '@/page/public/nav-center.vue'
export default {
    name: 'goodCategory',
    mixins: [mixTable, upfile, upOss],
    components: {
        navCenter
    },
    data(){
        return {
            searchMsg: {
                className: '',
                startTime: '',
                endTime: ''
            },
            operates: [
                {f:'del', str: '删除'}
            ],
            keys: [
                {key: 'className', str: '分类名称'}
            ],
            selfApi: {
                list: {
                    mapi: true,
                    options: {
                        _api: 'pd.coupon.category.fetch'
                    }
                },
                edit: {type: 'post', url: '/couponCategory/couponUpdate'},
                add: {type: 'post', url: '/couponCategory/addCoupontCategory'}
            },
            // 搜索的各个字段配置
            searchKeys: ['keyword'],
            // 编辑的各个字段配置
            editKeys: ['className'],
        }
    },
    async mounted(){
        this.$nextTick(()=>{
        })
    },
    methods: {
        searchList(){
            var str = (this.searchMsg.keyword ? this.searchMsg.keyword+'' : '').trim()
            if( str == '') return
            var options = {
                keyword: str,
                orderByCause: 1
            }
            this.tableList(options);
        },
        async tableList(other){
            var opt = {
                _api: 'pd.coupon.class.search',
                vendorId: venId,
                limit: 10,
                offset: this.currentPage ? (this.currentPage-1)*10 : 0
            }
            if(other){
                Object.keys(other).forEach( v=>{
                    opt[v] = other[v]
                })
            }
            var data = (await tryAwait('post', '', opt, true))
            
            if(data && data.success && data.model){
                this.tableData = this.changeTableData(data.model)
                console.log(this.tableData)
            }
        },

        changeTableData(v){
            return v.map( el => this.changeItem(el) )
        },

        changeItem(item){
            // item.statusStr = item.status == 1 ? '上架' : '下架'
            return item
        },

        async shelf(scope){    // 上下架删除
            var res = (await tryAwait('post', '', {
                _api: 'pd.coupon.class.del',
                id: scope.row.id,
                status: -1 
            }, true))
            if(res && res.success){
                this.tableList();
            }
        },
        async editOk(){
            // console.log(this.stepKey2.rule_content);
            var opts1 = $.extend(true, {
                _api: 'pd.coupon.class.add',
                vendorId: venId
            }, this.editItem)

            var add = await tryAwait('get', '', opts1, true); 
            if(add && add.success){
                this.$message({
                    type: 'success',
                    message: '成功'
                })
                this.editItem.className = '';
                this.isInput = false;
                this.tableList();
            }
        },



        // async edit(scope){
        //     var id = scope.row.id;
        //     var data = await tryAwait('get', '/couponCategory/couponEdit', {couponId: id});
        //     // data.success &&
        // },
        selfEdit(){
            var url = this.editItem.categoryIcon;
            var split = url.split('/');
            this.fileList = [{
                name: split[split.length-1],
                url: url
            }]
        },
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map((v)=>{
                v.statusKey = v.status;
                v.status = v.status == 1 ? '上架' : '下架';
                return v;
            });
        },
        async onShelf(scope){
            var options = scope.row;
            options.shelves = options.statusKey == 1 ? 0 : 1;
            delete options.status;
            var data = await tryAwait('post', '/couponCategory/couponUpdate', options);
            data.success && this.tableList(this.currentPage || 1);
        },
        async offShelf(scope){
            // 逻辑和上架代码一样，可以达到下架效果，这里调用onShelf方法
            this.onShelf(scope);
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
    }
}
</script>

<style lang="sass" scoped>
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
