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
                    el-date-picker(type="date" placeholder="上课日期" v-model="searchInfo.date" style="width: 100%;" value-format="yyyy-MM-dd")

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
                { str: '头像', key: 'img', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '联系电话', key: 'user.phone' },
                { str: '训练营', key: 'trainName' },
                { str: '上课日期', key: 'plan.createDate' },
                { str: '上课时间', key: 'time' },
                { str: '教学态度', key: 'attitude' },
                { str: '课堂纪律', key: 'discipline' },
                { str: '互动性', key: 'interaction' },
                { str: '整体评价', key: 'avgEvaluate' },
                { str: '意见反馈', key: 'opinion' }
            ],
            searchKeys: ['trainId', 'city', 'week', 'date'],
            editKeys: [],
            api: {
                list: { url: '/evaluate/list' }
            },
            scopeOperates: [    // 每一行种的操作
                // { str: '查看详情', fun: 'seeDetail'}
            ],
            operates: [    // 顶部的操作
                // { str: '新增', fun: 'add'},
                // { str: '修改', fun: 'edit'}
            ]
        }
    },
    methods: {
        changeTableData(data){
            data.forEach(element => {
                element.img = element.user.avatar
                element.trainName = element.plan.train.name
                element.time = '周'+this.week[element.plan.week] + ' ' + element.plan.begin+'~'+element.plan.end
            });
            return data
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.cuserId = this.$route.query.cuserId
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
