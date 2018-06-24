<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /管理员设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-position="right")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")

        .btn-search
            el-button(v-for="(item, i) in [{str:'超级管理员'}, {str:'普通管理员'}]" size="small" :key="i"
                @click="roleid=i+1;curBtnSearch=i" :class="curBtnSearch==i ? 'cur' : ''") {{item.str}}
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope" ref="table")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="140px" size="mini")
                .item 管理员信息
                el-form-item(label="头像")
                    .up-ctn
                        input#up1(type="file")
                        span + 上传
                        img(:src="config.imgPath+editInfo.avatar" v-if="editInfo.avatar")
                el-form-item(label="姓名")
                    el-input(v-model="editInfo.name")

                .item 账号密码
                el-form-item(label="账号")
                    el-input(v-model="editInfo.account")
                el-form-item(label="密码")
                    el-input(v-model="editInfo.password")

                .item 联系方式
                el-form-item(label="手机号")
                    el-input(v-model="editInfo.phone")

                .item 角色权限
                el-form-item(label="角色")
                    el-select(v-model="editInfo.roleid")
                        el-option(v-for="(item,i) in ['超级管理员', '管理员', '班主任', '销售顾问']" :key="i" :value="i+1" :label="item")
                el-form-item(label="学员信息删除权限")
                    el-switch(v-model="editInfo.delStu")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'setManage',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'avatar', type: 'img' },
                { str: '姓名', key: 'name' },
                { str: '账号', key: 'account' },
                { str: '权限', key: 'roleid' },
                { str: '手机号', key: 'phone' },
                { str: '创建时间', key: 'createtime' }
            ],
            searchKeys: ['name', 'roleid'],
            editKeys: ['avatar', 'account', 'name', 'phone', 'delStu', 'password'],
            api: {
                list: { url: '/mgr/list' },
                add: { url: '/mgr/add' },
                edit: { url: '/mgr/edit' },
                del: { url: '/mgr/delete' }
            },
            scopeOperates: [    // 每一行中的操作
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope', type: 'danger'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            roleid: null,
            curBtnSearch: -1
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
        selfSearchReset(){
            this.curBtnSearch = -1
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.roleid = 1
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.roleid = 1;
            return info;
        },
        testInput(){
            var data = this.trimObj(this.editInfo)
            // if(data.avatar.trim() == '') return this.messageTip('请上传图片~')  // 头像不要求
            if(data.name == '') return this.messageTip('姓名不能为空~')
            if(data.account == '') return this.messageTip('账户名不能为空~')
            if(data.account.length > 30) return this.messageTip('账户名须30字符以内~')

            if(data.password.indexOf(' ') > -1) return this.messageTip('密码不能包含空格~')
            if(data.password.length < 8 || data.password.trim().length > 16) return this.messageTip('密码须8到16位~')
            return true
        }
    },
    watch: {
        roleid(v){
            if(!v) return
            this.searchInfo.roleid = v
            this.tableList()
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
