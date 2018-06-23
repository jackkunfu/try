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
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.city" placeholder="上课时间")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="班主任")
                    el-select(v-model="searchInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @dao="dao" @delScope="delScope")
    
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
                { str: '地区', key: 'city' },
                { str: '训练营', key: 'sex' },
                { str: '上课时间', key: 'time' },
                { str: '班主任', key: '' }
            ],
            searchKeys: ['name', 'startTime', 'endTime', 'city', 'endTime', 'endTime', 'endTime', 'endTime'],
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
                { str: '导出excel', fun: 'dao'}
            ],
            citys: [],
            week: ['一', '二', '三', '四', '五', '六', '日']
        }
    },
    async mounted(){
        this.citys = await this.getAllCity()
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
        },
        dao(){}
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
