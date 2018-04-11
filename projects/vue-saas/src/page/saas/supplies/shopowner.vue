<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 店长配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="店员姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.realName")

                        el-form-item(label="店员手机" )
                            el-input(placeholder="输入店员手机号" v-model="searchMsg.mobile_ex")

                    el-button(type="primary" icon="search" @click="tableList" ref="search") 按条件查询
                    //- a.reset-form(@click="resetForm('search')")  清空筛选条
                    a.reset-form(@click="clearSearch")  清空筛选条件

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @shelf = 'shelf' @pageChange="pageChange" @unbund='unbund' :tabOp="tabOp")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}店长
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="预设手机")
                                el-input(class="search-mobile" type="number" placeholder="输入预设手机号进行查询" v-model="searchMobile")
                                el-button.right(type="primary" @click="searchMobile1" style="width: 100px;position: absolute;left:260px") 搜索
                        //- el-form-item(label="搜索信息")
                                el-input(class="search-mobile" type="textarea"  v-model="searchMobile")
                                //- el-button.right(type="primary" @click="searchMobile1" style="width: 100px;position: absolute;left:260px") 搜索
                        
                        el-form-item(label="店长姓名" v-if="!newUser")
                            el-input(type="text" placeholder="最多8个汉字" v-model="editItem.name" disabled)
                        //- el-form-item(label="身份证号")
                            el-input(type="text" placeholder="18位居民身份证号码" v-model="editItem.idCard")
                        el-form-item(label="手机号码" v-if="!newUser")
                            el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile_ex" disabled)

                        el-form-item(label="员工编号"  v-if="!newClerk && !newUser")
                            el-input(type="text" placeholder="请输入员工编号" v-model="editItem.employeeNum" disabled)

                        //- el-form-item(label="店长姓名" v-if="newUser")
                            el-input(type="text" placeholder="最多8个汉字" v-model="editItem.name")
                        //- el-form-item(label="身份证号")
                            el-input(type="text" placeholder="18位居民身份证号码" v-model="editItem.idCard")
                        //- el-form-item(label="手机号码" v-if="newUser")
                            el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile_ex")
                        
                        //- el-form-item(label="员工编号"  v-if="newClerk")
                            el-input(type="text" placeholder="请输入员工编号" v-model="editItem.employeeNum")
                        .border-line
                        el-form-item(label="所属片区")
                            el-input(type="text" placeholder="所属片区" v-model="editItem.areaName" disabled)
                            //- el-select(placeholder="请选择所属片区" v-model="editItem.areaId" disabled)
                                el-option(v-for="(item,i) in zoneList" :label="item.areaName" :value="item.id" :key="i")

                        el-form-item(label="所属门店")
                            el-input(type="text" placeholder="所属门店" v-model="editItem.storeName" disabled)
                            //- el-select(placeholder="请选择所属门店" v-model="editItem.storeId" disabled)
                                el-option(v-for="(item,i) in shopList" :label="item.storeName" :value="item.storeId" :key="i")
                        .border-line
                        el-button.left(type="primary" @click="editOk") 完成配置
                        //- .goBack(@click="goBack") 返回
</template>

