<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /班主任设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini")
                el-form-item
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="160px" size="mini")
                .item 班主任信息
                el-form-item(label="头像")
                    .up-ctn
                        input#up1(type="file")
                        span + 上传
                        img(:src="config.imgPath+editInfo.avatar")
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

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'setClass',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '权限', key: 'sex' },
                { str: '账号', key: 'sex' },
                { str: '手机号', key: 'birth' },
                { str: '创建时间', key: 'height' }
            ],
            searchKeys: ['name'],
            editKeys: ['avatar', 'name', 'account', 'password', 'phone'],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
            },
            scopeOperates: [    // 每一行种的操作
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ]
        }
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
            if(data.name.trim() == '') return this.messageTip('姓名不能为空~')
            if(data.account.trim() == '') return this.messageTip('账户名不能为空~')
            if(data.account.trim().length > 30) return this.messageTip('账户名须30字符以内~')

            if(data.password.indexOf(' ') > -1) return this.messageTip('密码不能包含空格~')
            if(data.password.length < 8 || data.password.trim().length > 16) return this.messageTip('密码须8到16位~')
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
