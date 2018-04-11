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
    name: 'content',
    components: {
        navCenter
    },
    data(){
        return {
            navaData: [{
                name: '',
                lists: [{
                    name: '内容分类',
                    url: '/sa-newsSort'
                }, {
                    name: '内容配置',
                    url: '/sa-news',
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