<script>
var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
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
                {key: 'user.realname', str: '名字'},
                {key: 'user.mobile', str: '手机'},
                {key: 'clerk.clerkNum', str: '员工编号'},
                {key: 'clerk.vendorId', str: '供应商'},
                {key: 'clerk.vendorAreaId', str: '所属片区'},
                {key: 'clerk.storeId', str: '所属门店'},
                // {key:'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'shelf', str: '上下架删除'},
            ],
    
            searchKeys: ['realName', 'mobile_ex'],
            editKeys: ['name', 'idCard', 'mobile_ex', 'clerkNum', 'areaId', 'storeId', 'storeName'],
            searchMobile: '',
            newUser: true,
            newClerk: true,
            shopowerId: '', //角色为店长时的id（不同的供应商id不同）
        }
    },
    async mounted(){
        var query = this.$route.query;
        console.log(query.storeName)
        if(query.op && query.op == "add"){
            var data = JSON.parse(query.info || '{}');
            this.editItem.areaId = data.store.vendorAreaId || '';
            this.editItem.areaName = data.areaName || '';
            this.editItem.storeId = query.storeId || '';
            this.editItem.storeName = query.storeName || '';

            // 搜索的时候填充，默认不填充
            // this.editItem = data.clerk || {};
            // this.editItem.name = data.name || '';
            // this.editItem.mobile_ex = data.mobile || '';
            // this.editItem.employeeNum = data.clerkNum || '';

            // if(this.$route.query.info){
            //     if(this.$route.query.info.clerk) this.editItem = this.$route.query.info.clerk;
            //     if(this.$route.query.info.store){
            //         this.editItem.areaId = this.$route.query.info.areaName;
            //         this.editItem.storeId = this.$route.query.info.store.storeName;
            //     }
                
            //     this.editItem.name = this.$route.query.info.name == '无' ? '' :  this.$route.query.info.name;
            //     this.editItem.mobile_ex = this.$route.query.info.mobile == '无' ? '' : this.$route.query.info.mobile;
            //     this.editItem.employeeNum = this.$route.query.info.clerkNum == '无' ? '' : this.$route.query.info.clerkNum;
            // }
            
            if(data.clerk){
                this.curOperate = '编辑'
            }else{
                this.curOperate = '配置'
            }
            this.curEditing.id = query.storeId;
            this.isInput = true;
        }

        // 获取到角色为店长时的roleId
                
        this.roleList();

        // this.tableList();
    },
    methods: {
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'pd.employee.list',
                type: 2,
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = userData.map(v =>{
                v.status = v.clerk.status;
                return v
            });
            user.success || this.$message({
                type: 'error',
                message: user.msgInfo,
                offset: 100
            });
        },

        async roleList(){
            var opts1 = {
                _api: 'pd.perm.role.list',
                _v: '2.0',
                vendorId: venId,
            };
            var role = await tryAwait('get', '', opts1, true)
            var roleData = role.model || [];
            roleData.forEach((v,i)=>{
                if(v.roleName=='店长'){
                    this.shopowerId = v.id;
                }
            })
            console.log(roleData);
        },

        async searchMobile1(){
            if((this.searchMobile+'').trim()=='' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.searchMobile))){
                this.$message({
                    type: 'warning',
                    message: '请输入正确的预设手机号码~'
                })
                return 
            }

            // 重新初始化各个值  防止再次搜索别的号码的时候数据不变化
            this.newClerk = true;
            this.newUser = true;
            this.editItem.name = '';
            this.editItem.mobile_ex = '';
            this.editItem.employeeNum = '';
            this.editItem.userId = '';

            var role = await tryAwait('get','', {
                _api: 'pd.employee.search.single',
                vendorId: venId,
                value: this.searchMobile,
                tag: 'mobile',
            }, true);

            if(role && role.success){
                if(!role.model || !role.model.user || !role.model.user.realname){
                    this.$confirm('查无此人或者雇员名称不完整，是否去添加或更新雇员?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async() => {
                        this.$router.push({
                            path: '/sa-clerk',
                            query: {
                                isFromShopowner: 1,
                                mobile: this.searchMobile,
                                user: JSON.stringify(role.user || '{}'),
                                data: JSON.stringify(this.$route.query),
                            }
                        })
                    })
                    return;
                }
                var model = role.model;
                if(model.user){
                    var data = Object.assign(true, {}, model.clerk || {}, model.user || {});
                    this.newClerk = false;
                    this.newUser = false;
                    this.editItem.name = data.realname || '';
                    this.editItem.mobile_ex = data.mobile || '';
                    this.editItem.employeeNum = data.clerkNum || '';
                    this.editItem.userId = data.uid;
                }

                // if(role.model.user != null && role.model.clerk.clerkNum){
                //     this.newClerk = false;
                //     this.newUser = false;
                //     this.editItem.name = role.model.user.realname;
                //     this.editItem.mobile_ex = role.model.user.mobile;
                //     this.editItem.employeeNum = role.model.clerk.clerkNum;
                //     this.editItem.userId = role.model.user.uid;
                // }else if(role.model.user != null && role.model.clerk.clerkNum == null){
                //     this.newUser = false;
                //     this.newClerk = true;
                //     this.editItem.name = role.model.user.realname;
                //     this.editItem.mobile_ex = role.model.user.mobile;
                //     this.editItem.employeeNum = '';
                //     this.editItem.userId = role.model.user.uid;
                // }else{
                //     this.$message({
                //         type: 'warning',
                //         message: '暂无该用户，请填写用户信息~',
                //         offset: 100
                //     })
                //     this.newClerk = true;
                //     this.editItem.name = '';
                //     this.editItem.mobile_ex = '';
                //     this.editItem.userId = '';
                // }
            }else{
                this.$message({
                    type: 'error',
                    message: role.msgInfo,
                    offset: 100
                })
            }
            
        },

        async shelf(scope,status){
            if(status == 1){
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    var res = await tryAwait('get','',{
                        _api: 'pd.employee.shelf',
                        clerkId: scope.row.clerk.id,
                        status: -1    //0=上架，1=下架，-1=删除
                    },true);
                    if (res && res.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.tableData.splice(scope.$index, 1);
                        this.tableList();

                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msgInfo
                        });
                    }
                })
            }else{
                // alert(scope.row.clerk.status);
                var sta = scope.row.clerk.status == 1 ? 0 : 1;
                var res = (await tryAwait('post', '', {
                    _api: 'pd.employee.shelf',
                    clerkId: scope.row.clerk.id,
                    status: sta    //0=上架，1=下架，-1=删除
                }, true))
                
                if(res.success){
                    this.$message({
                        type: 'success',
                        message: res.msgInfo || '操作成功',
                        offset: 100
                    });
                    if(sta == -1){
                        this.tableData.splice(scope.$index, 1);
                        return
                    }
                    this.tableList();
                }
            }
        },

        async editOk(){
            if(this.editItem.name == '' || this.editItem.mobile_ex == ''){
                this.$message({
                    type: 'error',
                    message: '手机号为空或未查找到用户信息，须先雇员配置中添加补全~'
                })
                return
            }

            var res = await tryAwait('get','',{
                _api: 'pd.user.create',
                _v: '2.0',
                name: this.editItem.name,
                mobile_ex: this.editItem.mobile_ex,
            },true);
            if(res && res.success){
                var info = JSON.parse(this.$route.query.info || '{}')
                // console.log(res.model);
                this.editItem.status = 1,
                this.editItem.roleId = this.shopowerId,
                this.editItem.userId = res.model.uid;
                this.editItem.areaId = info.store.vendorAreaId;
                this.editItem.storeId = info.store.id;
                var opts1 = $.extend(true, {
                    _api: 'pd.employee.designate',
                    vendorId: venId,
                }, this.editItem);
                var setShopower = await tryAwait('post','',opts1,true);
                if(setShopower && setShopower.success){
                    this.$message({
                        type: 'success',
                        message: '操作成功~'
                    })
                    this.$router.push({path:'/sa-store'});
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msgInfo,
                        offset: 100
                    });
                }
            }else{
                this.$message({
                    type: 'error',
                    message: res.msgInfo,
                    offset: 100
                });
            }
        },





    // ================================================================================
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
