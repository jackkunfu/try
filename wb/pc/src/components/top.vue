<template lang="pug">
    div
        //- img(src="http://test.yun-ti.com:9112/ywpt/images/globar/logo.gif")
        .name 郑武体育管理后台
        .fr
            img(:src="config.imgPath+uInfo.avatar")
            span {{uInfo.account}}
            el-button(size="mini" @click="logout") 退出
</template>

<script>
export default {
    name: 'top',
    data () {
        return {
            uInfo: 'Welcome to Your Vue.js App'
        }
    },
    mounted(){
        if(localStorage.zwManageUinfo) this.uInfo = JSON.parse(localStorage.zwManageUinfo)
    },
    methods: {
        logout(){
            localStorage.removeItem('zwManageUid')
            localStorage.removeItem('zwManageUinfo')
            location.href = '/'
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
.fr
    margin-top: 15px
    margin-right: 10px
    img
        width: 46px
        height: 46px
        position: relative
        top: -10px
    span
        margin: 0 5px
</style>
