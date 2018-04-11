<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            .table-ctn(v-show="!isInput&&!isRole")
                .page-title 
                    | 角色配置
                    //- router-link(:to="{path:'/sa-menu'}")
                        el-button(style="margin-left:20px;") 去配置导航

                .search-ctn
                    el-button(type="success" @click="add" ref="add") 添加角色

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp"
                    @edit="edit" @operates="operates" @goClerk="goClerk")

            .edit-ctn(v-show="isInput")
                .page-title {{curOperate}}角色

                .form-ctn.long
                    el-form(:model="editItem" label-width="80px")
                        div(v-if="curOperate == '添加'")
                            el-form-item(label="角色名称")
                                el-input(type="text" placeholder="角色名称" v-model="editItem.name")
                            el-form-item(label="访问级别")
                                el-select(placeholder="访问级别" v-model="editItem.accessLevel")
                                    el-option(v-for="(item,v) in ['ALL', 'AREA', 'STORE', 'MINE', 'NONE']" :label="item" :value="item" :key="v")
                        el-form-item(v-else="" label="导航权限" class="transfer-item")
                            el-tree(:data="transferData" show-checkbox="true" node-key="id"
                                ref="tree" :props="treeProps"  :default-expanded-keys="parentArr")

                .sure.left(@click="editOk") 完成
                .goBack(@click="goBack") 返回

            .edit-ctn(v-if="isRole")
                .page-title
                    | {{roleName}}
                    a.right(style="font-size: 14px;" @click="addClerk") 新增
                    
                mtable(:keys="roleKey" :tableData="tableData" :ops="operatesRole" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange1" :tabOp="tabOp"
                    @delRole="delRole")

                .sure.left(@click="editOk") 完成
                .goBack(@click="goBack") 返回

</template>

