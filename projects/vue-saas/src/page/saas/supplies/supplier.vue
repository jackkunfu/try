<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 供应商配置
                .search-ctn
                    //- el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="供应商名称")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.vendorName" value="searchMsg.vendorName")
                        el-form-item(label="管理员手机")
                            el-input(placeholder="输入管理员手机" v-model="searchMsg.mobile" value="searchMsg.mobile")
                        br
                        el-form-item( class="search-time" label="活动时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                    //- el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加供应商

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @edit="edit" @editAdmin="editAdmin" @pageChange="pageChange")

            div.edit-ctn(v-show="isInput && !isAdd")
                .page-title {{curOperate}}供应商
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")
                        el-form-item(label="供应商名称")
                            el-input(type="text" v-model="editItem.name" placeholder="20个以内的汉字和数字组合")

                        el-form-item(label="供应商编码")
                            el-input(type="text" v-model="editItem.alias" placeholder="输入供应商编码")

                        //- .border-line
                        //- el-form-item(class="edit-address" label="总部地址")
                            v-distpicker(@province="province" @city="city" @area="area"
                                :province="editItem.provinceName" :city="editItem.cityName" :area="editItem.zoneName")

                        //- el-form-item(label="详细地址")
                            el-input(type="textarea" v-model="editItem.address" placeholder="详细地址")

                        //- el-form-item(label="logo图片")
                            el-upload(class="avatar-uploader" show-file-list=false accept="image/*"
                                drag :action="upImgUrl" name="upfile" :file-list="fileList" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                                :data="upImgData" :on-success="upImgSuccess")
                                i( class="el-icon-upload")
                                //- div( class="el-upload__text") 将文件拖到此处，或
                                //-     em 点击上传
                                div( class="el-upload__tip" slot="tip") 只能上传jpg/png文件，且不超过500kb

                        el-form-item(label="供应商图标")
                            div.upfile
                                input(type="file" ref="up1")
                                button 点击上传
                                img(:src="editItem.logoUrl" style="max-width: 100px;max-height: 100px;")

                        //- .border-line

                        el-button.left(type="primary" @click="editOk") 完成
                        //- el-button.left(type="success" @click="editOk(doneThen)") 完成，去配置对应管理员
                        .goBack(@click="goBack") 返回


            //- div.edit-ctn(v-if="isAdd")
                .page-title 编辑供应商管理员账号
                .form-ctn
                    el-form(:model="newAdminAccount" label-width="80px")
                        el-form-item(label="真实姓名")
                            el-input(type="text" auto-complete="off" v-model="newAdminAccount.realname" placeholder="20个以内的汉字和数字组合")

                        el-form-item(label="手机号码")
                            el-input(type="text" auto-complete="off" v-model="newAdminAccount.mobile" placeholder="11位中国大陆手机号码")

                        el-form-item(label="登录密码")
                            el-input(type="text" auto-complete="off" v-model="newAdminAccount.password" placeholder="不填写则默认为手机号码后6位")

                        el-form-item(label="虚拟店铺")
                            el-radio-group(v-model="newAdminAccount.isStore")
                                el-radio(:label="1") 添加至虚拟店铺
                                el-radio(:label="0") 不添加至虚拟店铺

                        .border-line

                        el-form-item(label="业务权限")
                            el-tree(:default-expanded-keys="[]" :default-checked-keys="[]"
                                :data="powers" :props="defaultProps" show-checkbox
                                ref="powerTree")
                                //- // 异步加载先不用
                                //- // :load="loadNode"
                                //- // lazy
                                //- // @node-click="handleNodeClick"
                                //- // @check-change="handleCheckChange"

                        el-button.left(type="primary" @click="addAdminAccount") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>
