<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 门店管理报表
                .search-ctn
                    el-button(type="info" @click="downForm('/report-store/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'

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
                {key: 'vendorName', str: '供应商名称'},
                //- {key: 'areaName', str: '供应商ID'},
                {key: 'openTime', str: '设店时间'},
                {key: 'storeNumber', str: '门店编号'},
                {key: 'storeName', str: '门店名称'},
                {key: 'province', str: '所在省'},
                {key: 'city', str: '所在市'},
                {key: 'zone', str: '所在区'},
                {key: 'address', str: '地址'},
                {key: 'storePhone', str: '门店电话'},
                {key: 'coordinate', str: '坐标'},
                {key: 'areaName', str: '所在片区'},
                {key: 'clerkerName', str: '店长'},
                {key: 'clerkerMobile', str: '店长手机'},
                {key: 'clerkerIdCard', str: '店长身份证'},
                {key: 'clerkerNum', str: '店长工号'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/storeAction',
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
