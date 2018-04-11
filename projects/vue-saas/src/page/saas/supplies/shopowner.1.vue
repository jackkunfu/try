<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 店长配置
                .search-ctn
                    el-form(:inline="true" v-model="searchMsg" class="demo-form-inline")
                        el-form-item(label="店长姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.clerkName")
                        el-form-item(label="店长手机")
                            el-input(placeholder="输入店长手机号" v-model="searchMsg.clerkMobile")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="resetForm('search')")  清空筛选条
                    a.reset-form(@click="clearSearch")  清空筛选条件

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @edit="edit" @pageChange="pageChange" @unbund='unbund' :tabOp="tabOp")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}店长
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="店长姓名")
                            el-input(type="text" placeholder="最多8个汉字" v-model="editItem.realname")
                        el-form-item(label="身份证号")
                            el-input(type="text" placeholder="18位居民身份证号码" v-model="editItem.idCard")
                        el-form-item(label="手机号码")
                            el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile")
                        .border-line
                        el-form-item(label="员工编号")
                            el-input(type="text" v-model="editItem.clerkNum")
                        el-form-item(label="所属片区")
                            el-select(placeholder="请选择所属片区" v-model="editItem.areaId" disabled)
                                el-option(v-for="(item,i) in zoneList" :label="item.areaName" :value="item.id" :key="i")
                        el-form-item(label="所属门店")
                            el-select(placeholder="请选择所属门店" v-model="editItem.storeId" disabled)
                                el-option(v-for="(item,i) in shopList" :label="item.storeName" :value="item.storeId" :key="i")
                        .border-line
                        el-button.left(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回
</template>

<script>

export default {
    name: 'role',
    mixins: [mixTable],
    data(){
        return {
            isInput: false,
            zoneList: [],
            shopList: [],
            origin: {},
            keys: [
                {key: 'realname', str: '名字'},
                {key: 'mobile', str: '手机'},
                {key: 'clerkNum', str: '员工编号'},
                {key: 'vendorName', str: '供应商'},
                {key: 'areaName', str: '所属片区'},
                {key: 'storeName', str: '所属门店'},
                {key:'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'unbund', str: '解绑'}
            ],
            selfApi: {
                list: {type: 'get', url: '/smanager/index'},
                edit: {type: 'post', url: '/smanager/editDo'},
                unbund: {type: 'post', url: '/smanager/delete'}
            },
            searchKeys: ['clerkName', 'clerkMobile'],
            editKeys: ['realname', 'idCard', 'mobile', 'clerkNum', 'areaId', 'storeId']
        }
    },
    async mounted(){
        if(this.$route.query.op && this.$route.query.op == "add"){
            if(this.$route.query.info){
                if(this.$route.query.info.clerk) this.editItem = this.$route.query.info.clerk;
                if(this.$route.query.info.store){
                    this.editItem.areaId = this.$route.query.info.store.vendorAreaId;
                    this.editItem.storeId = this.$route.query.info.store.id;
                }
            }
            if(this.$route.query.info.clerk){
                this.curOperate = '编辑'
            }else{
                this.curOperate = '新增'
            }
            this.curEditing.id = this.$route.query.storeId;

            // this.editItem.storeId = this.$route.query.storeId;
            this.isInput = true;
        }
        var zoneData = await tryAwait('get', '/zone/index');
        if(zoneData && zoneData.success){
            this.zoneList = zoneData.model
        }
        var shopData = await tryAwait('get', '/store/index');
        if(shopData && shopData.success){
            this.shopList = shopData.model
        }
    },
    methods: {
        getShop(){
            var areaId = this.editItem.areaId;
            alert(areaId);
        },
        selfEdit(item){
            this.curEditing = { index: item.$index, id: item.row.userId }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        unbund(scope){
            this.$confirm('确定解绑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                var id = scope.row.userId;
                var res = await tryAwait('post', '/smanager/delete', {clerkId: id});
                res.success && this.tableList(this.currentPage);
            })
        },
        testRule(){
            if(!this.editItem.realname || this.editItem.realname.trim() == ''){
                this.$message({
                    type: 'error',
                    message: "姓名不能为空"
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
            if( !this.editItem.clerkNum || this.editItem.clerkNum.trim() == '' ){
                this.$message({
                    type: 'error',
                    message: "编号没填"
                })
                return false
            }
            if( !this.editItem.areaId || this.editItem.areaId == '' ){
                this.$message({
                    type: 'error',
                    message: "没选片区"
                })
                return false
            }
            if( !this.editItem.storeId || this.editItem.storeId == '' ){
                this.$message({
                    type: 'error',
                    message: "没选片区"
                })
                return false
            }

            return true;
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
