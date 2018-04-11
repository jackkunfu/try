<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 操作日志
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="供应商")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.vendorName" )
                                el-option(v-for="(item, i) in vendorList" class="s1" :label="item.vendorName" :value="item.vendorName" :key="i")

                        //- el-form-item(class="edit-address" label="区域地址")
                            v-distpicker(hide-area @province="province" @city="city")

                        el-form-item(label="会员姓名")
                            el-input(type="text" placeholder="输入会员关键字，请勿带符号" v-model="searchMsg.userRealname")

                        el-form-item(label="会员手机号")
                            el-input(type="text" placeholder="输入会员手机号" v-model="searchMsg.userMobile")

                        el-form-item(label="账号名称")
                            el-input(type="text" placeholder="输入账号名称" v-model="searchMsg.optRealname")

                        el-form-item(label="账号手机")
                            el-input(type="text" placeholder="输入账号手机号" v-model="searchMsg.optMobile")

                        el-form-item(label="账号所属门店")
                            el-input(type="text" placeholder="输入账号所属门店" v-model="searchMsg.storeName")

                        //- el-form-item(label="区域名称")
                            el-select(v-model="searchMsg.areaId" multiple placeholder="请选择")
                                el-option(v-for="(item, i) in areaList" :label="item.areaName" :value="item.id" :key="i" class="s2")
                        br

                        //- el-form-item(label="是否有效数据")
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
                    //- el-button(type="info" @click="downForm") 导出报表

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
                {key: 'optName', str: '账号名称'},
                {key: 'optMobile', str: '账号手机号'},
                {key: 'storeName', str: '所属门店'},
                {key: 'userName', str: '会员姓名'},
                {key: 'userMobile', str: '会员手机号'},
                {key: 'createdTime', str: '修改时间'},
                {key: 'action', str: '配置名称'},
                {key: 'beforeModify', str: '变更前'},
                {key: 'afterModify', str: '变更后'}
            ],
            selfApi: {
                list: {
                    type: 'get',
                    url: '/log/index'
                }
            },
            areaList: [],
            areaName: [],
            // 搜索的各个字段配置
            searchKeys: ['userRealname', 'userMobile', 'optRealname', 'optMobile', 'startTime', 'endTime', 'storeName'],
            vendorPage : 1,
            vendorTotal: 0,
            areaPage: 1,
            areaTotal: 0
        }

    },
    async mounted(){
        var areaD = await tryAwait('get','/zone/index');
        if(areaD){
            this.areaList = areaD.model || [];
            this.areaTotal = areaD.totalPage || 0;
        }

        var veD = await tryAwait('get','/vendor/searchList');
        if(veD){
            this.vendorList = veD.model || [];
            this.vendorTotal = veD.totalPage || 0;
        }

        this.$nextTick(()=>{
            this.scrollMore('.s1', 'vendorList', 'vendorPage', 'vendorTotal', '/vendor/searchList');
            this.scrollMore('.s2', 'areaList', 'areaPage', 'areaTotal', '/zone/index');
        })
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
