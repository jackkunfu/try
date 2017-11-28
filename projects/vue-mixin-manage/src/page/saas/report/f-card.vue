<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 开卡报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="options.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="options.endTime" style="width: 100%;")

                        el-form-item( class="search-time" label="POS数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="options.posStartTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="options.posEndTime" style="width: 100%;")

                    //- el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" ref="export" @click="downForm('/Report/exportCustomerCost')") 导出报表

                mtable(:keys="keys" :tableData="tableData" :tabOp="tabOp" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange")

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'
function time(t){
    return t ? (new Date(t).getFullYear() + '-' + ((new Date(t).getMonth())+1) + '-' + (new Date(t).getDate())) : '';
}
// table列表组件
import mtable from '@/page/public/table.vue'
export default {
    name: 'role',
    mixins: [mixTable],
    components: {
        mtable
    },
    data(){
        return {
            keys: [
                {key: '', str: '供应商'},
                {key: '', str: '区域'},
                {key: '', str: '门店'},
                {key: '', str: '开卡店员'},
                {key: '', str: '店员业绩'},
                
            ],
            options: {
                startTime: '',
                endTime: '',
                posStartTime: '',
                posEndTime: ''
            },
            selfApi: {
                // list: {}
            },
            searchKeys: []
        }
    },
    mounted(){},
    methods: {
        
        async downForm(url) {
            var options = this.options;
            options.startTime = time(options.startTime)
            options.endTime = time(options.endTime)
            options.posStartTime = time(options.posStartTime)
            options.posEndTime = time(options.posEndTime)
            var getFile = await tryAwait('get', url, options);
            if (getFile.success) {
                console.log(getFile);
            }
        },
    }
}
</script>

<style lang="sass" scoped>

</style>
