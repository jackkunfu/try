<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center(:navData="navaData")

        div(style="padding-left:150px;height:100%;")
            router-view

</template>

<script>
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'newsCenter',
    components: {
        navCenter
    },
    data(){
        return {
            navaData: [{
                name: 'SMS',
                lists: []
            }, {
                name: '应用推送',
                lists: [{
                    name: 'B端推送',
                    url: '/newsCenter/coming'
                }, {
                    name: 'C端推送',
                    url: '/newsCenter/coming'
                }]
            }, {
                name: '邮件',
                lists: []
            }, {
                name: '微信',
                lists: [{
                    name: '微信公众号',
                    url: '/newsCenter/coming'
                },{
                    name: '微信小程序',
                    url: '/newsCenter/coming'
                }]
            }],
            id: this.$route.query.id
        }
    },
    mounted(){},
    methods: {}
}
</script>

<style lang="sass" scoped>


</style>
