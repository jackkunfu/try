<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-show="!isInput")
                .page-title 店员配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="店员姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.clerkName")

                        el-form-item(label="店员手机" )
                            el-input(placeholder="输入店员手机号" v-model="searchMsg.clerkMobile")

                        el-form-item(label="员工编号")
                            el-input(placeholder="输入员工编号" v-model="searchMsg.clerkNumber")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加店员
                    el-button(type="success" @click="isInput=true;isLot=true" ref="import") 批量添加店员

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @edit="edit" @pageChange="pageChange" @unbund="unbund" :tabOp="tabOp")

            div.edit-ctn(v-show="isInput && !isLot")
                .page-title {{curOperate}}店员
                .form-ctn
                    el-form(v-model="editItem" label-width="80px")
                        el-form-item(label="店员姓名" )
                            el-input(type="text" placeholder="最多8个汉字" v-model="editItem.realname")
                        el-form-item(label="身份证号" )
                            el-input(type="text" placeholder="18位居民身份证号码" v-model="editItem.idCard")
                        el-form-item(label="手机号码" )
                            el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile")
                        .border-line
                        el-form-item(label="员工编号" )
                            el-input(type="text" v-model="editItem.clerkNum")
                        el-form-item(label="所属片区" )
                            el-select(placeholder="请选择所属片区" v-model="editItem.vendorAreaId" @change="getShop")
                                el-option(v-for="item in areaList" :label="item.areaName" :value="item.id" :key="item.id" class="s2")
                        el-form-item(label="所属门店" )
                            el-select(placeholder="请选择所属门店" v-model="editItem.storeId")
                                el-option(v-for="item in shopList" :label="item.storeName" :value="item.id" :key="item.id" class="s3")
                        .border-line
                        el-button.left(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

            div.edit-ctn(v-show="isLot")
                .page-title 批量增加店员
                .form-ctn
                    el-upload(class="avatar-uploader" :file-list="fileList" accept="application/vnd.ms-excel"
                        drag :action="upImgUrl" name="upfile" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                        :data="upImgData" :on-success="upImgSuccess")
                        i( class="el-icon-upload")
                        div( class="el-upload__text") 将文件拖到此处，或
                            em 点击上传

                    // 这里直接就上传完成直接处理完导入了  ，无须二次完成确认按钮
                    el-button.left(type="primary" @click="addLot") 完成
                    .goBack(@click="goBack") 返回


</template>

<script>
import upfile from '@/basic/mixins/upfile.js'

// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'

export default {
    name: 'role',
    mixins: [mixTable, upfile, scrollMore],
    data(){
        return {
            //- areaShop: [],
            isLot: false,
            curChooseAreaId: '',
            keys: [
                {key: 'realname', str: '姓名'},
                {key: 'mobile', str: '手机号'},
                {key: 'clerkNum', str: '员工编号'},
                {key: 'vendorName', str: '供应商'},
                {key: 'areaName', str: '所属片区'},
                {key: 'storeName', str: '所属门店'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'unbund', str: '解绑'}
            ],
            selfApi: {
                list: {type: 'get', url: '/clerk/index'},
                add: {type: 'post', url: '/clerk/addDo'},
                edit: {type: 'post', url: '/clerk/editDo'}
            },
            searchKeys: ['clerkName', 'clerkMobile', 'clerkNumber'],
            editKeys: ['vendorAreaId', 'storeId', 'realname', 'mobile', 'clerkNum', 'idCard'],
            areaList: [],
            shopList: [],
            zonePage: 1,
            zoneTotal: 0,
            shopPage: 1,
            shopTotal: 0
        }
    },
    async mounted(){
        //- var areaData = await tryAwait('get', '/clerk/add');
        //- this.areaList = areaData ? (areaData.model || []) : [];

        var zoneData = await tryAwait('get', '/vendor/allList')
        if(zoneData){
            this.areaList = zoneData.model || [];
            this.zoneTotal = zoneData.totalPage;
        }
        this.$nextTick(()=>{
            this.scrollMore('.s2', 'areaList', 'zonePage', 'zoneTotal', '/clerk/add');
        })

        // 页面加载时this.editItem.vendorAreaId是空的， 不需要请求门店列表
        //- var shopData = await tryAwait('get', '/store/index', { childAreaId: this.editItem.vendorAreaId })
        //- if(shopData){
        //-     this.shopList = shopData.model || [];
        //-     this.shopTotal = shopData.totalPage;
        //- }
        this.$nextTick(()=>{
            this.scrollMore('.s3', 'shopList', 'shopPage', 'shopTotal', '/store/index', { childAreaId: this.editItem.vendorAreaId });
        })
    },
    methods: {
        async edit(scope){
            var d = await tryAwait('get', '/store/edit', {storeId: scope.row.storeId});
            if(d.childAreas.success){
                this.curEditing.id = scope.row.userId;
                this.curOperate = '编辑';
                this.areaList = d.childAreas.model || [];
                this.editItem = $.extend(true, {}, scope.row);
                this.$set(this.editItem, 'vendorAreaId', scope.row.areaId);
                this.isInput = true;
            }
        },
        addLot(){
            this.isInput = this.isLot = false;
        },
        async upImgSuccess(v){
            var filename = v.model[0].filename;
            var file = await tryAwait('post', '/clerk/fileupDo', {filename: filename});
            // file && alert(file.model);
            if(file.success){
                this.$message({
                    type: 'success',
                    message: "店员上传成功~"
                })
            }else{
                this.$message({
                    type: 'error',
                    message: file.msgInfo
                })
            }
        },
        unbund(scope){
            this.$confirm('确定解绑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                var id = scope.row.userId;
                var del = await tryAwait('post', '/clerk/delete', {clerkId:id});
                del.success && this.tableList(this.currentPage);
            })
        },
        async getShop(){
            if(!this.editItem.vendorAreaId) return
            this.shopPage = 1;
            this.shopList = [];
            this.editItem.storeId = '';
            var shopData = await tryAwait('get', '/clerk/store', { childAreaId: this.editItem.vendorAreaId })
            if(shopData){
                this.shopList = shopData.model || [];
                this.shopTotal = shopData.totalPage;
            }
        },
        testRule() {
            if(!this.editItem.realname || this.editItem.realname.trim() == ''){
                this.$message({
                    type: 'error',
                    message: "姓名没填"
                })
                return false
            }
            if(!this.editItem.idCard || !(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.editItem.idCard))){
                this.$message({
                    type: 'error',
                    message: "身份证号不正确"
                })
                return false
            }
            if( !this.editItem.mobile || !( /^1(3|4|5|7|8)\d{9}$/.test(this.editItem.mobile.trim()) ) ){
                this.$message({
                    type: 'error',
                    message: "手机号不正确"
                })
                return false
            }
            return true;
        },
        selfEditCancel(){
            //- 清空上传的文件列表
            Array.prototype.forEach.call($('.el-icon-close'), function(v){
                v.click();
            })
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
