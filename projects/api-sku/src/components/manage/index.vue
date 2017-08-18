<template lang="pug">
    div
        h1 manage items:
        ul
            li(v-for="(item, i) in lists") 
                h4 {{i+1}}.&nbsp;{{item.name}}
</template>
   

<script>
export default {
    name: 'm-index',
    data () {
        return {
            lists: [
                {name:'用户开发者管理'},
                {name:'app注册添加'},
                {name:'domain白名单管理'},
                {name:'其他'}
            ]
        }
    }
}
</script>

<style lang="sass" scoped>
    h1
        text-align: left;
        padding: 30px;

    ul
        margin-left: 100px;
        li  
            line-height: 30px;
            text-align: left;

</style>
    