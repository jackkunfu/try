<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-show="!isInput")
                .page-title 职员配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="职员姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.realName")

                        el-form-item(label="职员手机" )
                            el-input(placeholder="输入店员手机号" v-model="searchMsg.mobile_ex")

                        el-form-item(label="职员编号")
                            el-input(placeholder="输入员工编号" v-model="searchMsg.clerkNum")

                        el-form-item(label="门店编号")
                            el-input(placeholder="请输入门店编号" v-model="searchMsg.storeId")
                        
                        el-form-item(label="职员角色" )
                            el-select(placeholder="请选择员工角色" v-model="searchMsg.role")
                                el-option(v-for="(item,v) in clerkRole" :label="item.roleName" :value="item.id" :key="item.id")

                    el-button(type="primary" icon="search" @click="currentPage=1;tableList()" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add" v-if="!notOp") 添加职员
                    //- el-button(type="success" @click="isInput=true;isLot=true" ref="import") 批量添加店员

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" 
                    :totalPage="totalPage" :currentPage="currentPage" @edit="edit" @pageChange="pageChange"
                     @shelf="shelf" @role="role" :tabOp="tabOp" :canOp="notOp")

            div.edit-ctn(v-show="isInput && !isLot")
                .page-title {{curOperate}}职员
                .form-ctn
                    el-form(label-width="80px" v-if="isRole")
                        el-form-item(label="预设手机")
                            el-input(class="search-mobile" type="number" placeholder="输入预设手机号进行查询" v-model="searchMobile")
                            el-button.right(type="primary" @click="searchMobile1" style="width: 100px;position: absolute;left:260px") 搜索

                    el-form(v-model="editItem" label-width="80px")
                        div(v-if="curOperate=='添加' || curOperate=='新增' && newClerk==1")
                            el-form-item(label="职员姓名" )
                                el-input(type="text" placeholder="最多8个汉字" v-model="editItem.name")
                            el-form-item(label="身份证号" )
                                el-input(type="text" placeholder="18位居民身份证号码" v-model="editItem.idCard")
                            el-form-item(label="手机号码" )
                                el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile_ex")
                            el-form-item(label="登录密码" )
                                el-input(type="text" placeholder="默认为手机后六位" v-model="editItem.pwd")
                            el-form-item(label="职员编号" )
                                el-input(placeholder="请输入员工编号" type="text" v-model="editItem.employeeNum")
                        div(v-if="curOperate=='分配' || oldClerk==1")
                            el-form-item(label="职员姓名" )
                                el-input(type="text" placeholder="最多8个汉字" v-model="editItem.name" disabled)
                            el-form-item(label="手机号码" )
                                el-input(type="text" placeholder="11位中国大陆手机号码" v-model="editItem.mobile_ex" disabled)
                            
                        .border-line
                        
                        el-form-item(label="职员角色" v-if="!isRole")
                            el-select(placeholder="请选择员工角色" v-model="editItem.roleId" @change="choRole")
                                el-option(v-for="(item,v) in clerkRole" :label="item.roleName" :value="item.id" :key="item.id")

                        el-form-item(label="职员角色" v-if="isRole")
                            el-select(placeholder="请选择员工角色" v-model="editItem.roleId" @change="choRole" disabled)
                                el-option(v-for="(item,v) in clerkRole" :label="item.roleName" :value="item.id" :key="item.id" disabled)
            
                        //- el-form-item(label="片区多选" ref="multiArea" style="display:none;")
                            el-select(placeholder="请选择所属片区" v-model="areaMultiArr" multiple="true")
                                el-option(v-for="item in areaList" :label="item.areaName" :value="item.id" :key="item.id" class="s2") 

                        //- el-form-item(label="所属区域" ref="region" style="display:none")
                            el-select(placeholder="请选择所属区域" v-model="editItem.areaId")
                                el-option(v-for="item in regionList" :label="item.areaName" :value="item.id" :key="item.id" class="s2")


                        el-form-item(label="所属片区" ref="area" style="display:none")
                            el-select(placeholder="请选择所属片区" v-model="editItem.areaId" @change="shopListReq")
                                el-option(v-for="item in areaList" :label="item.areaName" :value="item.id" :key="item.id" class="s2")

                        el-form-item(label="所属门店" ref="store" style="display:none")
                            el-select(placeholder="请选择所属门店" v-model="editItem.storeId")
                                el-option(v-for="item in shopList" :label="item.store.storeName" :value="item.store.id" :key="item.store.id" class="s3")
                        .border-line
                        el-button.left(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>
import upfile from '@/basic/mixins/upfile.js'

// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'

var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
var roleLevel = localStorage.roleLevel;

export default {
    name: 'role',
    mixins: [mixTable, upfile, scrollMore],
    data(){
        return {
            //- areaShop: [],
            notOp: localStorage.roleLevel == 'MIME' || localStorage.roleLevel == 'NONE',  // 没权限是true
            areaMultiArr: [],
            isLot: false,
            curChooseAreaId: '',
            keys: [
                {key: 'user.realname', str: '姓名'},
                {key: 'role.roleName', str: '角色名称'},
                {key: 'user.mobile', str: '手机号'},
                {key: 'clerk.clerkNum', str: '员工编号'},
                // {key: 'clerk.vendorId', str: '供应商'},
                {key: 'area.areaName', str: '所属片区'},
                {key: 'store.storeName', str: '所属门店'},
            ],
            clerkRole: [{
                id: 0,
                roleName: '职员'
            }],
            isClerk: true, // 当角色中选择了雇员时，新增雇员页面不显示所属片区、所属门店
            clerkStatus: [
                {name:'激活',value:'1'},
                {name:'冻结',value:'2'},
            ],
            operates: [
                {f: 'freeze', str: '上下架删除'},
                {f: 'role', str: '配角色'},
            ],
            searchKeys: ['storeId', 'clerkNum', 'realName', 'mobile_ex', 'role'],
            // editKeys: ['vendorAreaId', 'storeId', 'realname', 'mobile', 'clerkNum', 'idCard','clerkRole','clerkStatus'],
            editKeys: ['vendorId', 'userId', 'areaId', 'storeId', 'roleId','employeeNum', 'mobile_ex','pwd'],
            regionList: [], //区域
            areaList: [], // 片区
            shopList: [],
            zonePage: 1,
            zoneTotal: 0,
            shopPage: 1,
            shopTotal: 0,
            storeId: this.$route.query.storeId ? this.$route.query.storeId : '',
            isRole: false, // 当从角色配置页跳过来后变为true
            searchMobile: '',
            newClerk: 1,
            oldClerk: 0,
            accessLevel: '',
        }
    },
    mounted(){
        var query = this.$route.query
        console.log(query)
        if(query.isFromShopowner == 1){   // 如果是从配置店长跳过来的 展示编辑 填充部分数据
            this.isInput = true;
            this.editItem.mobile_ex = query.mobile;
            this.editItem.roleId = 5;

            var user = JSON.parse(query.user);
            var data = JSON.parse(query.data);
            console.log(data);
            this.editItem.storeId = data.storeId;
            console.log(this.editItem.storeId);

        }
        if(query.isFromRole == 1){
            this.isRole = true;
            this.isInput = true;
            this.accessLevel = query.accessLevel;
            this.editItem.roleId = query.roleId;
            this.choRole();
            
        }
        this.areaListReq();
        this.regionList1();
        this.roleList();
    },
    methods: {
        selfInitKeys(){
            if(this.$route.query.storeId){
                this.searchMsg.storeId = this.$route.query.storeId || '';
            }
        },
        
        choRole(){
            if(this.editItem.roleId === '') return;
            var roleList = this.clerkRole;
            var role = this.editItem.roleId;
            if(!this.isRole){
                this.accessLevel = roleList.filter( v => v.id == role )[0].accessLevel || 'ALL'
            }
            if(this.accessLevel == 'ALL'){
                this.$refs.store.$el.style.display = 'none'
                this.$refs.area.$el.style.display = 'none'

            }else if(this.accessLevel == 'AREA'){
                this.$refs.area.$el.style.display = 'block'
                this.$refs.store.$el.style.display = 'none'

            }else if(this.accessLevel == 'STORE' || this.accessLevel == 'MINE'){
                this.$refs.store.$el.style.display = 'block'
                this.$refs.area.$el.style.display = 'block'
            }
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
            this.newClerk = 1;
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
                console.log('role');
                console.log(role);
                if(!role.model || !role.model.user || !role.model.user.uid){
                    this.$confirm('查无此人或者职员名称不完整，是否去添加或更新职员?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async() => {
                        this.newClerk = 1;
                        this.oldClerk = 0;
                        this.editItem.mobile_ex = this.searchMobile
                    })
                    return;
                }else{
                    this.oldClerk = 1;
                    this.newClerk = 0;
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
            }else{
                this.$message({
                    type: 'error',
                    message: role.msgInfo,
                    offset: 100
                })
            }
            
        },
        // 请求雇员列表、搜素雇员
        async tableList(){
            var opts1 = $.extend(true, {
                _api: 'pd.employee.list',
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, this.searchMsg)
            var user = await tryAwait('get', '', opts1, true)
            var userData = user.model || [];
            this.tableData = this.changeTableData(userData);
        },
        async roleList(){
            var opts1 = {
                _api: 'pd.perm.role.list',
                _v: '2.0',
                vendorId: venId,
            };
            var role = await tryAwait('get', '', opts1, true)
            var roleData = role.model || [];
            this.clerkRole = this.clerkRole.concat(roleData);
            console.log(this.clerkRole);
        },

        // 请求片区
        async areaListReq(){
            var opts1 = {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                type: 2,  // 1:大区，2:片区，-1:虚拟大区，-2:虚拟片区
                status: 1, // 0: 下架   1：上架
                limit: 50,
                offset: (this.currentPage - 1)*10
            }
            var area = await tryAwait('get', '', opts1, true)
            if(area.success){
                this.areaList = area.model;
            }else{
            }
        },
        async regionList1(){
            var user = await tryAwait('get', '', {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                keyword: this.searchMsg.areaName,
                status: 1,
                type: 1,
                limit: 100,
                offset: (this.currentPage - 1)*10
            }, true)
            var userData = user.model || [];
            this.regionList = userData.map( v=>{
                v.areaStr = '';
                if(v.childrens && v.childrens.length > 0){
                    v.childrens.forEach( el => {
                        v.areaStr += el.areaName + ';';
                    });
                }
                return v
            });
        },

        // 请求门店
        async shopListReq(){
            var areaId = this.editItem.areaId;
            var opts1 = {
                _api: 'pd.store.list',
                _v: '3.0',
                areaId: areaId,
                limit: 50,
                offset: (this.currentPage - 1)*10
            }
            var shop = await tryAwait('get', '', opts1, true)
            if(shop.success){
                this.shopList = shop.model;
            }else{
            }
        },

        // 上下架、删除
        async shelf(scope,status){
            console.log(scope);
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
                    this.tableList()
                }
            }
            
        },
        async role(scope, type){
            console.log(scope);
            if( type == 1 ){
                this.$confirm('此操作将解除该用户的角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    var res = await tryAwait('get','',{
                         _api: 'pd.employee.undesignate',
                        vendorId: venId,
                        userId: scope.row.clerk.userId
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
                this.isInput = true;
                this.curOperate = '分配';
                this.editItem.mobile_ex = scope.row.user.mobile;
                this.editItem.name = scope.row.user.realname;
                this.editItem.vendorId = venId;
                this.editItem.userId = scope.row.clerk.userId;

            }
        },

        changeItem(v){
            v.status = v.clerk.status;
            return v;
        },
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map( v => this.changeItem(v) );
        },

        async editOk(){
            if(this.curOperate=='添加' || this.curOperate=='新增'){
                if((this.editItem.mobile_ex+'').trim()=='' || !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.editItem.mobile_ex))){
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的手机号码~'
                    })
                    return 
                }
                var opts1 = {
                    _api: 'pd.user.create',
                    _v: '2.0',
                    name: this.editItem.name,
                    mobile_ex: this.editItem.mobile_ex,
                    pwd: this.editItem.pwd,
                    idCard: this.editItem.idCard
                }
                var user = await tryAwait('get', '', opts1, true); 
                if(user && user.success){
                    if(user.model){
                        var venId = JSON.parse(localStorage.saasUser).vendor_id;
                        var uid = user.model.uid;
                        this.editItem.vendorId = venId;
                        this.editItem.userId = uid;
                        // if(this.$refs.multiArea.$el.style.display == 'block'){
                        //     this.editItem.areaId = this.areaMultiArr.join(',');

                        //     if(this.editItem.areaId && this.editItem.areaId.trim() == ''){
                        //         this.$message({
                        //             message: '未选片区',
                        //             type: 'error'
                        //         })
                        //     }
                        // }
                        
                        // if(this.editItem.storeId && this.editItem.storeId.trim() == ''){
                        //     this.$message({
                        //         message: '未选门店',
                        //         type: 'error'
                        //     })
                        // }
                        // alert(uid);
                        var opts2 = $.extend(true, {
                            // vendorId: venId,
                            _api: 'pd.employee.designate',
                        }, this.editItem)
                        var clerk = await tryAwait('get', '', opts2, true);
                        if(clerk && clerk.success){
                            if(clerk.model){
                                var query = this.$route.query
                                if(query.isFromShopowner == 1){ 
                                    this.$router.push({path: '/sa-store',})
                                }
                                if(query.isFromRole == 1){
                                    this.$router.push({
                                        path: '/sa-role',
                                        query: {
                                            isFromClerk: 1,
                                            roleId: JSON.parse(query.roleId),
                                            roleName: query.roleName,

                                        }
                                    })
                                }
                                this.$message({
                                    type: 'success',
                                    message: '职员分配成功~',
                                    offset: 100
                                });
                                this.isInput = false;
                                this.tableList();
                            }
                        }else{
                            this.$message({
                                type: 'error',
                                message: clerk.msgInfo,
                                offset: 100
                            });
                        }
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: user.msgInfo,
                        offset: 100
                    });
                }
            }else if(this.curOperate=='分配'){
                var opts2 = $.extend(true, {
                    _api: 'pd.employee.designate',
                }, this.editItem)
                var clerk = await tryAwait('get', '', opts2, true);
                if(clerk && clerk.success){
                    if(clerk.model){
                        this.$message({
                            type: 'success',
                            message: '职员分配成功~',
                            offset: 100
                        });
                        this.isInput = false;
                        this.tableList();
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: clerk.msgInfo,
                        offset: 100
                    });
                }
            }
            
        },


// ===========================================================================================================

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
