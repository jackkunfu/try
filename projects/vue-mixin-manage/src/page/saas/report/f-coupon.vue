<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 优惠券核销报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="核销门店")
                            el-input(type="text" auto-complete="off" placeholder="门店关键字，请勿带符号" v-model="searchMsg.storeName")

                        el-form-item(label="使用区域")
                            el-select(v-model="searchMsg.vendorAreaId" placeholder="请选择")
                                el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                        el-form-item(class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                        br
                        el-form-item(label="核销店员")
                            el-input(type="text" auto-complete="off" placeholder="店员姓名" v-model="searchMsg.clerkName")

                        el-form-item(label="券类型")
                            el-select(v-model="searchMsg.type" placeholder="请选择")
                                //- el-option(v-for="(item, i) in couponList" :label="item.couponName" :value="item.id" :key="i" class="s3")
                                el-option(label="满减" value="1")
                                el-option(label="直减" value="2")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-usercoupon/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'

// table列表组件
import mtable from '@/page/public/table.vue'

// 地区选择插件
import vDistpicker from 'v-distpicker'

export default {
    name: 'role',
    mixins: [mixTable],
    components: {
        mtable,
        vDistpicker
    },
    data(){
        return {
            areaList: [],
            areaPage: 1,
            areaTotal: 0,
            // couponList: [],
            // couponPage: 1,
            // couponTotal: 0,
            keys: [
                //- {key: 'className', str: '所属分类'},
                {key: 'className', str: '对应产品名称'},
                {key: 'type', str: '优惠券类型'},
                {key: 'title', str: '优惠券内容'},
                {key: 'a', str: '会员姓名'},
                {key: 'b', str: '会员手机'},
                {key: 'nickName', str: '领取微信昵称'},
                {key: 'getTime', str: '领取时间'},
                {key: 'useTime', str: '使用时间'},
                {key: 'storeName', str: '核销门店'},
                {key: 'realName', str: '核销店员'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/couponAction ',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            // 搜索的各个字段配置
            searchKeys: ['storeName', 'vendorAreaId', 'clerkName', 'startTime', 'endTime', 'type']
        }
    },
    async mounted(){
        var areaD = await tryAwait('get','/zone/index');
        this.areaList = areaD.model || [];
        this.areaTotal = areaD.totalPage || 0;
        // var couD = await tryAwait('get','/coupon/index');
        // this.couponList = couD.model || [];
        // this.couponTotal = couD.totalPage || 0;

        this.$nextTick(()=>{
            this.scrollMore('.s2', 'areaList', 'areaPage', 'areaTotal', '/zone/index');
            // this.scrollMore('.s3', 'couponList', 'couponPage', 'couponTotal', '/coupon/index');
        })
    },
    methods: {
        province(v){
            this.editItem.province = v;
            this.searchMsg.provinceName = v.code;
            this.searchMsg.cityName = '';
        },
        city(v){
            this.editItem.city = v;
            this.searchMsg.cityName = v.code;
        },
        changeTableData(data){
            return data;
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
