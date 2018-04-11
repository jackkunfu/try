<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 店员业绩管理报表
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="供应商")
                        //-     el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.vendorName")
                        //-         el-option(v-for="(item, i) in vendorList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(class="edit-address" label="区域地址")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")

                        //- el-form-item(label="区域名称")
                        //-     el-input(type="text" auto-complete="off" placeholder="区域名称" v-model="searchMsg.areaName")

                        //- el-form-item(label="所属区域")
                            //- multiple 多选状态 select加上这个属性
                            el-select(v-model="searchMsg.areaId" placeholder="请选择")
                                el-option(v-for="(item, i) in regionList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                        br
                        el-form-item(label="店员姓名")
                            el-input(type="text" auto-complete="off" placeholder="店员姓名" v-model="searchMsg.clerkerName")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")

                        el-form-item(label="门店名称")
                            el-input(type="text" auto-complete="off" placeholder="门店名称" v-model="searchMsg.storeName")
                        br
                        el-form-item(label="店员手机")
                            el-input(type="text" auto-complete="off" placeholder="店员手机" v-model="searchMsg.clerkerMobile")

                        //- el-form-item(label="店员编号")
                        //-     el-input(type="text" auto-complete="off" placeholder="店员编号" v-model="searchMsg.staffName")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="info" @click="downForm('/report-clerker-performance/export')" ref="export") 导出报表

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
            regionList: [],   // 区域列表
            keys: [
                {key: 'vendorName', str: '供应商名称'},
                {key: 'storeName', str: '门店名称'},
                {key: 'clerkName', str: '店员姓名'},
                {key: 'detection', str: '服务人次'},
                {key: 'validateFbg', str: '血压(次)'},
                {key: 'validateDetection', str: '检测数'},
                {key: 'indicatorFbg', str: '空腹血糖(次)'},
                {key: 'indicator2hpbg', str: '餐后两小时血糖(次)'},
                {key: 'indicatorTc', str: '总胆固醇(次)'},
                {key: 'indicatorBua', str: '血尿酸(次)'},
                {key: 'indicatorHr', str: '心率(次)'},
                {key: 'serverPeople', str: '服务人数'},
                {key: 'opencard', str: '开卡数'},
                {key: 'guahao', str: '挂号数'},
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/Report/clerkPerformanceAction',
                    options: {
                        vendorId: localStorage.pdSaasVendorId
                    },
                    listkey: 'item'
                }
            },
            // 搜索的各个字段配置
            searchKeys: ['storeName', 'clerkerMobile', 'areaId', 'clerkerName', 'startTime', 'endTime'],
            regionPage: 1,
            regionTotal: 0
        }
    },
    async mounted(){
    console.log(JSON.parse(localStorage.pdUserInfo))
        var regionData = await tryAwait('get', '/area/index');   // 获取区域列表
        this.regionList = regionData.model || [];
        this.regionTotal = regionData.totalPage || 0;

        this.$nextTick(()=>{
            this.scrollMore('.s2', 'regionList', 'regionPage', 'regionTotal', '/area/index');
        })
    },
    methods: {
        province(v){
            //- this.editItem.province = v;
            this.searchMsg.province = v.code;
            this.searchMsg.city = '';
        },
        city(v){
            //- this.editItem.city = v;
            this.searchMsg.city = v.code;
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