<script>
var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';
export default {
    name: 'role',
    mixins: [mixTable],
    data(){
        return {
            accessLevel: '',
            roleName:'',
            isRole: false,
            activeTab: '0',
            tabs: [], // 权限tab数组
            keys: [
                {key: 'roleName', str: '角色名称'},
                // {key: 'isAbstractStore', str: '虚拟店铺'},
                // {key: 'createdTime', str: '添加时间'}
            ], 
            roleKey: [
                {key: 'user.realname', str: '职员姓名'},
                {key: 'role.roleName', str: '职员角色'},
                {key: 'user.mobile', str: '职员手机'},
            ],
            operates: [
                {f: 'edit', str: '权限编辑'},
                {f: 'self', str: '成员编辑', fun: 'goClerk', type:'warning'},
            ],
            operatesRole: [
                {f: 'self', str: '移除',fun: 'delRole', type: 'danger'}
            ],
            chooseListArr: [],  //  初始化权限名称 权限操作选择数组
            blankChooseListArr: [],
            // 搜索的各个字段配置
            searchKeys: ['roleName', 'startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['name', 'accessLevel'],
            transferData: [],      // 所有导航
            treeProps: {
                label: 'name',
                children: 'childs'
            },
            parentArr: [],
            chooseTransfer: [],   // 已选导航
            roleId: '',
            currentPage1: 1,
        }
    },
    async mounted(){
        var query = this.$route.query;
        if(query.isFromClerk == 1){
            this.roleName = query.roleName;
            this.roleId = query.roleId;
            this.isRole = true;
            this.roleList();
        }
        var moduleList = (await tryAwait('get', '', {
            vendorId: venId,
            _api: 'pd.perm.module.list'
        }, true)).model || [];
        if(moduleList.length > 0){
            var arr = [];
            var parentArr = [];
            moduleList.forEach( (v,i) => {
                if(v.parentId == 0){
                    arr.push(v);
                }
            });
            this.parentArr = parentArr;
            arr.forEach( (el, i) => {
                moduleList.forEach( (v,index) => {
                    if(v.parentId != 0 && v.parentId  == el.id){
                        if(!arr[i].childs) arr[i].childs = []
                        arr[i].childs.push(v);
                    }
                })
            });
            arr.forEach((v,i)=>{
                if(v.childs){
                    parentArr.push(v.id);
                }
            })
            console.log(parentArr);
            this.transferData = arr;
            console.log(this.transferData);
        }
    },
    methods: {
        
        goClerk(scope){
            console.log(scope);
            this.roleName = scope.row.roleName;
            this.accessLevel = scope.row.accessLevel;
            this.isRole = true;
            this.roleId = scope.row.id;
            this.roleList();
            
        },
        addClerk(){
            this.$router.push({
                path: '/sa-clerk',
                query: {
                    isFromRole: 1,
                    roleId: this.roleId,
                    roleName: this.roleName,
                    accessLevel: this.accessLevel,
                }
            })
        },
        goBack(){
            this.isInput = false;
            this.isRole = false;
            this.$refs.tree.setCheckedKeys([]);
            this.tableList();
        },
        async delRole(scope){
            console.log(scope);
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
                    this.roleList();

                } else {
                    this.$message({
                        type: 'error',
                        message: res.msgInfo
                    });
                }
            })
        },
        
        async roleList(){
            var user = await tryAwait('get', '', {
                _api: 'pd.employee.list',
                role: this.roleId,
                limit: 10,
                offset: (this.currentPage1 - 1)*10
            }, true)
            var userData = user.model || [];
            this.tableData = userData;
            console.log('this.tableData');
            console.log(this.tableData);
        },
        pageChange1(v) { // 翻页改变
            this.currentPage1 = v;
            this.roleList(v);
        },
        async tableList(){
            var roleList = (await tryAwait('get', '', {
                vendorId: venId,
                _api: 'pd.perm.role.list',
                _v: '2.0',
            }, true)).model || [];
            this.tableData = roleList;
        },
        async addRole(){
            if(!this.editItem.name || (this.editItem.name+'').trim() == ''){
                this.$message({
                    type: 'error',
                    message: '请输入角色名称~'
                })
                return 
            }
            if(!this.editItem.accessLevel || (this.editItem.accessLevel+'').trim() == ''){
                this.$message({
                    type: 'error',
                    message: '请选择权限等级~'
                })
                return 
            }
            // var checkArr = this.getCheckedIds();
            // if(checkArr.length == 0){
            //     this.$message({
            //         type: 'error',
            //         message: '未选则权限相关导航~'
            //     })
            //     return 
            // }
            var data = {
                name: (this.editItem.name+'').trim(),
                accessLevel: this.editItem.accessLevel,
                _api: 'pd.perm.role.add',
                vendorId: venId
            }
            var req = await tryAwait('get', '', data, true);
            if(req && req.success){
                this.$message({
                    type: 'success',
                    message: req.msgInfo || '操作成功~'
                })
                this.isInput = false;
                this.tableList();
            }
        },
        getCheckedIds(){
            var checkNodes = this.$refs.tree.getCheckedNodes();
            // console.log(checkNodes);
            var checkArr = [];
            checkNodes.forEach((v,i)=>{
                checkArr.push(v.id);
                if(checkArr.indexOf(v.parentId) < 0 && v.parentId != 0){
                    checkArr.push(v.parentId)
                }
            })
            return checkArr
        },
        async editOk(){
            if(this.curOperate == '添加') return this.addRole();

            var checkArr = this.getCheckedIds();
            // console.log(checkArr);
            if(checkNodes.length == 0){
                this.$message({
                    type: 'error',
                    message: '未选则权限相关导航~'
                })
                return 
            }

            var data = {
                roleId: this.curEditing.id,
                _api: 'pd.perm.role.update',
                _v: '2.0',
                moduleIds: checkArr.join(',')
            }
            var req = await tryAwait('get', '', data, true);
            if(req && req.success){
                this.$message({
                    type: 'success',
                    message: req.msgInfo || '操作成功~'
                })
                this.isInput = false;
                this.tableList();
            }
        },
        // async edit(scope){
        //     // 获取当前编辑的角色的数据
        //     // var data = await tryAwait('get', '/role/edit/'+scope.row.id);
        //     // if(data.success){
        //     //     this.activeTab = 0;
        //     //     this.curEditing = { index: scope.$index, id: scope.row.id }
        //     //     this.curOperate = '编辑';
        //     //     // 展示
        //     //     this.editItem.name = data.model.name;
        //     //     this.editItem.id = scope.row.id;
        //     //     this.editItem.isAbstractStore = data.model.isStore == 1 ? "是":"否";
        //     //     // 已选角色展示
        //     //     this.chooseListArr = JSON.parse(data.model.permissionIds).map((v)=>{return v.permissionGropList});
        //     //     this.isInput = true;
        //     //     this.isAdd = false;
        //     // }else{
        //     //     this.$message({
        //     //         type: 'error',
        //     //         message: data.msgInfo
        //     //     })
        //     // }
        // },
        selfAdd(){
            this.activeTab = 0;
            this.chooseListArr = $.extend(true, [], this.blankChooseListArr);
        },
        async selfEdit(scope){
            var roleFentch = (await tryAwait('get', '', {
                roleId: scope.row.id,
                _api: 'pd.perm.role.fetch',
                _v: '2.0',
            }, true)).model || []
            var data = roleFentch.map( v => v.id );
            this.$refs.tree.setCheckedKeys(data)
        },
        selfEditCancel(){
            this.checkedArr = []
        },
        testRule(){
            if(!this.editItem.name || this.editItem.name.trim() == '' || this.editItem.name.trim().length > 10){
                this.$message({
                    type: 'error',
                    message: '10位以内，不能为空~'
                })
                return false
            }
            if(!this.editItem.isAbstractStore || this.editItem.isAbstractStore == ''){
                this.$message({
                    type: 'error',
                    message: '选择虚拟店铺~'
                })
                return false
            }
            if(!(this.getPermissionChoose().hasChoose)){
                this.$message({
                    type: 'error',
                    message: '权限不能为空'
                })
                return false;
            }
            this.editItem.isStore = this.editItem.isAbstractStore == '是' ? 1:0;
            this.editItem.permissionGroupS = this.getPermissionChoose().choose.map((v)=>{return v.id}).join(',')
            return true
        },
        async getPermissionList(id, i){      //  获取权限列表展示
            if(this.chooseListArr[i]) return    // 如果已经请求过，不在重复请求
            var tableData = (await this.ajax('get', '/permission/grop/' + id)).model || [];
            if(!this.chooseListArr[i]){
                this.chooseListArr[i] = [];
            }
            this.chooseListArr.splice(i, 1, tableData);

            if(!this.blankChooseListArr[i]){
                this.blankChooseListArr[i] = [];
            }
            this.blankChooseListArr.splice(i, 1, tableData);


            //- this.chooseListArr.splice(i, 1, (await this.ajax('get', '/permission/module/'+id+'.htm')).model || []);
            //- this.chooseListArr[i] = this.chooseListArr[i] ? this.chooseListArr[i] : {};
            //- this.chooseListArr[i].tableData = [];
            //- var arr = []
            //- tableData.forEach((v)=>{
            //-     v.permissionDoList.forEach((item)=>{
            //-         arr.push({
            //-             name: item.permissionModel.name,
            //-             list: item.permissionList,
            //-             navName: v.name
            //-         })
            //-     })
            //- })
            //- this.chooseListArr.splice(i, 1, arr)
        },
        getPermissionChoose(){     //  获取选择的权限数据
            var choose = []
            this.chooseListArr.forEach((v)=>{
                v.forEach((item)=>{
                    item.childVal.forEach((p)=>{
                        if(p.checked){
                            // choose.push(v);
                            choose.push(p);
                        }
                    })
                })
            })
            return {
                hasChoose: choose.length > 0 ? true : false,
                choose: choose
            }
        }
    },
    watch: {
        checkedArr(v){
            console.log(v)
            this.checkedArr = v;
        }
    }
}
</script>

<style lang="sass" scoped>
.el-menu-item.is-active
    border-bottom: 5px solid #20a0ff;
ul.choose-ctn
    margin-top: 20px;
    li
        display: none;
        &.show
            display: block;
.goBack
    top: 10px;
.page-title
    a
        font-size: 14px;
        font-weight: 500;
        margin-right: 100px;
</style>
