<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 供应商管理报表
                .search-ctn
                    el-button(type="info" @click="downForm" ref="export") 导出报表

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
                {key: 'createdTime', str: '添加时间'},
                {key: 'vendorName', str: '供应商名称'},
                {key: 'areaName', str: '公司地址'},
                {key: 'createdTime', str: '供应商ID'},
                {key: 'createdTime', str: '管理员姓名'},
                {key: 'createdTime', str: '管理员手机号码'},
                {key: 'createdTime', str: 'Logo图片'}
            ],
            selfApi: {
                list: {type: 'get', url: '/zone/index'}
            }
        }
    },
    mounted(){},
    methods: {}
}
</script>

<style lang="sass" scoped>

</style>
