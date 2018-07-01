<template lang="pug">
.h100
    .top
        img(src="../../assets/user_bg@2x.png")
        .item
            img.fl(:src="config.imgPath+my.avatar")
            .title
                span {{my.name}}

            .sub-title(@click="goUrl('/myset', my)") 完善个人信息
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
        div.cc(v-if="curTab == 0")
            img(:src="cardImg")
            div(v-for="(item, i) in course")
                .other 其他详细信息
                div 上课时间：{{course.times}}
                    img(src="../../assets/user_icon_time@2x.png")
                div 训练频次：{{course.times}}
                    img(src="../../assets/user_icon_pinlv@2x.png")
                div
                    img(src="../../assets/user_icon_information@2x.png")
                    span 开卡时间：{{course.times}}
                    span.span 到期时间：{{course.times}}

        div.tn(v-if="curTab == 1")
            img(v-if="tnList.length == 0" src="../../assets/user_pic_wushuju@2x.png")
            div(v-else)
                div(v-if="!showTnTable")
                    .each(v-for="(item, i) in tnList" @click="showTnTable=true")
                        img.img-bg(src="../../assets/user_list_bg@2x.png")
                        div
                            .time {{item.time || 'xxxx-xx-xx'}}
                            span {{item.time || 'xxxx-xx-xx'}}
                div(v-else)
                    img.tnDetailImg(:src="tnDetailImg" @click="showTnTable=false")

        div.pj(v-if="curTab == 2")
            .item-ctn
                img.fl(:src="coach.img")
                .title 今日教练：{{coach.name}}
                .sub-title {{coach.time}}

            .clear

            .xing
                .each
                    span 教学态度：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="clickXing('x1', i)" :src="i<x1 ? activeStarImg : starImg")
                .each
                    span 课堂纪律：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="clickXing('x2', i)" :src="i<x2 ? activeStarImg : starImg")
                .each
                    span 互动性：
                    img(v-for="(item, i) in [1,1,1,1,1]" @click="clickXing('x3', i)" :src="i<x3 ? activeStarImg : starImg")

            textarea(placeholder="对教练的意见或建议" v-model="pjStr")

            .lbtn(v-if="!isPJ" @click="pj") 提交评价
            .lbtn.disable(v-else) 已评价

</template>

<script>
export default {
    name: 'my',
    data () {
        return {
            userId: this.$route.query.userId || this.$route.query.id,
            my: {
                avatar: '',
                name: '王小二'
            },
            coach: {
                img: '',
                name: '王小二',
                time: '2018-01-01 11:00:00 - 13:00:00'
            },
            course: [],
            // course: {
            //     time: '2018-01-01 11:00:00 - 13:00:00',
            //     times: '一周两次',
            //     startDate: '2018-01-01 11:00:00 - 13:00:00'
            // },
            tnList: [
                {}, {}
            ],
            curTab: -1,
            x1: 0,
            x2: 0,
            x3: 0,
            activeStarImg: require('../../assets/user_icon_star_s@2x.png'),
            starImg: require('../../assets/user_icon_star_n@2x.png'),
            showTnTable: false,
            tnDetailImg: '',
            cardLevel: null,
            isPJ: false,     // 是否已经评价
            pjStr: ''
        }
    },
    computed: {
        cardImg(){
            if(this.cardLevel === null) return ''
            return require('../../assets/card'+this.cardLevel+'.png')
        }
    },
    watch: {
        curTab(v){
            this.x1 = 0
            this.x2 = 0
            this.x3 = 0
            this.showTnTable = false
            this.cardLevel = null

            this.getDetail(v)
        }
    },
    async mounted(){
        this.my = this.$route.query
        var res = await this.ajax('/user/detail', { userId: this.userId }, 'get')
        if(res && res.code == this.successCode){
            this.my = res.data
            var data = res.data
            this.isPJ = data.isPJ
            if(this.isPJ){
                var pj = data.pingjia
                this.x1 = pj.attitude || 0
                this.x2 = pj.discipline || 0
                this.x3 = pj.interaction || 0
                this.pjStr = pj.opinion || ''
            }
        }

        this.curTab = 0
    },
    methods: {
        async getDetail(type){
            var url = type == 0 ? '/user/classes' : (type == 1 ? '/power_test/list' : '/user/pj')
            var res = await this.ajax(url, { userId: this.userId }, 'get')
            if(res && res.code == this.successCode){
                var data = res.data
                if(type == 0){
                    this.course = data
                }else if(type == 1){
                    this.tnList = data
                }else if(type == 2){
                    this.coach = data
                    this.isPJ = data.isPJ
                    var pj = data.pingjia
                    this.x1 = pj.attitude || 0
                    this.x2 = pj.discipline || 0
                    this.x3 = pj.interaction || 0
                    this.pjStr = pj.opinion || ''
                }
            }
        },
        clickXing(key, idx){
            if(this.isPJ) return
            this[key] = idx - 0 + 1
        },
        async pj(){
            if(this.x1 == 0) return this.messageTip('教学态度星级未评')
            if(this.x2 == 0) return this.messageTip('课堂纪律星级未评')
            if(this.x3 == 0) return this.messageTip('互动性星级未评')
            if(this.pjStr.trim() == '') return this.messageTip('评价不能为空')
            var res = await this.ajax('/evaluate/add', {
                userId: this.userId || 1,
                cuserId: this.cuserId || 1,
                attitude: this.x1,
                discipline: this.x2,
                interaction: this.x3,
                opinion: this.pjStr.trim()
            })
            this.messageTip(res.message)
            if(res && res.code == this.successCode){
                this.isPJ = true
                this.pjStr = ''
            }
        }
    }
}
</script>

<style scoped lang="sass">
.main
    padding: 0.6rem

    .cc
        > img
            width: 100%
        > div
            padding: 0.6rem
            .other
                font-size: 0.8rem
                font-weight: bold
            div
                line-height: 0.8rem
                margin: 0.5rem 0
                img
                    // vertical-align: middle
                    margin-right: 0.3rem
                    width: 0.9rem
                    float: left
                span
                    color: #9b9b9b
                    &.span
                        display: block
                        margin-left: 1.2rem
                        margin-top: 0.3rem

    .tn
        .tnDetailImg
            width: 100%
            min-height: 1rem
            background: #f9f9f9

        .each
            position: relative
            height: 4rem
            >div
                padding-top: 0.7rem
                margin-left: 4.2rem
                .time
                    font-size: 0.8rem
                    margin-bottom: 0.2rem
                span
                    color: #9b9b9b
    
    .pj
        background: #f6f6f6
        padding: 1rem

        .item-ctn
            > img
                width: 2.5rem
                height: 2.5rem
                margin-right: 0.5rem
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
