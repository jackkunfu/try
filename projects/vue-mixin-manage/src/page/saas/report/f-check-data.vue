<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 检测数据管理报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="会员姓名")
                            el-input(v-model="searchMsg.memberName" placeholder="会员姓名")

                        el-form-item(label="会员手机")
                            el-input(v-model="searchMsg.memberMobile" placeholder="会员手机")

                        el-form-item(class="edit-address" label="所在地区")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")

                        //- el-form-item(label="会员卡号")
                            el-input(v-model="searchMsg.cardNo" placeholder="会员卡号")

                        el-form-item(label="开卡店员")
                            el-input(v-model="searchMsg.clerkerName" placeholder="开卡店员")

                        el-form-item(label="店员手机")
                            el-input(v-model="searchMsg.clerkerMobile" placeholder="店员手机")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                        el-form-item(label="门店名称")
                            el-input(v-model="searchMsg.storeName" placeholder="门店名称")

                        //- el-form-item(label="所在区域")
                            //- multiple 多选状态 select加上这个属性
                            el-select(v-model="searchMsg.areaId" placeholder="请选择")
                                el-option(v-for="(item, i) in regionList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-detection-deta/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'
// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'
// table列表组件
import mtable from '@/page/public/table.vue'
import vDistpicker from 'v-distpicker'
export default {
    name: 'role',
    mixins: [mixTable, scrollMore],
    components: {
        mtable,
        vDistpicker
    },
    data(){
        return {
            keys: [
                {key: 'takeTime', str: '检测时间'},
                {key: 'realname', str: '会员姓名'},
                {key: 'gender', str: '性别'},
                {key: 'mobile', str: '会员手机'},
                //- {key: 'createdTime', str: '会员身份证'},
                {key: 'detectionType', str: '检测项目'},
                {key: 'jcdata', str: '检测数值'},
                {key: 'operterName', str: '检测店员'},
                {key: 'operaterMobile', str: '店员手机'},
                {key: 'storeName', str: '门店名称'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/detectionDataAction',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            searchKeys: ['areaId', 'memberName', 'memberMobile', 'clerkerName', 'clerkerMobile', 'startTime', 'endTime', 'storeName'],
            regionPage: 1,
            regionTotal: 0,
            regionList: []
        }
    },
    async mounted(){
        var regionData = await tryAwait('get', '/area/index')  // 获取区域列表
        this.regionList = regionData.model || [];
        this.regionTotal = regionData.totalPage || 0;

        this.$nextTick(()=>{
            this.scrollMore('.s2', 'regionList', 'regionPage', 'regionTotal', '/area/index');
        })
    },
    methods: {
        // 地址选择改变事件
        province(v){
            //- this.searchMsg.provinceObj = v;
            this.searchMsg.province = v.code;
            this.searchMsg.city = '';
        },
        city(v){
            //- this.searchMsg.cityObj = v;
            this.searchMsg.city = v.code;
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
