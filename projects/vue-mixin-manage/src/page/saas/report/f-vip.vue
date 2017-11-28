<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 会员数据管理报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="会员姓名")
                            el-input(v-model="searchMsg.memberName" placeholder="会员姓名")

                        el-form-item(label="会员手机")
                            el-input(v-model="searchMsg.memberMobile" placeholder="会员手机")

                        el-form-item(label="会员卡号")
                            el-input(v-model="searchMsg.memberCardNo" placeholder="会员卡号")

                        el-form-item(label="开卡店员")
                            el-input(v-model="searchMsg.clerkerName" placeholder="开卡店员")

                        el-form-item(label="店员手机")
                            el-input(v-model="searchMsg.clerkerMobile" placeholder="店员手机")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-member/export')" ref="export") 导出报表

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
                {key: 'kaikaTime', str: '开卡时间'},
                {key: 'userRealName', str: '会员姓名'},
                {key: 'gender', str: '性别'},
                {key: 'mobile', str: '会员手机'},
                {key: 'idCard', str: '会员身份证'},
                {key: 'address', str: '家庭地址'},
                {key: 'phone', str: '固定电话'},
                {key: 'memberCardNo', str: '会员卡号'},
                {key: 'clerkerName', str: '开卡店员'},
                {key: 'clerkMobile', str: '店员手机'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/memberAction',
                    options: {
                        vendorId:localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            searchKeys: ['clerkerName', 'clerkerMobile', 'memberCardNo','memberName','memberMobile', 'startTime', 'endTime']
        }
    },
    mounted(){},
    methods: {}
}
</script>

<style lang="sass" scoped>

</style>
