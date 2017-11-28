<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 店员管理报表
                .search-ctn
                    el-button(type="info" @click="downForm('/report-clerker/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'

// table列表组件
import mtable from '@/page/public/table.vue'

export default {
    name: 'form-staff',
    mixins: [mixTable],
    components: {
        mtable
    },
    data(){
        return {
            keys: [
                {key: 'vendorName', str: '供应商名称'},
                {key: 'createdTime', str: '添加时间'},
                {key: 'province', str: '所在省'},
                {key: 'city', str: '所在市'},
                {key: 'zone', str: '所在区'},
                {key: 'vendorAreaName', str: '所在片区'},
                {key: 'storeName', str: '门店名称'},
                {key: 'clerkerName', str: '店员姓名'},
                {key: 'clerkerNo', str: '店员工号'},
                {key: 'clerkerMobile', str: '店员手机'},
                {key: 'clerkerIdCard', str: '店员身份证'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/clerkAction',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            }
        }
    },
    mounted(){},
    methods: {}
}
</script>

<style lang="sass" scoped>

</style>
