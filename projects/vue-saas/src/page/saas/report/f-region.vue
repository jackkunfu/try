<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 区域检测报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="供应商")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.vendorName" )
                                el-option(v-for="(item, i) in vendorList" class="s1" :label="item.vendorName" :value="item.vendorName" :key="i")

                        el-form-item(class="edit-address" label="区域地址")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")

                        //- el-form-item(label="区域名称")
                            el-select(v-model="searchMsg.areaId" multiple placeholder="请选择")
                                el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                        el-form-item(label="区域名称")
                            el-input(v-model="searchMsg.zoneName" placeholder="区域名称")

                        br

                        el-form-item(label="是否有效数据")
                            el-radio-group(v-model="searchMsg.isValidStr")
                                el-radio(label="是")
                                el-radio(label="否")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-zone-detection/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'

export default {
    name: 'role',
    mixins: [mixTable, scrollMore],
    data(){
        return {
            vendorList: [],  // 供应商列表
            keys: [
                //- {key: 'vendorName', str: '供应商名称'},
                {key: 'pianQuName', str: '区域名称'},
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
                    url: '/Report/zoneDetectionAction',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            areaList: [],
            areaName: [],
            // 搜索的各个字段配置
            searchKeys: ['zoneName', 'startTime', 'endTime', 'isValidStr'],
            vendorPage : 1,
            vendorTotal: 0,
            areaPage: 1,
            areaTotal: 0
        }

    },
    async mounted(){
        // 搜索区域下拉列表滚动加载，暂不用了
        //- var areaD = await tryAwait('get','/zone/index');
        //- this.areaList = areaD.model || [];
        //- this.areaTotal = areaD.totalPage || 0;
        //- var veD = await tryAwait('get','/vendor/searchList');
        //- this.vendorList = veD.model || [];
        //- this.vendorTotal = veD.totalPage || 0;
        //-
        //- this.$nextTick(()=>{
        //-     this.scrollMore('.s1', 'vendorList', 'vendorPage', 'vendorTotal', '/vendor/searchList');
        //-     this.scrollMore('.s2', 'areaList', 'areaPage', 'areaTotal', '/zone/index');
        //- })
    },
    methods: {
        province(v){
            this.searchMsg.province = v.code;
            this.searchMsg.city = '';
        },
        city(v){
            this.searchMsg.city = v.code;
        },
        changeSearchOption(){
            if(this.searchMsg.isValidStr == '是') this.searchMsg.isValid = true;
            if(this.searchMsg.isValidStr == '否') this.searchMsg.isValid = false;
        }
    }
}
</script>

<style lang="sass" scoped>
.el-form-item
</style>
