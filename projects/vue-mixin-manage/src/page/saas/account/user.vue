<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            .table-ctn(v-if="!isInput")
                .page-title 账号配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="姓名查询")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.realName")

                        el-form-item(label="角色查询")
                            el-select(placeholder="请选择" v-model="searchMsg.roleId" )
                                el-option(v-for="(item, i) in roleList" :label="item.name" :value="item.id" :key="i")

                        el-form-item(label="手机查询")
                            el-input(placeholder="输入手机号码" v-model="searchMsg.mobile")

                        el-form-item(label="所属区域")
                            el-select(placeholder="请选择" v-model="searchMsg.areaId")
                                el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.id" :key="i")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加用户

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage"
                    :currentPage="currentPage" @edit="edit" @pageChange="pageChange" @freeze="freeze"
                    :tabOp="tabOp")

            //- 编辑区域
            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}账号

                .form-ctn.long
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="姓名")
                            el-input(v-model="editItem.realName" placeholder="8个汉字以内")

                        el-form-item(label="手机号码")
                            el-input(v-model="editItem.mobile" placeholder="11位手机号")

                        el-form-item(label="登录密码")
                            el-input(v-model="editItem.password" placeholder="默认为手机后6位")

                        .border-line

                        el-form-item(label="角色选择")
                            el-select(placeholder="请选择" v-model="editItem.groupIdIdx")
                                el-option(v-for="(item, i) in roleList" :label="item.name" :value="item.id" :key="i")

                        .border-line

                        el-form-item(label="所属区域")
                            el-checkbox(v-for="(item,i) in areaList" v-model="item.checked" :key="i") {{item.areaName}}

                        el-button.left(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回


</template>

<script>
import mixTable from '@/basic/mixins/mixin.js'
import mtable from '@/page/public/table.vue'

export default {
    mixins: [mixTable],
    components: {
        mtable
    },
    data() {
        return {
            roleList: [],
            areaList: [],
            keys: [
                {key: 'realName', str: '姓名'},
                {key: 'mobile', str: '手机号'},
                {key: 'areaName', str: '所属区域'},
                {key: 'roleName', str: '角色'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'freeze', str: '冻结', idKey: 'userId'}
                //- {f: 'unfreeze', str: '解除冻结'}
            ],
            selfApi: {
                list: {type: 'get', url:'/account/index'},
                add: {type: 'post', url:'/account/save'},
                edit: {type: 'post', url:'/account/update'},
                freeze: {type: 'post', url:'/account/freeze'}
            },
            searchKeys: ['realName', 'mobile', 'roleId', 'areaId'],
            editKeys: ['realName', 'mobile', 'groupId', 'groupIdIdx', 'password']
        }
    },
    async mounted () {
        this.roleList = (await tryAwait('get', '/role/roleList')).model || [];
        this.areaList = (await tryAwait('get', '/area/index')).model || [];
    },
    methods: {
        selfEdit(){
            this.areaList.map((v)=>{
                if(this.editItem.areaName.split(',').indexOf(v.areaName) > -1){
                    v.checked = true;
                }
            })
        },
        selfEditCancel(){
            //- this.areaList.map((v)=>{
            //-     v.checked = false;
            //- })
            this.areaList.forEach((v)=>{
                this.$set(v, "checked", false);
            })
            this.roleList.forEach((v)=>{
                this.$set(v, "checked", false);
            })
        },
        getChooseArea(){
            return this.areaList.filter((v)=>{ return v.checked == true; })
        },
        testRule(){
            if(!this.editItem.realName || this.editItem.realName.trim() == ''){
                alert('输入姓名~');
                return false;
            }
            var reg = /^1[3|4|5|7|8]\d{9}$/;
            if( !this.editItem.mobile || !(reg.test(this.editItem.mobile.trim())) ){
                alert('手机号有误~');
                return false;
            }
            if( !this.editItem.password || this.editItem.password.trim()=='' ){
                var m = this.editItem.mobile
                this.editItem.password = m.substr(m.length-6, 6);
            }else{
                if(this.editItem.password.trim().length<6){
                    alert('密码至少6位');
                    return;
                }
            }
            if( !this.editItem.groupIdIdx || (this.editItem.groupIdIdx+'').trim()=='' ){
                alert('请选择角色');
                return;
            }
            if(this.getChooseArea().length == 0){
                alert('未选择区域');
                return false;
            }
            if(this.curEditing.id) this.editItem.id = this.curEditing.id;
            this.editItem.realname = this.editItem.realName.trim();
            var i = this.editItem.groupIdIdx;
            //- this.editItem.groupId = this.roleList[i].id;
            this.editItem.groupId = this.editItem.groupIdIdx
            this.editItem.vendorAreaIds = this.getChooseArea().map((v)=>{ return v.id }).join(',');
            return true;
        },
        //- selfAdd(){
        //-     this.roleList.forEach((v)=>{
        //-         this.$set(v, "checked", false);
        //-     })
        //- },
        selfEdit(item){
            // 因为没有直接返回groupId  这里增加groupIdIdx，作为中间对应值处理传参和显示
            this.$set(this.editItem, 'groupIdIdx', this.roleList[this.roleList.map((v)=>{return v.name}).indexOf(this.editItem.roleName)].id)
            // 列表中返回的每行的id 不是字段id 是userId, 这里再次处理保持统一
            this.curEditing = { index: item.$index, id: item.row.userId }
            var chooseArr = (item.row.areaName + '').trim().split(' ');
            console.log('chooseArr')
            console.log(chooseArr)
            this.areaList.forEach((v)=>{
                if(chooseArr.indexOf(v.areaName) > -1){
                    this.$set(v, "checked", true);
                }else{
                    this.$set(v, "checked", false);
                }
            })
        }
    }
}
</script>
<style lang="sass" scoped>
.goBack
    top: -6px;
</style>
