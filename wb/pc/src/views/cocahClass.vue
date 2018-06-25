<template lang="pug">
div
    .table-ctn
        .page-title 教练管理
            span /教练课堂列表

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="上课日期")
                    el-date-picker(type="date" placeholder="上课日期" v-model="searchInfo.birth" style="width: 100%;" value-format="yyyy-MM-dd")

        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @seeDetail="seeDetail")

    
</template>

<script>
export default {
    name: 'coachJudge',
    mixins: [ tableManage ],
    data () {
        return {
            cocahId: this.$route.query.id,
            keys: [
                { str: '头像', key: 'avatar' },
                { str: '姓名', key: 'name' },
                { str: '联系电话', key: 'mobile' },
                { str: '训练营', key: 'trainName' },
                { str: '上课日期', key: 'date' },
                { str: '上课时间', key: 'week' },
                { str: '整体评价', key: 'trainName' }
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
            return info;
        },
        seeDetail(scope){
            this.goUrl('')
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
