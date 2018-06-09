<template lang="pug">
.h100
    .top
        img(src="../../assets/user_bg@2x.png")
        .item
            img.fl(:src="my.img")
            .title
                span {{my.name}}

            .sub-title 完善个人信息
                span 》

    .tab-ctn
        .tab(@click="curTab=0" :class="curTab==0?'cur':''")
            img(src="../../assets/user_icon_course_s@2x.png" v-if="curTab == 0")
            img(src="../../assets/user_icon_course_n@2x.png" v-else)
            span 课程信息

        .tab(@click="curTab=1" :class="curTab==1?'cur':''")
            img(src="../../assets/user_icon_test_s@2x.png" v-if="curTab == 1")
            img(src="../../assets/user_icon_test_n@2x.png" v-else)
            span 体能测试
        
        .tab.no-br(@click="curTab=2" :class="curTab==2?'cur':''")
            img(src="../../assets/user_icon_evaluation_s@2x.png" v-if="curTab == 2")
            img(src="../../assets/user_icon_evaluation_n@2x.png" v-else)
            span 教练评价

    .main
        div(v-if="curTab == 0")
        div(v-if="curTab == 1")

        div.pj(v-if="curTab == 2")
            .item-ctn
                img.fl(:src="coach.img")
                .title 今日教练：{{coach.name}}
                .sub-title {{coach.time}}

            .clear

            .xing
                .each
                    span 教学态度：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="x1=i+1" :src="i<x1 ? activeStarImg : starImg")
                .each
                    span 课堂纪律：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="x2=i+1" :src="i<x2 ? activeStarImg : starImg")
                .each
                    span 互动性：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="x3=i+1" :src="i<x3 ? activeStarImg : starImg")

            textarea(placeholder="对教练的意见或建议")

            .lbtn(v-if="true") 提交评价
            .lbtn.disable(v-else) 已评价

</template>

<script>
export default {
    name: 'detail',
    data () {
        return {
            my: {
                img: '',
                name: '王小二'
            },
            coach: {
                img: '',
                name: '王小二',
                time: '2018-01-01 11:00:00 - 13:00:00'
            },
            curTab: 0,
            x1: 0,
            x2: 0,
            x3: 0,
            activeStarImg: require('../../assets/user_icon_star_s@2x.png'),
            starImg: require('../../assets/user_icon_star_n@2x.png')
        }
    },
    watch: {
        curTab(){
            this.x1 = 0
            this.x2 = 0
            this.x3 = 0
        }
    }
}
</script>

<style scoped lang="sass">
.main
    padding: 0.6rem
    
    .pj
        background: #f6f6f6
        padding: 1rem

        .item-ctn
            > img
                width: 2.5rem
                height: 2.5rem
            >div
                margin-left: 3rem
            .title
                margin-bottom: 0.2rem

        .xing
            margin: 0.8rem 0
            .each
                margin-bottom: 0.3rem
            span
                display: inline-block
                width: 3.5rem
            img
                width: 1rem
                margin: 0 0.25rem
        
        .lbtn
            margin-top: 1rem

.tab-ctn
    box-shadow: 0 2px 4px 0 rgba(219,219,219,0.50)
    margin: 0.5rem 0

.tab
    width: 33.333333%
    display: inline-block
    border-right: 1px solid #e9e9e9
    text-align: center
    margin-bottom: 0.3rem
    &.no-br
        border-right: none
    &.cur
        color: #48C4F5

    img
        width: 1.4rem
        display: block
        margin: 0.2rem auto

.top
    position: relative
    
    > img
        width: 100%
        position: absolute
    .item
        padding: 3rem 0 1rem
        position: relative
        background: none
        margin-bottom: 0
        img
            width: 4rem
            height: 4rem
            borer-radius: 50%
            margin-left: 1rem
        .title, .sub-title
            color: #fff
            margin-left: 6rem
        .sub-title
            line-height: 1rem
            span
                font-size: 0.8rem
                margin-left: 0.1rem
</style>
