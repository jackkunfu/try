<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /学员等级

        .search-ctn
            el-button(type="success" @click="search") 查询
            el-button(type="success" @click="reset") 重置
        self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit")

    //- .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="应用编号")
                    el-input(v-model="editInfo.appCode")
                el-form-item(label="应用名称")
                    el-input(v-model="editInfo.appName")
                el-form-item(label="对接URL")
                    el-input(v-model="editInfo.appUrl")
                el-form-item(label="描述")
                    el-input(v-model="editInfo.remark")
                el-form-item(label="dorder")
                    el-input(v-model="editInfo.dorder")
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'studentList',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '性别', key: 'sex' },
                { str: '生日', key: 'birth' },
                { str: '身高', key: 'height' },
                { str: '体重', key: 'weight' },
                { str: '家长姓名', key: 'pname' },
                { str: '联系电话', key: 'mobile' },
                { str: '训练营', key: 'trainName' },
                { str: '卡种', key: 'remark' },
                { str: '训练频次', key: 'remark' },
                { str: '开卡时间', key: 'remark' },
                { str: '到期时间', key: 'remark' },
                { str: '学员作业', key: 'remark' },
                { str: '体能测试', key: 'remark' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
            },
            scopeOperates: [    // 每一行种的操作
                { str: '编辑', fun: 'editScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'}
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
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
