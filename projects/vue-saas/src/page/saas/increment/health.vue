<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
            nav-center(:navData="navaData")

        div(style="padding-left:150px;height:100%;")
            router-view

</template>

<script>
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'healthClassroom',
    components: {
        navCenter
    },
    data(){
        return {
            navaData: [{
                name: '培训考试',
                lists: [{
                    name: '岗位',
                    url: '/promot/coming'
                },{
                    name: '等级',
                    url: '/promot/coming',
                },{
                    name: '课程',
                    url: '/promot/coming',
                },{
                    name: '课件',
                    url: '/promot/coming',
                },{
                    name: '试卷',
                    url: '/promot/coming',
                },{
                    name: '考题',
                    url: '/promot/coming',
                }]
            }, {
                name: '行为中心',
                lists: [{
                    name: '任务系统',
                    url: '/content/coming'
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
