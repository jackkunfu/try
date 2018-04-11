<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn
                .page-title 检测数据
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="会员姓名")
                            el-input(v-model="searchMsg.userName" placeholder="会员名字关键字，请勿带符号")

                        el-form-item(label="会员手机")
                            el-input(v-model="searchMsg.userMobile" placeholder="请输入会员手机")

                        el-form-item(class="edit-address" label="所在地区")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")
                        br

                        el-form-item(label="店员姓名")
                            el-input(v-model="searchMsg.clerkName" placeholder="店员姓名关键字，请勿带符号")

                        el-form-item(label="店员手机")
                            el-input(v-model="searchMsg.clerkMobile" placeholder="请输入店员手机")

                        el-form-item( class="search-time" label="数据时间段")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")
                        br
                        el-form-item(label="门店名称")
                            el-input(v-model="searchMsg.storeName" placeholder="请输入门店名称，请勿带符号")

                        el-form-item(label="所在区域")
                            el-select(v-model="searchMsg.vendorAreaId" placeholder="请选择" @change="searchArea")
                                el-option(v-for="(item, i) in regionList" :label="item.areaName" :value="item.id" :key="i" class="s2")
                        el-form-item(label="所在片区")
                            el-select(v-model="searchMsg.childVendorId" placeholder="请选择")
                                el-option(v-for="(item, i) in childList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    //- el-button(type="info" @click="downForm('/report-detection-deta/export')" ref="export") 导出报表

                mtable(:keys="keys" :tableData="tableData" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @pageChange="pageChange" :tabOp="tabOp")

</template>

<script>
import config from '@/basic/config.js'

import upfile from '@/basic/mixins/upfile.js'

// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'

var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
var addZero = function(v) {
    return (v+'').length == 1 ? '0'+v : v;
}
export default {
    name: 'health',
    mixins: [mixTable, upfile, scrollMore],
    data(){
        return {
            keys: [
                {key: 'takeTime', str: '检测时间'},
                {key: 'userRealname', str: '会员姓名'},
                {key: 'gender', str: '性别'},
                {key: 'userMobile', str: '会员手机'},
                //- {key: 'createdTime', str: '会员身份证'},
                {key: 'typeCode', str: '检测项目'},
                {key: 'values', str: '检测数值'},
                {key: 'operateRealname', str: '检测店员'},
                {key: 'operateMobile', str: '店员手机'},
                {key: 'storeName', str: '门店名称'}
            ],
            searchKeys: ['userName', 'userMobile', 'provinceCode', 'cityCode', 'clerkName', 'clerkMobile', 'storeName', 'vendorAreaId','startTime','endTime','childVendorId'],
            regionPage: 1,
            regionTotal: 0,
            regionList: [],
            childList: [],
            clickTime: true,
        }
    },
   mounted(){
       this.areaList();
    },
    methods: {
        
        time(t){
            var nt = new Date(t)
            return t ? (nt.getFullYear() + '-' + ((nt.getMonth())+1) + '-' + addZero(nt.getDate())) : '';
        },
        async tableList(){
            this.searchMsg.vendorId = venId;
            this.searchMsg.startTime =  this.searchMsg.startTime ? new Date( this.time(this.searchMsg.startTime).replace(/\-/g, "/") ).getTime() : '';
            this.searchMsg.endTime = this.searchMsg.endTime ? new Date( this.time(this.searchMsg.endTime).replace(/\-/g, "/") ).getTime()+86399999 : '';
            var opts1 = $.extend(true,{
                _api: 'pd.indecator.indecatorValues',
                vendorId: venId,
                accessLevel: localStorage.roleLevel,
                limit: 10,
                offset: (this.currentPage - 1)*10
            },this.searchMsg);
            var list = await tryAwait('get','',opts1,true);
            if(list && list.success){
                this.tableData = list.model || [];
            }else{
                if(list.msgInfo == '系统异常'){
                    this.$message({
                        type: 'success',
                        message: '暂无数据',
                        offset: 100
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: list.msgInfo,
                        offset: 100
                    });
                }
                
            }
        },

        // 获取区域数据
        async areaList(){
            var user = await tryAwait('get', '', {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                keyword: this.searchMsg.areaName,
                status: 1,
                type: 1,
                limit: 100,
                offset: (this.currentPage - 1)*10
            }, true)
            var userData = user.model || [];
            this.regionList = userData.map( v=>{
                v.areaStr = '';
                if(v.childrens && v.childrens.length > 0){
                    v.childrens.forEach( el => {
                        v.areaStr += el.areaName + ';';
                    });
                }
                return v
            });
        },

        async searchArea(){
            this.searchMsg.childVendorId = '';
            if(this.searchMsg.vendorAreaId == '') return;
            var child = await tryAwait('get', '', {
                _api: 'pd.area.searchById',
                id: this.searchMsg.vendorAreaId
            },true);
            var childData = child.model || [];
            this.childList = childData;
        },

        province(v){
            // console.log(v);
            this.searchMsg.provinceCode = v.code || ''
            this.searchMsg.cityCode = '';
        },

        city(v){
            // console.log(v);
            this.searchMsg.cityCode = v.code || ''
        }
    },
    watch: {
        
    }
}
</script>

<style lang="sass" scoped>

</style>
