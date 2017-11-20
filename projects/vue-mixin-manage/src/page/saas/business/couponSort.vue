<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 优惠券分类配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="分类名称")
                            el-select(placeholder="请选择" v-model="searchMsg.name")
                                el-option(v-for="(item, i) in couponCatelogoList" :label="item.categoryName" :value="item.categoryName" :key="i")

                        el-form-item(label="状态")
                            el-select(placeholder="请选择" v-model="searchMsg.statu")
                                el-option(label="上架" value="1")
                                el-option(label="下架" value="0")

                        el-form-item( class="search-time" label="最后编辑于")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加分类

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :tabOp="tabOp"
                    :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange"
                    @edit="edit" @onShelf="onShelf" @offShelf="offShelf")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}优惠券分类
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="序号")
                            el-input(type="text" v-model="editItem.serialNum" placeholder="数字")

                        el-form-item(label="分类名称")
                            el-input(type="text" v-model="editItem.categoryName" placeholder="4位以内字符或汉字")

                        el-form-item(label="标题配图")
                            el-upload(class="avatar-uploader" show-file-list=false accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileList" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb

                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回
</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'
import upfile from '@/basic/mixins/upfile.js'
// table列表组件
import mtable from '@/page/public/table.vue'
import navCenter from '@/page/public/nav-center.vue'
export default {
    name: 'role',
    mixins: [mixTable, upfile],
    components: {
        mtable,
        navCenter,
    },
    data(){
        return {
            couponCatelogoList: [],
            fileList: [],   // 分类图片数组
            searchMsg1: {
                name: '',
                startTime: '',
                endTime: ''
            },
            operates: [
                {f:'edit', str: '编辑'},
                {f:'onShelf', str: '上架'},
                {f:'offShelf', str: '下架'},
                // {f:'preheat', str: '预热'}
            ],
            keys: [
                {key: 'serialNum', str: '序号'},
                {key: 'categoryName', str: '分类名称'},
                // {key: 'vendorNames', str: '供应商'},
                {key: 'status', str: '状态'},
                {key: 'updatedTime', str: '添加时间'}
            ],
            selfApi: {
                list: {type: 'get', url: '/couponCategory/couponList'},
                edit: {type: 'post', url: '/couponCategory/couponUpdate'},
                add: {type: 'post', url: '/couponCategory/addCoupontCategory'}
            },
            // 搜索的各个字段配置
            searchKeys: ['statu', 'startTime', 'endTime', 'name'],
            // 编辑的各个字段配置
            editKeys: ['serialNum', 'categoryName'],
        }
    },
    async mounted(){
        var sort = await tryAwait('get', '/couponCategory/categorylist');
        this.couponCatelogoList = sort ? (sort.model ? sort.model : []) : [];
    },
    methods: {
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
