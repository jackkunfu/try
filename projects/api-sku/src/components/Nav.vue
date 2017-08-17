<template lang="pug">
.nav
    ul
        li(v-for="(nav,i) in navs" :class="i == cur ? 'cur':''")
            router-link(to="{path:'nav.url'}") {{nav.str}}
            //- span {{nav.str}}
</template>
   

<script>
export default {
    name: 'menu',
    data () {
        return {
            navs: [
                {str:'首页',url:'/'},
                {str:'用户管理',url:'/user'},
                {str:'Api',url:'/api'},
                {str:'待续',url:'/'}
            ],
            cur: 0
        }
    }
}
</script>

<style lang="less" scope>
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
            &:hover{
                background: @colorBorder;
                color: #FFF;
            }
        }
    }
}
</style>
    