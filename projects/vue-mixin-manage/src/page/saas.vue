<template lang="pug">
.manage_page.fillcontain(style="height:100%;position:relative;")
    .top
        top-nav(:topNav="topNav" :userInfo="userInfo" ref="top")
    .main
        //- .nav-left
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

export default {
    name: 'saas-ctn',
    data(){
        return {
            topNav: [],
            leftNav: [],
            userInfo: this.$route.query.userInfo
        }
    },
    components: {
        topNav,
        leftNav
    },
    async mounted(){
        // 获取导航，目前只获取第一级导航
        var navData = (await tryAwait('get', '/permission/homeList', {})).model || {};
        this.topNav = navData.topList || [];
        this.leftNav = navData.leftList || [];
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
        width: 150px;
        min-height: 100%;
        height: auto;
        background: #324057;
        // padding-bottom: 9999px;
        // margin-bottom: -9999px;

    .ctn
        width: 100%;
        // padding-left: 150px;
        background: #f9fafc;
        overflow: hidden;
        height: 100%;
        min-height: 100%;
</style>