import upfile from '@/basic/mixins/upfile.js'
import upOss from '@/basic/mixins/upOss.js'
export default {
    name: 'supplier',
    mixins: [mixTable, upfile, upOss],
    data(){
        var _this = this;
        return {
            // 上传图片大小限制 单位 M
            upImgSize: 0.5,
            isAdd: false,
            newAdminAccount: {
                realname: '',
                mobile: '',
                password: '',
                isStore: ''
            },

            fileList: [],

            addItem: {},

            powers: [],    // 权限列表
            defaultProps: {    //  组件对应权限配置字段
                children: 'children',
                label: 'permissionName'
            },

            /*
             * 必须配置的字段， 公共组件table.vue里使用
             */
            // 列表头部的各个字段以及对应的表头
            keys: [
                {key: 'imgUrl', str: 'Logo图片'},
                {key: 'vendorName', str: '供应商名称'},
                // {key: 'address', str: '公司地址'},
                {key: 'vendorCode', str: '编码'},
                // {key: 'createdTime', str: '添加时间'},
            ],
            // 列表中的各个操作
            operates: [
                {f:'edit', str: '编辑'},
                // {f:'self', str: '编辑管理员帐号', fun: 'editAdmin', ref:""}
            ],
            // 搜索的各个字段配置
            searchKeys: [],   // 'vendorName', 'vendorCode', 'startTime', 'endTime'
            // 编辑的各个字段配置
            editKeys: ['name', 'alias', 'logoUrl']
        }
    },
    async mounted(){
        this.$set(this.addItem, 'name', '');
        this.$set(this.newAdminAccount, 'realname', '');
        this.$set(this.newAdminAccount, 'mobile', '');
        this.$set(this.newAdminAccount, 'password', '');
        this.$set(this.newAdminAccount, 'isStore', '');


        this.$nextTick(()=>{
            this.$refs.up1.addEventListener('change', () =>{
                this.upOss(this.$refs.up1.files[0]).then( res =>{
                    this.$set(this.editItem, 'logoUrl', 'http://files.iputong.com/Saas2/' + res)
                    // this.editItem.logoUrl = 'http://files.iputong.com/Saas2/' + res;
                });
            })
        })

        // 获取权限树
        // 获取第一级
        //- var level1 = (await tryAwait('get', '/permission/businessGrop')).model || [];
        //- this.powers = level1;
        // 遍历获取所有
        //- this.powers = this.getAllLevel(level1);
        // this.powers = (await tryAwait('get', '/vendor/tree')).model || [];
        // console.log('this.powers')
        // console.log(this.powers)

    },
    methods: {

        async tableList(){
            var opts1 = {
                _api: 'pd.vendor.list',
                limit: 10,
                offset: (this.currentPage - 1)*10
            }
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = this.changeTableData(userData);
            this.tableData = userData;
            user.success || this.$message({
                type: 'error',
                message: user.msgInfo,
                offset: 100
            });
        },

        changeItem(item){
            item.imgUrl = item.vendorLogoUrl.indexOf('http') > -1 ? item.vendorLogoUrl : 'http://s1.healthbok.com/' + item.vendorLogoUrl;
            return item
        },

        changeTableData(data){
            return data.forEach( el =>  this.changeItem(el));
        },

        async editOk(){
            if( (this.editItem.name+'').trim() == '' ){
                this.$message({
                    type: 'error',
                    message: '名称不能为空~'
                })
                return
            }
            if( (this.editItem.alias+'').trim() == '' ){
                this.$message({
                    type: 'error',
                    message: '编码不能为空'
                })
                return
            }
            if( (this.editItem.logoUrl+'').trim() == '' ){
                this.$message({
                    type: 'error',
                    message: '图片没有上传~'
                })
                return
            }
            var opt = {
                _api: this.curOperate == '编辑' ? 'pd.vendor.update' : 'pd.vendor.add',
                
            }
            if(this.curOperate == '编辑') opt.vendorId = this.curEditing.id
            var opts1 = $.extend(true, opt, this.editItem)
            var d1 = await tryAwait('get', '', opts1, true);
            this.$message({
                type: d1 && d1.success ? 'success' : 'error',
                message: d1.msgInfo || (d1 && d1.success ? this.curOperate+'成功' : this.curOperate+'失败')
            })
            if(d1 && d1.success){
                this.isInput = false;
                this.tableList();
            }
        },

        

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
            //- console.log(v)
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
            this.editItem.logo = img0.url + img0.filename;
        },

        selfEdit(item){
            console.log(item);
            this.editItem = {
                name: item.row.vendorName,
                logoUrl: item.row.imgUrl,
                alias: item.row.vendorCode,
                status: item.row.status ? true : false
            }
        },

        doneThen(d){
            this.newAdminAccount.vendorId = d.model;
            this.isInput=true;
            this.isAdd=true
        },

        async addAdminAccount(){
            if(!localStorage.pdSaasVendorId || localStorage.pdSaasVendorId == 'undefined'){
                this.$message({
                    type: 'error',
                    message: '请重新登录'
                })
                return;
            }
            if(this.newAdminAccount.realname.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '填写名称~'
                })
                return false
            }
            if(this.newAdminAccount.mobile.trim() == '' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.newAdminAccount.mobile.trim()))){
                this.$message({
                    type: 'error',
                    message: '手机号有误~'
                })
                return false
            }
            //- if(this.newAdminAccount.password.trim() == ''){
            //-     this.$message({
            //-         type: 'error',
            //-         message: '输入密码~'
            //-     })
            //-     return false
            //- }
            if(this.newAdminAccount.isStore.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '请选择是否是虚拟店铺~'
                })
                return false
            }
            var powerTree = this.$refs.powerTree.getCheckedNodes();
            if(powerTree.length == 0){
                this.$message({
                    type: 'error',
                    message: '须配置权限~'
                })
                return false;
            }
            if(!this.newAdminAccount.password || this.newAdminAccount.password.trim() == ''){
                this.newAdminAccount.password = this.newAdminAccount.mobile.substr(this.newAdminAccount.mobile.length-6, 6)
            }
            var option = this.newAdminAccount;
            option.permissionIdS = JSON.stringify(powerTree);

            option.vendorId = localStorage.pdSaasVendorId;

            //- option.gropPermission = powerTree;
            var request = await tryAwait('post', '/vendor/addAdminDoAction', option)
            if(request.success){
                this.isInput=true;
                this.isAdd=false
            }
        },

        // 地址选择改变事件
        province(v){
            this.editItem.province = v.code;
            this.editItem.provinceName = v.value;
            this.editItem.city = '';
            this.editItem.zone = '';
        },
        city(v){
            this.editItem.city = v.code;
            this.editItem.cityName = v.value;
            this.editItem.zone = '';
        },
        area(v){
            this.editItem.zone = v.code;
            this.editItem.zoneName = v.value;
        },

        // 新增编辑之前的验证
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
            var option = {
                vendorName: this.editItem.vendorName,
                vendorCode: this.editItem.vendorCode,
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
            var data = await tryAwait('get', '/vendor/editAdmin/'+scope.row.id);
            if(data.success){
                this.newAdminAccount = data.model ;
                this.powers = JSON.parse(data.model.gropPermission);
                this.newAdminAccount.isStore = data.model.isStroe;
            }
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
