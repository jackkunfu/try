<template lang="pug">
div
    .table-ctn
        .page-title 应用管理
        //- .search-ctn
            el-button(type="success" @click="search") 查询
            el-button(type="success" @click="reset") 重置
        self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit")

    .edit-ctn.fix-cover(v-show="showEditCtn")
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
    name: 'application',
    mixins: [tableManage],
    data () {
        return {
            keys: [
                { str: '应用编号', key: 'appCode' },
                { str: '应用名称', key: 'appName' },
                { str: '对接URL', key: 'appUrl' },
                { str: '描述', key: 'remark' },
            ],
            searchKeys: [],
            editKeys: ['appCode', 'appName', 'appUrl', 'remark', 'dorder'],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
            },
            operates: [
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'}
            ]
        }
    },
    methods: {
        changeSearchValue(info){
            info.operatorUserId = localStorage.zlOpUid || 43;
            return info;
        },
        testInput(){
            return true
        },
        changeEditValue(info){
            info.operatorUserId = localStorage.zlOpUid || 43;
            return info;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
