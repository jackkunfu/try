<template lang="pug">
    div(style="height:100%;")
        //- .nav2-ctn
            nav-center
        .table-main.no-nav
            .table-ctn(v-show="!isInput")
                .page-title 角色配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="角色名称")
                            el-input(placeholder="输入角色名称" v-model="searchMsg.roleName")
                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加角色

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp"
                @edit="edit" @del="del")

            .edit-ctn(v-show="isInput")
                .page-title {{curOperate}}角色

                .form-ctn.long
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="角色名称")
                            el-input(v-model="editItem.name" placeholder="10位以内汉字和数字组合")

                        el-form-item(label="虚拟店铺")
                            el-radio-group(v-model="editItem.isAbstractStore")
                                el-radio(label="是")
                                el-radio(label="否")

                        el-form-item(label="拥有权限")
                            el-menu(theme="" :default-active="activeTab+''" class="el-menu-demo" mode="horizontal")
                                el-menu-item(v-for="(item, i) in tabs" :index="i+''" @click="activeTab=i;getPermissionList(item.id, i)" :key="i") {{item.permissionName}}

                            ul.choose-ctn
                                li(v-for="(chooseList, i) in chooseListArr" :class="activeTab == i ? 'show' : ''" :key="i")
                                    el-table(:data="chooseList" stripe style="width:100%")
                                        el-table-column(prop="gropKey.permissionName" label="权限名称" width="200")

                                        //- el-table-column(label="权限操作" v-if="ops && ops.length>0")
                                        el-table-column(prop="childVal" label="权限操作")
                                            template(scope="scope")
                                                template( v-for="(op, j) in scope.row.childVal")
                                                    el-checkbox(v-model="op.checked") {{op.permissionName}}
                .sure.left(@click="editOk") 完成
                .goBack(@click="goBack") 返回

</template>

<script>
export default {
    name: 'role',
    mixins: [mixTable],
    data(){
        return {
            activeTab: '0',
            tabs: [], // 权限tab数组
            keys: [
                {key: 'name', str: '角色名称'},
                {key: 'isAbstractStore', str: '虚拟店铺'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                //- {f: 'freeze', str: '冻结'},
                {f: 'del', str: '删除'}
            ],
            selfApi: {
                list: {type: 'post', url: '/role/roleList'},
                add: {type: 'post', url: '/role/addRole'},
                edit: {type: 'post', url: '/role/update'},
                del: {type: 'post', url: '/role/delete'}
            },
            chooseListArr: [],  //  初始化权限名称 权限操作选择数组
            blankChooseListArr: [],
            // 搜索的各个字段配置
            searchKeys: ['roleName', 'startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['name', 'isAbstractStore']
        }
    },
    async mounted(){
        // 获取权限分类tab
        var perms = await tryAwait('get', '/permission/list');
        if(perms) this.tabs = perms.model || [];
        // 请求第一个分类的权限列表
        if(this.tabs.length > 0){
            this.chooseListArr.length = this.tabs.length
            this.getPermissionList(this.tabs[0].id, 0)
        }
    },
    methods: {
        async edit(scope){
            // 获取当前编辑的角色的数据
            var data = await tryAwait('get', '/role/edit/'+scope.row.id);
            if(data.success){
                this.activeTab = 0;
                this.curEditing = { index: scope.$index, id: scope.row.id }
                this.curOperate = '编辑';
                // 展示
                this.editItem.name = data.model.name;
                this.editItem.id = scope.row.id;
                this.editItem.isAbstractStore = data.model.isStore == 1 ? "是":"否";
                // 已选角色展示
                this.chooseListArr = JSON.parse(data.model.permissionIds).map((v)=>{return v.permissionGropList});
                this.isInput = true;
                this.isAdd = false;
            }else{
                this.$message({
                    type: 'error',
                    message: data.msgInfo
                })
            }
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
