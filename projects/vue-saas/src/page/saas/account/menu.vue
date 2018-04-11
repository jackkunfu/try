<template lang="pug">
    div(style="height:100%;")
        //- .nav2-ctn
            nav-center
        .table-main.no-nav
            .table-ctn(v-show="!isInput")
                .page-title 导航菜单配置
                .search-ctn
                    el-button(type="success" @click="add" ref="add") 添加导航

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp"
                @edit="edit" @del="del")

            .edit-ctn(v-show="isInput")
                .page-title {{curOperate}}导航

                .form-ctn.long
                    el-form(:model="editItem" label-width="80px" v-if="this.curOperate=='添加'")
                        el-form-item(label="导航名称")
                            el-input(v-model="editItem.name" placeholder="请输入导航名称")

                        el-form-item(label="对应url")
                            el-input(v-model="editItem.url" placeholder="请输入导航url")
                        
                        el-form-item(label="导航parentId" )
                            el-select(placeholder="请选择导航对应的一级导航" v-model="editItem.pid" @change="choRole")
                                el-option(v-for="(item,v) in navParent" :label="item.name" :value="item.id" :key="item.id")

                        el-form-item(label="导航位置" )
                            el-select(placeholder="请选择导航对应的一级导航" v-model="editItem.type"  @change="choRole")
                                el-option(v-for="(item,v) in navType" :label="item.name" :value="item.name" :key="item.id")
                        
                        el-form-item(label="导航Tag" )
                            el-select(placeholder="请选择导航对应的Tag" v-model="editItem.sysTag"  @change="choRole")
                                el-option(v-for="(item,v) in navTag" :label="item" :value="item" :key="item")
                            
                        el-form-item(label="导航icon")
                            el-input(v-model="editItem.icon" placeholder="请输入导航的icon")
                    
                    el-form(:model="editItem" label-width="80px" v-if="this.curOperate=='编辑'")
                        el-form-item(label="导航名称")
                            el-input(v-model="editItem.name" disabled)

                        el-form-item(label="recursive")
                            el-input(v-model="editItem.recursive" placeholder="10位以内汉字和数字组合")

                        el-form-item(label="isActive")
                            el-input(v-model="editItem.isActive" placeholder="10位以内汉字和数字组合")

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
            activeTab: '0',
            navParent: [],
            navType:[
                {name: 'nav-top', id: 0},
                {name: 'nav-left', id: 1},
            ],
            navTag:['saas'],
            keys: [
                {key: 'name', str: '导航名称'},
                {key: 'url', str: '导航链接'},
                {key: 'createdTime', str: '添加时间'}
            ],

            operates: [
                {f: 'edit', str: '编辑'},
                //- {f: 'freeze', str: '冻结'},
                // {f: 'del', str: '删除'}
            ],
            chooseListArr: [],  //  初始化权限名称 权限操作选择数组
            blankChooseListArr: [],
            // 搜索的各个字段配置
            // searchKeys: ['roleName', 'startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['name', 'url', 'pid', 'sysTag', 'type', 'extra','icon']
        }
    },
    async mounted(){
        this.tableList();
        var moduleList = (await tryAwait('get', '', {
            vendorId: venId,
            _api: 'pd.perm.module.list'
        }, true)).model || [];
        var module = [{
            name: '设置为一级导航',
            parentId: 0,
            id: 0
        }];
        if(moduleList.length>0){
            moduleList.forEach((v,i)=>{
                if(v.parentId==0){
                    module.push(v);
                }
            })
        }
        this.navParent = module;
    },
    methods: {
        async tableList(){
            var moduleList = (await tryAwait('get', '', {
                vendorId: venId,
                _api: 'pd.perm.module.list'
            }, true)).model || [];
            this.tableData = moduleList;
        },
        async editOk(){
            if(this.curOperate == '添加'){
                if(this.editItem.icon!=''){
                    var icon = {'icon': this.editItem.icon};
                    this.editItem.extra = JSON.stringify(icon);
                }
                console.log(this.editItem.extra);
                console.log(this.editItem);
                var opts1 = $.extend(true, {
                    _api: 'pd.perm.module.add',
                    vendor: venId,
                }, this.editItem)
                var module = await tryAwait('get', '', opts1, true)
                if(module && module.success){
                    this.$message({
                        type: 'success',
                        message: '导航添加成功~'
                    });
                    this.isInput = false;
                }else{
                    this.$message({
                        type: 'error',
                        message: module.msgInfo
                    });
                }
            }else if(this.curOperate == '编辑'){
                var opts1 = $.extend(true,{
                    _api: 'pd.perm.module.update',
                },this.editItem);
                var update = await tryAwait('get','',opts1,true);
                if(update && update.success){
                    this.$message({
                        type: 'success',
                        message: '导航编辑成功~',
                    });
                    this.isInput = false;
                    this.tableList();
                }else{
                    this.$message({
                        type: 'error',
                        message: update.msgInfo
                    });
                }
            }
            
        },
        async edit(scope){
            // 获取当前编辑的角色的数据
            console.log(scope);
            this.isInput = true;
            this.curOperate = '编辑';
            this.editItem.name = scope.row.name;
            this.editItem.id = scope.row.id;
        },
        selfAdd(){
            this.activeTab = 0;
            this.chooseListArr = $.extend(true, [], this.blankChooseListArr);
        },
        selfEdit(scope){},
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
</style>
