<template lang="pug">
.nav
    ul
        li(v-for="(nav,i) in navs" :class="i == cur ? 'cur':''" @click="cur = i")
            span {{nav.str}}

</template>
   
<script>
export default {
    name: 'menu',
    data () {
        return {
            navs: [
                {str: '首页', url:'/manage', name: 'm-index'},
                {str: '用户管理', url:'/user', name: 'user'},
                {str: 'app注册', url:'/user', name: 'app'},
                {str: '白名单', url:'/user', name: 'blank'}
            ],
            cur: 0
        }
    },
    watch: {
        cur(newValue, oldValue){
            this.$router.push(this.navs[newValue].url);
        }
    }
}
</script>

<style lang="less" scoped>
@colorBorder: #339999;
.nav{
    width: 120px;
    height: 100%;
    border-right: 1px solid @colorBorder;
    float: left;
    ul{
        overflow: hidden;
        li{
            float: left;
            color: @colorBorder;
            text-align: left;
            padding-left: 10px;
            width: 100%;
            line-height: 2;
            border: @colorBorder;
            &:hover, &.cur{
                background: @colorBorder;
                color: #FFF;
            }
        }
    }
}
</style>
    