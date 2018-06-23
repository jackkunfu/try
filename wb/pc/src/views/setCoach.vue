<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /教练设置

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
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
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
    name: 'setCoach',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '手机号', key: 'birth' },
                { str: '创建时间', key: 'height' }
            ],
            searchKeys: ['name'],
            editKeys: ['avatar', 'name', 'phone'],
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
            var editInfo = this.editInfo
            editInfo.name = editInfo.name.trim()
            if(editInfo.name = '') return this.messageTip('姓名不能为空~')
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
