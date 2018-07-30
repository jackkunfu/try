<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /班主任设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        //- .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x
                i.el-icon-close(@click="closeEditBox")
            .scroll-box
                el-form(:model="editInfo" label-width="160px" size="mini")
                    .item 班主任信息
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
                { str: '头像', key: 'avatar', type: 'img' },
                { str: '姓名', key: 'name' },
                { str: '权限', key: 'roleName' },
                { str: '账号', key: 'account' },
                { str: '手机号', key: 'phone' },
                { str: '创建时间', key: 'createtime' }
            ],
            searchKeys: ['name'],
            editKeys: ['avatar', 'name', 'account', 'password', 'phone'],
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
                { str: '新增', fun: 'add'}
            ]
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
        changeTableData(data){
            var arr = ['管理员', '教练', '班主任', '销售顾问']
            return data.map(v=>{
                v.roleName = v.roleid ? arr[v.roleid-1] : ''
                return v
            })
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.roleid = 3
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.roleid = 3
            return info;
        },
        handleDelRow(row){
            return { userId: row.id }
        },
        testInput(){
            var data = Object.assign({}, this.editInfo)
            // if(data.avatar.trim() == '') return this.messageTip('请上传图片~')  // 头像不要求
            if(data.name.trim() == '') return this.messageTip('姓名不能为空~')
            if(data.account.trim() == '') return this.messageTip('账户名不能为空~')
            if(data.account.trim().length > 30) return this.messageTip('账户名须30字符以内~')

            if(data.password.indexOf(' ') > -1) return this.messageTip('密码不能包含空格~')
            if(data.password.length < 6 || data.password.trim().length > 16) return this.messageTip('密码须6到16位~')

            if(data.phone != '' && !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(data.phone)) ) return this.messageTip('手机号格式有误~');
            
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.up-ctn
    line-height: 150px

</style>
