<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 门店检测管理报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="供应商")
                        //-     el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.vendorName" )
                        //-         el-option(v-for="(item, i) in vendorList" class="s1" :label="item.vendorName" :value="item.vendorName" :key="i")

                        el-form-item(label="门店名称")
                            el-input(v-model="searchMsg.storeName" placeholder="输入门店关键字，请勿代符号")

                        el-form-item(class="edit-address" label="门店地址")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")

                        //- el-form-item(label="所属区域")
                            //- multiple 多选状态 select加上这个属性
                            el-select(v-model="searchMsg.areaId" placeholder="请选择")
                                el-option(v-for="(item, i) in regionList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                        //- el-form-item(label="所属片区")
                        //-     el-select(v-model="searchMsg.areaName" multiple placeholder="请选择")
                        //-         el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.areaName" :key="i" class="s3")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                        //- el-form-item(label="是否有效数据")
                            el-radio-group(v-model="searchMsg.isValid")
                                el-radio(label="true") 是
                                el-radio(label="false") 否

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-store-detection/export')" ref="export") 导出报表

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
            //- vendorList: [],  // 供应商列表
            //- areaList: [],   // 片区列表
            regionList: [],   // 区域列表
            keys: [
                {key: 'vendorName', str: '供应商名称'},
                {key: 'storeNumber', str: '门店编号'},
                {key: 'storeName', str: '门店名称'},
                {key: 'serverPeople', str: '服务人数'},
                {key: 'validateDetection', str: '检测数'},
                {key: 'opencard', str: '开卡数'},
                {key: 'guahao', str: '挂号数'},
                {key: 'validateFbg', str: '血压(次)'},
                {key: 'indicatorHr', str: '心率(次)'},
                {key: 'indicatorFbg', str: '空腹血糖(次)'},
                {key: 'indicator2hpbg', str: '餐后两小时血糖(次)'},
                {key: 'indicatorBua', str: '血尿酸(次)'},
                {key: 'indicatorTc', str: '总胆固醇(次)'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/storeDetectionAction',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            searchKeys: ['storeName', 'areaId', 'startTime', 'endTime', 'isValid'],
            //- vendorPage : 1,
            //- vendorTotal: 0,
            //- areaPage: 1,
            //- areaTotal: 0,
            regionPage: 1,
            regionTotal: 0
        }
    },
    async mounted(){
        //- var vendorData = await tryAwait('get', '/vendor/searchList');   // 获取供应商列表
        //- this.vendorList = vendorData.model || [];
        //- this.vendorTotal = vendorData.totalPage || 0;

        var regionData = await tryAwait('get', '/area/index');   // 获取区域列表
        this.regionList = regionData.model || [];
        this.regionTotal = regionData.totalPage || 0;

        //- var areaData = await tryAwait('get', '/zone/index');    // 获取片区列表
        //- this.areaList = areaData.model || [];
        //- this.areaTotal = areaData.totalPage || 0;

        this.$nextTick(()=>{
            this.scrollMore('.s1', 'vendorList', 'vendorPage', 'vendorTotal', '/vendor/searchList');
            this.scrollMore('.s2', 'regionList', 'regionPage', 'regionTotal', '/area/index');
            this.scrollMore('.s3', 'areaList', 'areaPage', 'areaTotal', '/zone/index');
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
