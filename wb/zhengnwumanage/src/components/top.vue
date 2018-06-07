<template lang="pug">
    div
        //- img(src="http://test.yun-ti.com:9112/ywpt/images/globar/logo.gif")
        .name 郑武体育管理后台
</template>

<script>
export default {
    name: 'top',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
img
    float: left
    height: 100%
.name
    line-height: 60px
    font-size: 20px
    padding-left: 10px
    float: left
</style>
