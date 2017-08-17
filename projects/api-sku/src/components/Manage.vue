<template lang="pug">
.manage-ctn
    ManageNav(cur="cur")
    .main
        router-view
</template>
   

<script>
import ManageNav from './Nav.vue'
export default {
    name: 'manage',
    data () {
        return {
        }
    },
    components: {
        ManageNav
    }
}
</script>

<style lang="less" scoped>
.manage-ctn{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main{
        width: 80%;
        float: left;
    }
}
</style>
    