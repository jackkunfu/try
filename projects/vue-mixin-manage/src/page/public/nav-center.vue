<template lang="pug">
    .nav2
        .nav-box(v-for="item in navs")
            .title(v-if="item.name") {{item.name}}
            ul(v-if="item.lists")
                li(v-for="nav in item.lists") {{nav}}
</template>

<script>
export default {
    name: 'nav2',
    data(){
        return {
            navs:[{
                name: 'nav111',
                lists: ['用户管理','权限管理','角色管理']
            },{
                name: 'nav2 木有子集',
            },{
                lists: ['用户管理','权限管理','角色管理']
            }]
        }
    }
}
</script>

<style lang="sass" scoped>
.nav2
    width: 120px;
    background-image: linear-gradient(to right, #e5e9f2, #e2e4eb);
    float: left;
    height: 100%;
    .nav-box
        border-bottom: 1px solid #ccd5de;
        color: #475669;
        line-height: 36px;
        font-size: 12px;
        margin: 0 18px;
        .title
            font-weight: bold;
        ul
            margin: 0 -18px;
            li
                padding-left: 24px;
                cursor: pointer;
                &:hover
                    background: #fff;

</style>

