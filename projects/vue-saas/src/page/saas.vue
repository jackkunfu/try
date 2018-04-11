<template lang="pug">
.manage_page.fillcontain(style="height:100%;position:relative;")
    .top
        top-nav(:topNav="topNav" ref="top")
    .main
        .nav-left
            left-nav(:leftNav="leftNav" ref="left")
        .ctn
            router-view
</template>

<script>
// 公共样式
import '../style/public.sass'

import topNav from './public/head.vue'
import leftNav from './public/nav.vue'

// import { navData } from '../config/configData.js'
var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';
export default {
    name: 'saas-ctn',
    data(){
        return {
            topNav: [],
            leftNav: [],
            // topNav: [{
            //     permissionName: '账号中心',
            //     icon: 'fa fa-briefcase',
            //     lists: [{
            //         permissionName: '供应商',
            //         linkUrl: '/sa-supplier'
            //     }, {
            //         permissionName: '导航角色配置',
            //         linkUrl: '/sa-role'
            //     }]

            // }, {
            //     permissionName: '会员配置',
            //     icon: 'fa fa-briefcase',
            //     lists: [{
            //         permissionName: '会员配置',
            //         linkUrl: '/sa-vip'
            //     }]
            // }, {
            //     permissionName: '门店配置',
            //     icon: 'fa fa-briefcase',
            //     lists: [{
            //         permissionName: '区域配置',
            //         linkUrl: '/sa-region'
            //     },{
            //         permissionName: '片区配置',
            //         linkUrl: '/sa-area'
            //     },{
            //         permissionName: '门店配置',
            //         linkUrl: '/sa-store'
            //     },{
            //         permissionName: '雇员配置',
            //         linkUrl: '/sa-clerk'
            //     }],
            // }, {
            //     permissionName: '报表',
            //     icon: 'fa fa-briefcase',
            //     lists: [{
            //         permissionName: '供应商报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '区域检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '片区检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '门店检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '店长检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '店员检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '会员检测报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '检测管理报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '优惠券报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '开卡明细报表',
            //         linkUrl: '/report/coming'
            //     },{
            //         permissionName: '开卡业绩报表',
            //         linkUrl: '/report/coming'
            //     }]
            // }],
            // leftNav: [{
            //     permissionName: '概况',
            //     icon: 'fa fa-pie-chart',
            //     linkUrl: '/'
            // },{
            //     permissionName: '健康管理',
            //     icon: 'fa fa-heartbeat',
            //     linkUrl: '/monitor/coming'
            // },{
            //     permissionName: '智慧商务',
            //     icon: 'fa fa-briefcase',
            //     lists: [{
            //         permissionName: '营销中心',
            //         linkUrl: '/market'
            //     }, {
            //         permissionName: '统一消息管理',
            //         linkUrl: '/newsCenter'
            //     }]
            // },{
            //     permissionName: '员工成长',
            //     icon: 'fa fa-male',
            //     lists: [{
            //         permissionName: '培训晋升配置',
            //         linkUrl: '/promot'
            //     }, {
            //         permissionName: '内容中心',
            //         linkUrl: '/content'
            //     }]
            // },{
            //     permissionName: '增值业务',
            //     icon: 'fa fa-jpy',
            //     lists: [{
            //         permissionName: '监控中心',
            //         linkUrl: '/monitor/coming'
            //     }, {
            //         permissionName: '健康讲堂配置',
            //         linkUrl: '/health/coming'
            //     }]
            // }]
        }
    },
    components: {
        topNav,
        leftNav
    },
    async mounted(){
        // 获取导航，目前只获取第一级导航
        // var navData = (await tryAwait('get', '/permission/homeList', {})).model || {};
        // this.topNav = navData.topList || [];
        // this.leftNav = navData.leftList || [];

        var navData = (await tryAwait('get', '', {
            vendorId: venId,
            tag: 'saas',
            _api: 'pd.perm.navigation.get'
        }, true)).model || [];

        if(navData){
            this.topNav = navData.filter( v=> v.type=='nav-top');
            this.leftNav = navData.filter( v=> v.type=='nav-left');
        }
    },
    methods: {
        a(data){
            var arr = []
            data.forEach( (v,i) =>{
                v.parentId == 0 && arr.push(v);
                data.splice(i,1)
            })
            arr.forEach( el =>{
                data.forEach( (v,i) =>{
                    if(v.parentId = el.id){
                        if(!el.list) el.list = [];
                        el.list.push(v)
                    }
                })
            })
            return arr
        }
    },
    beforeDestroy(){
        // 如果不保存密码，离开网站的时候删掉 本地存储的用户Id
        // delete localStorage.pdSaasUserId;
    }
}
</script>

<style lang="sass" scoped>
.top
    height: 48px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #eee;
    z-index: 1;

.main
    overflow: hidden;
    min-height: 100%;
    height: 100%;
    padding-top: 48px;
    position: relative;
    .nav-left
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        min-height: 100%;
        height: 100%;
        background: #324057;
        padding-top: 48px;

    .ctn
        width: 100%;
        // padding-left: 150px;
        background: #f9fafc;
        overflow: hidden;
        height: 100%;
        min-height: 100%;
</style>
