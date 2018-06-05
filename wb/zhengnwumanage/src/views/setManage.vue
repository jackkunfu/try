<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /管理员设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo")
                el-form-item
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")

        el-button(@click="roleid=1") 超级管理员
        el-button(@click="roleid=2") 普通管理员
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="160px")
                el-form-item(label="头像")
                    .up-ctn
                        input#up1(type="file")
                        span + 上传
                        img(:src="config.imgPath+editInfo.avatar")
                el-form-item(label="账号")
                    el-input(v-model="editInfo.account")
                el-form-item(label="密码")
                    el-input(v-model="editInfo.password")
                el-form-item(label="姓名")
                    el-input(v-model="editInfo.name")
                el-form-item(label="手机号")
                    el-input(v-model="editInfo.phone")
                el-form-item(label="角色")
                    el-select(v-model="editInfo.roleid")
                        el-option(v-for="(item,i) in ['超级管理员', '管理员', '班主任']" :key="i" :value="i+1" :label="item")
                el-form-item(label="学员信息删除权限")
                    el-switch(v-model="editInfo.delStu")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
import config from '../basic/config'
export default {
    name: 'setManage',
    mixins: [ tableManage ],
    data () {
        return {
            config,
            keys: [
                { str: '头像', key: 'avatar', type: 'img' },
                { str: '姓名', key: 'name' },
                { str: '账号', key: 'account' },
                { str: '权限', key: 'roleid' },
                { str: '手机号', key: 'phone' },
                { str: '创建时间', key: 'createtime' }
            ],
            searchKeys: ['name'],
            editKeys: ['avatar', 'account', 'name', 'phone', 'delStu', 'password'],
            api: {
                list: { url: '/mgr/list' },
                add: { url: '/mgr/add' },
                edit: { url: '/mgr/edit' },
                del: { url: '/mgr/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'}
            ],
            roleid: null
        }
    },
    mounted(){
        $('#up1').change(()=>{
            this.file('up1', res => {
                if(res && res.code == 200) this.editInfo.avatar = res.data
                else this.messageTip(res.message)
            })
        })
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        testInput(){
            var data = Object.assign({}, this.editInfo)
            // if(data.avatar.trim() == '') return this.messageTip('请上传图片~')  // 头像不要求
            if(data.account.trim() == '') return this.messageTip('账户名不能为空~')
            if(data.account.trim().length > 30) return this.messageTip('账户名须30字符以内~')

            if(data.password.trim() == '') return this.messageTip('账户名不能为空~')
            if(data.password.trim().length < 8 || data.password.trim().length > 16) return this.messageTip('密码须8到16位~')
            return true
        }
    },
    watch: {
        roleid(v){
            if(!v) return
            this.tableList()
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
