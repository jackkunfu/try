<template lang="pug">
    div(style="height:100%;")
        .table-main
            div.table-ctn(v-if="!isInput")
                .page-title 商品配置

                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="商品分类")
                            el-select(placeholder="请选择" v-model="searchMsg.classId" @change="tableList")
                                el-option(v-for="(item,i) in productCategoryList" :label="item.className" :value="item.id" :key="i")

                        //- el-form-item( class="search-time" label="活动有效期")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add") 添加商品

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp"
                    @edit="edit" @preheat="preheat" @shelf="shelf")


            div.edit-ctn(v-show="isInput")
                .page-title {{curOperate}}优惠券
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="商品分类")
                            el-select(placeholder="请选择" v-model="editItem.classId")
                                el-option(v-for="(item,i) in productCategoryList" :label="item.className" :value="item.id" :key="i")

                        el-form-item(label="商品名称")
                            el-input(type="text" v-model="editItem.productName" placeholder="商品名称")

                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>
// table 公共逻辑 mixins
import mixTable1 from '@/basic/mixins/mixin1.js'
import upfile from '@/basic/mixins/upfile.js'

import navCenter from '@/page/public/nav-center.vue'

var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';

export default {
    name: 'good',
    mixins: [mixTable, upfile],
    components: {
        navCenter
    },
    data(){
        return {
            productCategoryList: [],   // 商品分类列表
            operates: [
                {f:'del', str: '删除'},
            ],
            keys: [
                {key: 'productName', str: '名称'},
                {key: 'statusKeys', str: '状态'}
            ],
            editKeys: ['productName', 'classId'],
            searchKeys: ['classId'],
            productPage: 0
        }
    },
    async mounted(){
        // 商品分类
        this.productCategoryList = (await tryAwait('get', '', {
            _api: 'pd.coupon.class.search',
            vendorId: venId,
            limit: 200,
            offset: 0,
            orderType: 1
        }, true)).model || [];

        if(this.productCategoryList.length > 0){
            this.searchMsg.classId = this.productCategoryList[0].id;
            this.tableList();
        }

    },
    methods: {
        async shelf(scope){    // 删除
            var res = (await tryAwait('post', '', {
                _api: 'pd.coupon.product.del',
                id: scope.row.id,
                status: -1    //-1=删除
            }, true))
            if(res.success){
                this.tableList();
            }
        },
        async editOk(){
            // console.log(this.stepKey2.rule_content);
            var ok = true;
            this.editKeys.forEach( (element, i) => {
                if( (this.editItem[element] + '').trim() == ''){
                    ok = false;
                    this.$message({
                        type: 'error',
                        message: i == 0 ? '产品名称不能为空' : '产品分类未选'
                    })
                }
            })
            if(!ok) return
            
            var opts = $.extend(true, {
                _api: 'pd.coupon.product.add'
            }, this.editItem)

            var d1 = await tryAwait('get', '', opts, true);
            if(d1 && d1.success){
                this.$message({
                    type: 'success',
                    message: '新增成功'
                })
                this.searchMsg.classId = this.editItem.classId;
                this.isInput = false;
                this.tableList();
                this.editItem.productName = '';
                this.editItem.classId = '';
            }else{
                this.$message({
                    type: 'success',
                    message: res.msgInfo || '操作失败'
                })
            }
        },
        async tableList(){    // 获取产品分类列表
            if(!this.searchMsg.classId) return
            var data = (await tryAwait('get', '', {
                _api: 'pd.coupon.product.search',
                classId: this.searchMsg.classId,
                limit: 10,
                offset: this.currentPage ? (this.currentPage-1)*10 : 0
            }, true)).model || [];

            this.tableData = this.changeTableData(data)
        },
        changeItem(v){
            // 状态
            var str = '';
            if(v.status == 1) str += '上架中 ';
            else if(v.status == 0) str += '下架中 ';
            else if(v.status == -1) str += '已删除 ';
            v.statusKeys = str;
            return v;
        },
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map( v => this.changeItem(v) );
        }
    }
}
</script>

<style lang="sass" scoped>
.tabs
    background-color: #f9fafc;
    margin-bottom: 24px;
    margin-top: -20px;
    border-bottom: 1px solid #d3dce6;
    li:hover
        background-color: #f9fafc;
    .is-active
        border-bottom: 5px solid #20a0ff;

.title
    font-size: 14px;
    line-height: 1.8;
    color: #20a0ff;
    border-bottom: 1px solid #20a0ff;
    margin-bottom: 10px;

.el-radio-group.block
    .el-radio
        width: 360px;
        display: block;
        height: 36px;
        line-height: 36px;
        margin-bottom: 5px;
        .radio-input
            float: right;
            width: 200px!important;
            input
                width: 100px!important;
    .el-radio+.el-radio
        margin-left: 0;

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
