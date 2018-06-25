<template lang="pug">
div
    .table-ctn
        .page-title 教练管理
            span /教练课堂学员列表

        .btn-search
            el-button(v-for="(item, i) in [{str:'评价由高到底'}, {str:'评价由低到高'}]" size="small" :key="i"
                @click="curBtnSearch=i;tableList" :class="curBtnSearch==i ? 'cur' : ''") {{item.str}}

        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage")

    
</template>

<script>
export default {
    name: 'coachJudge',
    mixins: [ tableManage ],
    data () {
        return {
            curBtnSearch: 0,
            cocahId: this.$route.query.id,
            keys: [
                { str: '头像', key: 'avatar' },
                { str: '姓名', key: 'name' },
                { str: '性别', key: 'sex' },
                { str: '生日', key: 'birth' },
                { str: '家长姓名', key: 'pname' },
                { str: '联系电话', key: 'phone' },
                { str: '训练营', key: 'trainName' },
                { str: '教练', key: 'cocahName' },
                { str: '教学态度', key: 'remark' },
                { str: '课堂纪律', key: 'remark' },
                { str: '互动性', key: 'remark' },
                { str: '整体评价', key: 'remark' },
                { str: '意见反馈', key: 'remark' }
            ],
            searchKeys: ['name', 'city'],
            editKeys: [],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
            },
            scopeOperates: [    // 每一行种的操作
                { str: '查看详情', fun: 'seeDetail'}
            ],
            operates: [    // 顶部的操作
                // { str: '新增', fun: 'add'},
                // { str: '修改', fun: 'edit'}
            ]
        }
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            info.cocahId = this.cocahId
            info.sync = this.curBtnSearch
            return info;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
