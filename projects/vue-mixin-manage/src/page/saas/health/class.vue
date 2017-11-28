<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center
        .table-main
            div.table-ctn(v-if="!isInput && !isInput1")
                .page-title 健康讲堂配置

                el-menu.tabs(theme="" :default-active="activeTab+''" class="el-menu-demo" mode="horizontal")
                    el-menu-item(v-for="(item, i) in tabs" :index="i+''" @click="activeTab=i;" :key="i") {{item}}

                div(v-show="activeTab==0")
                    .search-ctn
                        el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                            el-form-item(label="专辑名称")
                                el-input(placeholder="专辑名称" v-model="searchMsg.name")
                            el-form-item( class="search-time" label="编辑时间")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                        el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                        a.reset-form(@click="clearSearch")  清空筛选条件
                        el-button(type="success" @click="add" ref="add") 添加专辑

                    mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :tabOp="tabOp"
                        :totalPage="totalPage1" :currentPage="currentPage1"
                        @edit="edit" @editAdmin="editAdmin" @pageChange="pageChange")

                div(v-show="activeTab==1")
                    .search-ctn
                        el-form(:inline="true" :model="searchMsg1" class="demo-form-inline")
                            el-form-item(label="详情标题")
                                el-input(placeholder="详情标题" v-model="searchMsg1.name")
                            el-form-item( class="search-time" label="编辑时间")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg1.startTime" style="width: 100%;")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg1.endTime" style="width: 100%;")

                        el-button(type="primary" icon="search" @click="searchList1") 按条件查询
                        a.reset-form(@click="clearSearch1")  清空筛选条件
                        el-button(type="success" @click="add1") 添加详情

                    mtable(:keys="keys1" :tableData="tableData1" :ops="operates1" :selfApi="selfApi1"
                        :totalPage="totalPage1" :currentPage="currentPage1"
                        @edit="edit1" @pageChange="pageChange1")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}专辑
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="专辑名称")
                            el-input(type="text" v-model="editItem.vendorName" placeholder="15字以内的汉字和数字组合")

                        el-form-item(label="总期数")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="3位以内数字")

                        .border-line

                        el-button(type="primary" @click="editOk") 完成
                        el-button(type="success" @click="editOk(doneThen)") 完成，去配置对应详情

            div.edit-ctn(v-if="isInput1")
                .page-title {{curOperate1}}课堂详情
                .form-ctn
                    el-form(:model="editItem1" label-width="80px")
                        el-form-item(label="序号")
                            el-input(type="text" v-model="editItem1.realname" placeholder="9位以内数字")

                        el-form-item(label="描述")
                            el-input(type="textarea" v-model="editItem1.realname" placeholder="80个以内的汉字和数字组合")

                        el-form-item(label="详情配图")
                            el-upload(class="avatar-uploader" accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileList" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb


                        el-form-item(label="评分")
                            el-input(type="text" v-model="editItem1.realname" placeholder="1到10数字")

                        el-form-item(label="浏览量")
                            el-input(type="text" v-model="editItem1.realname" placeholder="8位以内数字")

                        .border-line

                        el-form-item(label="所属专辑")
                            el-select(placeholder="请选择" v-model="searchMsg.classId" )
                                el-option(v-for="(item, i) in classList" class="s1" :label="item.vendorName" :value="item.id" :key="i")

                        el-form-item(label="现期数")
                            el-input(type="text" v-model="editItem1.realname" placeholder="须小于总期数")

                        el-form-item(label="原价")
                            el-input(type="text" v-model="editItem1.realname" placeholder="须小于总期数")

                        el-form-item(label="现价")
                            el-input(type="textarea" v-model="editItem1.realname" placeholder="须小于总期数")

                        .border-line

                        el-form-item(label="主讲简介")
                            el-input(type="textarea" v-model="editItem1.realname" placeholder="须小于总期数")

                        el-form-item(label="知识要点")
                            el-input(type="textarea" v-model="editItem1.realname" placeholder="须小于总期数")

                        el-form-item(label="讲课视频")
                            el-upload(class="avatar-uploader" accept="video/*"
                                drag :action="upImgUrl" name="upfile" :file-list="videoList" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb

                        el-button(type="primary" @click="editOk1") 完成

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'
import mixTable1 from '@/basic/mixins/mixin1.js'
import upfile from '@/basic/mixins/upfile.js'

// table列表组件
import mtable from '@/page/public/table.vue'
import navCenter from '@/page/public/nav-center.vue'

// 地区选择插件
import vDistpicker from 'v-distpicker'
export default {
    name: 'role',
    mixins: [mixTable, mixTable1, upfile],
    components: {
        mtable,
        navCenter,
        vDistpicker
    },
    data(){
        return {
            classList: [],    // 专辑下拉框
            fileList: [],   // 封面图片数组
            videoList: [],   // 视频数组
            activeTab: 0,
            tabs: ['专辑配置', '详情配置'],
            tableData: [],
            tableData1: [],
            searchMsg: {
                name: '',
                startTime: '',
                endTime: ''
            },
            searchMsg1: {
                name: '',
                startTime: '',
                endTime: ''
            },
            totalPage: 0,
            totalPage1: 0,
            currentPage: 0,
            currentPage1: 0,
            keys: [
                {key: 'name', str: '专辑名称'},
                {key: 'startTime', str: '总期数'},
                {key: 'startTime', str: '编辑时间'}
            ],
            keys1: [
                {key: 'name', str: '所属专辑'},
                {key: 'startTime', str: '详情名称'},
                {key: 'startTime', str: '现价/原价'},
                {key: 'startTime', str: '现期数/总期数'},
                {key: 'startTime', str: '状态'},
                {key: 'startTime', str: '编辑时间'}
            ],
            operates: [
                {f:'edit', str: '编辑'}
            ],
            operates1: [
                {f:'edit', str: '编辑'}
            ],
            selfApi: {
                list: {type: 'get', url: '/vendor/searchList'},
                edit: {type: 'post', url: '/vendor/updateDo'},
                add: {type: 'post', url: '/vendor/addDoAction'}
            },
            selfApi1: {
                list: {type: 'get', url: '/vendor/searchList'},
                edit: {type: 'post', url: '/vendor/updateDo'},
                add: {type: 'post', url: '/vendor/addDoAction'}
            },
            // 搜索的各个字段配置
            searchKeys: ['name', 'startTime', 'endTime'],
            searchKeys1: ['name', 'startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['vendorName', 'vendorCode', 'address', 'logo'],
            editKeys1: ['name', 'vendorCode', 'address', 'logo']
        }
    },
    async mounted(){
        //- this.tableData = (await tryAwait('get', '')).model || []
        this.tableData1 = (await tryAwait('get', '')).model || []
    },
    methods: {
        //- getAllLevel(level1, num){     // 递归处所有的层级的选项
        //-     // var n = 0
        //-     level1.forEach(async (v)=>{
        //-         v.childVal = (await tryAwait('get', '/permission/menu/'+v.id)).model || [];
        //-         // n++
        //-         // if(num && num == n) return
        //-         this.getAllLevel(v.childVal);
        //-     })
        //-     return level1;
        //- },
        upImgSuccess(v){
            var img0 = v.model[0]
            this.fileList = [{
                name: img0.filename,
                url: img0.url
            }]
            this.editItem1.logo = img0.url + img0.filename;
        },

        selfEdit1(){
            this.fileList = [{
                name: this.editItem1.vendorLogoUrl,
                url: this.editItem1.imgUrl
            }];
            this.editItem1.logo = this.editItem.vendorLogoUrl;
        },

        doneThen(d){
            this.isInput = false;
            this.isInput1 = true;
        },

        testRule() {
            alert('验证详情输入');
            return true;
        },
        testRule() {
            alert('验证专辑输入')
            if(this.editItem.vendorName.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '填写名称~'
                })
                return false
            }
            if(this.editItem.vendorCode.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '输入编码~'
                })
                return false
            }
            if(!this.editItem.province || !this.editItem.city || !this.editItem.zone){
                this.$message({
                    type: 'error',
                    message: '地址选择有误'
                })
                return false
            }
            if(this.editItem.address.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '详细地址选择有误'
                })
                return false
            }
            if(!this.editItem.logo || this.editItem.logo == ''){
                this.$message({
                    type: 'error',
                    message: '还没上传图片~'
                })
                return false
            }
            // 编辑时this.editItem会带有很多别的数据,这里用临时变量option重新整理出来给this.editItem
            // 理论上不重新整理也是可以的
            var option = {
                vendorName: this.editItem.vendorName,
                code: this.editItem.vendorCode,
                logo: this.editItem.logo,
                province: this.editItem.province,
                city: this.editItem.city,
                zone: this.editItem.zone,
                address: this.editItem.address,
                provinceName: this.editItem.provinceName,
                cityName: this.editItem.cityName,
                zoneName: this.editItem.zoneName,
            }
            if(this.editItem.id) option.id = this.editItem.id;
            this.editItem = option
            return true;
        },

        async editAdmin(scope) {   // 配置管理员帐号
            // 获取当前供应商管理员帐号信息
            this.newAdminAccount = await tryAwait('get', '/vendor/editAdmin/'+scope.row.id);
            this.isAdd = true;
            this.isInput = true;
        },

        // 树形框相关事件
        //- handleNodeClick(data){
        //-     //- console.log('tree data')
        //-     //- console.log(data)
        //- },
        //- async loadNode(node, resolve){    // 异步获取数据
        //-     console.log('node')
        //-     console.log(node)
        //-     if (node.level === 0) {
        //-         return resolve((await tryAwait('get', '/permission/businessGrop')).model || []);
        //-     }
        //-     var res = (await tryAwait('get', '/permission/menu/' + node.data.id)).model || [];
        //-     if(res != []){
        //-         //- this.powers
        //-     }
        //-     resolve(res);
        //- },
        //- handleCheckChange(data, checked, indeterminate) {
        //-     //- console.log(data, checked, indeterminate);
        //-     //- console.log(this.$refs.powerTree.getCheckedNodes())
        //- },
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
