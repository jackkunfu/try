<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center
        .table-main
            div.table-ctn(v-if="!isInput && !isInput1")
                .page-title 优惠码配置

                el-menu.tabs(theme="" :default-active="activeTab+''" class="el-menu-demo" mode="horizontal")
                    el-menu-item(index="0" @click="activeTab=0;") 总览
                    el-menu-item(index="1" @click="activeTab=1;") 分享

                div(v-show="activeTab==0")
                    .search-ctn
                        el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                            el-form-item(label="序号")
                                el-select(placeholder="请选择" v-model="searchMsg.sortType")
                                    el-option(label="从小到大" value="ASC")
                                    el-option(label="从大到小" value="DESC")

                            el-form-item(label="展现形式")
                                el-select(placeholder="请选择" v-model="searchMsg.APP")
                                    el-option(label="全部" value="0")
                                    el-option(label="微信" value="1")
                                    el-option(label="C端" value="2")

                            el-form-item(label="优惠券类型")
                                el-select(placeholder="请选择" v-model="searchMsg.type")
                                    el-option(v-for="(item,i) in couponTypeList" :label="item.name" :value="item.value" :key="i")

                            el-form-item(label="状态")
                                el-select(placeholder="请选择" v-model="searchMsg.statu")
                                    el-option(label="上架" value="1")
                                    el-option(label="下架" value="0")
                                    //- el-option(label="预热券" value="3")
                                    //- el-option(label="非预热券" value="4")

                            el-form-item(label="是否推荐系统")
                                el-radio-group(v-model="searchMsg.isRecom")
                                    el-radio(label="1") 是
                                    el-radio(label="2") 否

                            el-form-item( class="search-time" label="活动有效期")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                                el-col(:span="11")
                                    el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                        el-button(type="primary" icon="search" @click="searchList") 按条件查询
                        a.reset-form(@click="clearSearch")  清空筛选条件
                        el-button(type="success" @click="add") 添加优惠券

                    mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :tabOp="tabOp"
                        :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange"
                        @edit="edit" @onShelf="onShelf" @offShelf="offShelf")

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

                        el-button(type="primary" icon="search" @click="searchList1" ref="search") 按条件查询
                        a.reset-form(@click="clearSearch1")  清空筛选条件
                        el-button(type="success" @click="add1" ref="add") 添加详情

                    mtable(:keys="keys1" :tableData="tableData1" :ops="operates1" :selfApi="selfApi1"
                        :totalPage="totalPage1" :currentPage="currentPage1"
                        @edit="edit1" @pageChange="pageChange1")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}优惠券
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        .title 步骤一
                        el-form-item(label="所属区域")
                            el-select(placeholder="请选择" v-model="editItem.areaId")
                                el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.id" :key="i")

                        .title 步骤二
                        el-form-item(label="优惠券类型")
                            el-select(placeholder="请选择" v-model="editItem.type")
                                el-option(v-for="(item,i) in couponTypeList" :label="item.name" :value="item.value" :key="i")

                        el-form-item(label="优惠券细则")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(label="商品分类")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(label="商品名称")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="30位以内数字")

                        el-form-item(label="详细条款")
                            el-input(type="textarea" v-model="editItem.vendorCode" placeholder="500位以内数字")

                        el-form-item(label="优惠券分类")
                            el-select(placeholder="请选择" v-model="editItem.classId")
                                el-option(v-for="(item,i) in couponCatelogoList" :label="item.name" :value="item.value" :key="i")

                        el-form-item(label="推荐系统")
                            el-radio-group(v-model="editItem.isValidStr")
                                el-radio(label="0") 图片
                                el-radio(label="1") URL
                                el-radio(label="2") 视频
                                el-radio(label="3") 图文

                        el-form-item(label="兑换方式")
                            el-radio-group.block(v-model="editItem.isValidStr")
                                el-radio(label="免费领取")
                                el-radio(label="收费购买")
                                    | 收费购买
                                    el-input(type="text" class="radio-input" v-model="editItem.vendorCode" placeholder="5位以内数字")

                                el-radio(label="积分兑换")
                                    | 积分兑换
                                    el-input(type="text" class="radio-input" v-model="editItem.vendorCode" placeholder="5位以内数字")

                                el-radio(label="收费+积分")
                                    | 收费+积分
                                    el-input(type="text" class="radio-input" v-model="editItem.vendorCode" placeholder="5位以内数字")
                                    span(style="position:absolute;right: -10px;top:0;") +
                                    br
                                    el-input(type="text" class="radio-input" v-model="editItem.vendorCode" placeholder="5位以内数字")

                        .title 步骤三
                        el-form-item(label="序号")
                            el-input(type="text" v-model="editItem.sortType" placeholder="10位以内数字")

                        el-form-item(label="展现形式")
                            el-select(placeholder="请选择" v-model="editItem.app")
                                el-option(label="全部" value="0")
                                el-option(label="微信" value="1")
                                el-option(label="C端" value="2")

                        el-form-item(label="渠道" v-model="editItem.aaaa")
                            el-radio(label="一树药业")
                            el-radio(label="退休好生活")

                        el-form-item(label="限购次数")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(label="发券数量")
                            el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(class="search-time" label="活动期限")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg1.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg1.endTime" style="width: 100%;")

                        el-form-item(label="订单形式")
                            el-radio(label="二维码")
                            el-radio(label="订单号")

                        .title 步骤四
                        el-form-item(label="商品图片")
                            el-upload(class="avatar-uploader" show-file-list=false accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileListGood" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb
                        el-form-item(label="商品详情")
                            el-upload(class="avatar-uploader" show-file-list=false accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileListGoodDetail" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb

                        .title 步骤五
                        el-form-item(label="分享标题")
                            el-form-item(label="发券数量")
                                el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(label="分享详情")
                            el-form-item(label="发券数量")
                                el-input(type="text" v-model="editItem.vendorCode" placeholder="10位以内数字")

                        el-form-item(label="分享图片")
                            el-upload(class="avatar-uploader" show-file-list=false accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileListShare" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb

                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

            //- div.edit-ctn(v-if="isInput1")
                .page-title {{curOperate1}}课堂详情
                .form-ctn
                    el-form(:model="editItem1" label-width="80px")
                        el-form-item(label="序号")
                            el-select(placeholder="请选择" v-model="searchMsg.classId")
                                el-option(label="从小到大" value="1")
                                el-option(label="从大到小" value="2")

                        el-button(type="primary" @click="editOk1") 完成

</template>

<script>
// table 公共逻辑 mixins
import mixTable1 from '@/basic/mixins/mixin1.js'
import upfile from '@/basic/mixins/upfile.js'

import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'role',
    mixins: [mixTable, mixTable1, upfile],
    components: {
        mtable,
        navCenter
    },
    data(){
        return {
            couponTypeList: [   //  优惠券类型数组
                {name: '满减', value: '1'},
                {name: '直减', value: '2'},
                {name: '折扣', value: '3'},
                {name: '买送', value: '4'},
                {name: '原价-现价', value: '5'},
                {name: '满折', value: '6'},
                {name: '组合原价-现价', value: '7'},
                {name: '满购加钱换', value: '8'},
                {name: '满商品第几件打折', value: '9'},
                {name: '满送', value: '10'}
            ],
            couponCatelogoList: [],    // 优惠券分类
            areaList: [],   // 区域列表
            fileListGood: [],   // 商品图片数组
            fileListGoodDetail: [],   // 商品详情图片数组
            fileListShare: [],   // 分享图片数组
            videoList: [],   // 视频数组
            activeTab: 0,
            searchMsg1: {
                name: '',
                startTime: '',
                endTime: ''
            },
            operates: [
                {f:'edit', str: '编辑'},
                {f:'onShelf', str: '上架'},
                {f:'offShelf', str: '下架'},
                {f:'preheat', str: '预热'}
            ],
            keys: [
                {key: 'serialNum', str: '序号'},
                {key: 'appName', str: '渠道'},
                {key: 'type', str: '优惠券类型'},
                {key: 'title', str: '类型标题'},
                {key: 'detail', str: '类型细则'},
                {key: 'className', str: '对应分类'},
                {key: 'products', str: '对应商品'},
                {key: 'startTime', str: '开始时间'},
                {key: 'endTime', str: '过期时间'},
                {key: 'ruleStr', str: '详细规则'},
                {key: 'useType', str: '优惠券分类'},
                //- {key: 'codeTitle', str: '优惠码标题'},
                {key: 'statusKeys', str: '状态'},
                //- {key: 'startTime', str: '商品分类'},
                //- {key: 'startTime', str: '商品名称'},
                //- {key: 'startTime', str: '优惠券类型'},
                //- {key: 'startTime', str: '订单形式'},
                //- {key: 'statusKey', str: '状态'},
                //- {key: 'endTime', str: '活动有效期'}
            ],
            keys1: [
                {key: 'name', str: '所属专辑'},
                {key: 'startTime', str: '详情名称'},
                {key: 'startTime', str: '现价/原价'},
                {key: 'startTime', str: '现期数/总期数'},
                {key: 'startTime', str: '状态'},
                {key: 'startTime', str: '编辑时间'}
            ],
            operates1: [
                {f:'edit', str: '编辑'}
            ],
            selfApi: {
                list: {type: 'get', url: '/coupon/list'},
                edit: {type: 'post', url: '/vendor/updateDo'},
                add: {type: 'post', url: '/vendor/addDoAction'}
            },
            selfApi1: {
                list: {type: 'get', url: '/vendor/searchList'},
                edit: {type: 'post', url: '/vendor/updateDo'},
                add: {type: 'post', url: '/vendor/addDoAction'}
            },
            // 搜索的各个字段配置
            searchKeys: ['sortType', 'app', 'statu', 'startTime', 'endTime', 'isRecom', 'type'],
            searchKeys1: ['name', 'startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['app', 'sortType', 'statu', 'startTime', 'endTime', 'type'],
            editKeys1: ['name', 'vendorCode', 'address', 'logo']
        }
    },
    async mounted(){
        this.couponCatelogoList = (await tryAwait('get', '/couponCategory/couponList')).model || [];
    },
    methods: {
        onShelf(scope){
            var id = scope.row.id;
        },
        offShelf(scope){
            var id = scope.row.id;
        },
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map((v)=>{
                // 状态
                var str = '';
                if(v.status == 1) str += '上架中 ';
                else if(v.status == 0) str += '下架中 ';
                else if(v.status == -1) str += '已删除 ';
                str += v.preheat == 1 ? '预热券':'非预热劵';
                v.statusKeys = str;

                // 规则
                v.ruleStr = JSON.parse(v.rule).reduce((a, b)=>{
                    a += b.text+'\n';
                    return a;
                }, '');

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
            //- var option = {
            //-     vendorName: this.editItem.vendorName,
            //-     code: this.editItem.vendorCode,
            //-     logo: this.editItem.logo,
            //-     province: this.editItem.province,
            //-     city: this.editItem.city,
            //-     zone: this.editItem.zone,
            //-     address: this.editItem.address,
            //-     provinceName: this.editItem.provinceName,
            //-     cityName: this.editItem.cityName,
            //-     zoneName: this.editItem.zoneName,
            //- }
            //- if(this.editItem.id) option.id = this.editItem.id;
            //- this.editItem = option
            return true;
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
