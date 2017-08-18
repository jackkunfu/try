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
                {str: '首页', url:'/m-index', name: 'm-index'},
                {str: '用户管理', url:'/m-user', name: 'm-user'},
                {str: 'app注册', url:'/m-app', name: 'm-app'},
                {str: 'domain白名单', url:'/m-domain', name: 'm-domain'}
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

</style>
    