<template lang="pug">
div
    .table-ctn
        .page-title 报名管理
            span /体验课报名

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")
                
                el-form-item(label="时间范围")
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")
                    el-col(:span="2" style="text-align: center") -
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="开始时间")
                    el-time-select(v-model="searchInfo.begin" :picker-options="{ start: '00:00', step: '00:30', end: '23:00'}" placeholder="选择开始时间")

                el-form-item(label="结束时间")
                    el-time-select(v-model="searchInfo.end" :picker-options="{ start: '00:00', step: '00:30', end: '23:00'}" placeholder="选择结束时间")

                el-form-item(label="班主任")
                    el-select(v-model="searchInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @daochu="daochu('/experience/excel')" @delScope="delScope")
    
</template>

<script>
export default {
    name: 'enrollOnce',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '姓名', key: 'name' },
                { str: '联系电话', key: 'mobile' },
                { str: '地区', key: 'ci.name' },
                { str: '训练营', key: 'train.name' },
                { str: '上课时间', key: 'time' },
                // { str: '班主任', key: '' },
                { str: '报名时间', key: 'createDate' }
            ],
            searchKeys: ['name', 'startTime', 'endTime', 'city', 'endTime', 'endTime', 'endTime', 'endTime', 'begin', 'end'],
            api: {
                list: { url: '/experience/list' },
                add: { url: '/experience/add' },
                edit: { url: '/experience/edit' },
                del: { url: '/experience/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '导出excel', fun: 'daochu'}
            ],
            week: ['一', '二', '三', '四', '五', '六', '日']
        }
    },
    async mounted(){
    },
    methods: {
        changeTableData(data){
            return data.map(v => {
                v.time = '周'+this.week[v.week] + ' ' + v.begin + ' ~ ' + v.end
                return v
            })
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        }
    }

}
</script>

<style lang="sass" scoped>

</style>
