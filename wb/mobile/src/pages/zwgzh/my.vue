<template lang="pug">
.h100
    .top
        img(src="../../assets/user_bg@2x.png")
        .item
            img.fl(:src="touxiang")
            .title
                span {{my.name}}

            .sub-title(@click="goUrl('/myset', my)") 完善个人信息
                span >

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
            div(v-if="course.length == 0") 暂无信息或者暂未开卡
            div(v-for="(item, i) in course")
                div {{item.card.card}}
                .other 其他详细信息
                div 上课时间：
                    img(src="../../assets/user_icon_time@2x.png")
                div(style="margin-left: 5.3rem;margin-top:-1.3rem")
                    div(v-for="(it, i) in item.times") {{'周'+week[it.week]+' '+it.begin+'~'+it.end}}
                    
                div 训练频次：{{item.frequency}}
                    img(src="../../assets/user_icon_pinlv@2x.png")
                div
                    img(src="../../assets/user_icon_information@2x.png")
                    span 开卡时间：{{item.openDate}}
                    span.span 到期时间：{{item.endDate}}

        div.tn(v-if="curTab == 1")
            img(v-if="tnList.length == 0" src="../../assets/user_pic_wushuju@2x.png" style="width:50%;margin-top:1rem;")
            div(v-else)
                div(v-if="!showTnTable")
                    .each(v-for="(item, i) in tnList" @click="showTnCurImg(item)")
                        img.img-bg(src="../../assets/user_list_bg@2x.png")
                        div
                            .time {{item.testDate | split}}
                            // span {{item.time || 'xxxx-xx-xx'}}
                div(v-else)
                    img.tnDetailImg(:src="tnDetailImg" @click="showTnTable=false")

        div.pj(v-if="curTab == 2")
            .item-ctn(v-for="(item, i) in jlList" @click="showPjDetail(item)")
                img.fl(src="../../assets/pjedit.png")
                .fr(v-if="true")
                    span 去评价
                    img.fr(src="../../assets/rs.png")
                .fr(v-else)
                    span 已评价
                    img.fr(src="../../assets/ys.png")

                .title {{item.createDate | split}}
                .sub-title {{item.plan.coachs ? item.plan.coachs.map(v=>v.name).join(',') : ''}}
                
                .clear

            .fix(v-if="isShowPjCtn")
                .box
                    div(v-if="curCoachs.length == 0") 暂无教练
                    div(v-else)
                        .half(v-for="(item, i) in curCoachs" @click="curJLIdx=i" :class="curJLIdx==i?'cur':''") {{item.name}}
                        .clear
                        div(v-for="(item, i) in curCoachs" v-if="curJLIdx==i")
                            .item-ctn
                                img.fl(:src="config.imgPath+item.avatar")
                                .title 今日教练：{{item.name}}
                                .sub-title {{item.createtime | split}}
                                .clear

                            .xing
                                .eachactiveStarImg
                                    span 教学态度：
                                    img(v-for="(it, i) in [1,1,1,1,1]" @click="clickXing('x1', i, item)" :src="i<item.x1 ? activeStarImg : starImg")
                                .each
                                    span 课堂纪律：
                                    img(v-for="(it, i) in [1,1,1,1,1]" @click="clickXing('x2', i, item)" :src="i<item.x2 ? activeStarImg : starImg")
                                .each
                                    span 互动性：
                                    img(v-for="(it, i) in [1,1,1,1,1]" @click="clickXing('x3', i, item)" :src="i<item.x3 ? activeStarImg : starImg")

                            textarea(placeholder="对教练的意见或建议" v-model="item.pjStr")

                            .lbtn(v-if="item.evaluate" @click="pj(item)") 提交评价
                            .lbtn.disable(v-else) 已评价
                            .lbtn(@click="closePj") 关闭

</template>

<script>
export default {
    name: 'my',
    data () {
        return {
            week: ['一', '二', '三', '四', '五', '六', '日'],
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
            pjStr: '',
            jlList: [],
            isShowPjCtn: false,
            curCoachs: [],
            curJLIdx: -1,
            curPjPlanId: null
        }
    },
    computed: {
        cardImg(){
            if(this.cardLevel === null) return ''
            return require('../../assets/card'+this.cardLevel+'.png')
        },
        touxiang(){
            return this.my.avatar ? this.config.imgPath + this.my.avatar : require('../../assets/touxiang.png')
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
        closePj(){
            this.isShowPjCtn = false;
            this.curCoachs = []
        },
        showPjDetail(item){
            this.isShowPjCtn = true
            this.curPjPlanId = item.planId
            if(item.plan.coachs && item.plan.coachs.length > 0){
                this.curCoachs = item.plan.coachs
                this.curCoachs.forEach(el => {
                    if(el.evaluate){
                        this.$set(el, 'x1', el.evaluate.attitude)
                        this.$set(el, 'x2', el.evaluate.discipline)
                        this.$set(el, 'x3', el.evaluate.interaction)
                    }else{
                        this.$set(el, 'x1', 0)
                        this.$set(el, 'x2', 0)
                        this.$set(el, 'x3', 0)
                    }
                })
                this.curJLIdx = 0
            }
        },
        showTnCurImg(item){
            this.showTnTable = true
            this.tnDetailImg = this.config.imgPath + item.content
        },
        async getDetail(type){
            var url = type == 0 ? '/user/classes' : (type == 1 ? '/power_test/list' : '/sign/list')
            var options = { userId: this.userId }
            if(type != 0){
                options.limit = 1000
                options.offset = 0
            }
            
            var res = await this.ajax(url, options, 'get')
            if(res && res.code == this.successCode){
                var data = res.data
                if(type == 0){
                    this.course = data
                }else if(type == 1){
                    this.tnList = data.rows
                }else if(type == 2){
                    this.jlList = data.rows
                    // this.coach = data
                    // this.isPJ = data.isPJ
                    // var pj = data.pingjia
                    // this.x1 = pj.attitude || 0
                    // this.x2 = pj.discipline || 0
                    // this.x3 = pj.interaction || 0
                    // this.pjStr = pj.opinion || ''
                }
            }
        },
        clickXing(key, idx, item){
            
            // if(this.isPJ) return
            // this[key] = idx - 0 + 1

            item[key] = idx - 0 + 1
        },
        async pj(item){
            console.log(item)
            if(item.x1 == 0) return this.messageTip('教学态度星级未评')
            if(item.x2 == 0) return this.messageTip('课堂纪律星级未评')
            if(item.x3 == 0) return this.messageTip('互动性星级未评')
            if(item.pjStr.trim() == '') return this.messageTip('评价不能为空')
            var res = await this.ajax('/evaluate/add', {
                userId: this.userId,
                cuserId: item.id,
                planId: this.curPjPlanId,
                attitude: item.x1,
                discipline: item.x2,
                interaction: item.x3,
                opinion: item.pjStr.trim()
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
.half
    width: 50%
    display: inline-block
    text-align: center
    line-height: 1.3rem
    padding: 0.6rem 0
    color: #646464
    background: #fff
    &.cur
        color: #48C4F5

.fix
    .box
        padding: 0 0.5rem 0.5rem
        .item-ctn
            .title
                background: #fff
                color: #333
                text-align: left
                line-height: 1rem

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
        text-align: center
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
                    margin-top: 0.7rem
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
                width: 3.8rem
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
