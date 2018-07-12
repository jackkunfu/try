<template lang="pug">
.h100
    .bg
        img(src="../../assets/apply_bg@2x.png")

    //- .top
        img(src="../../assets/activity_logo@2x.png")

    .enroll
        .each
            //- span 选择地区
            //- select(v-model="item.city" :class="item.city==''?'':'ff'")
            select(v-model="item.city" class="ff")
                option(value="" label="请选择地区") 请选择地区
                option(v-for="(it, i) in citys" :value="it.city" :label="it.city" :key="i") {{it.city}}
            img(src="../../assets/xia.png")

        .each
            //- span 选择训练营
            select(v-model="item.trainId" :class="item.trainId==''?'':'ff'")
                option(value="" label="选择训练营") 选择训练营
                option(v-for="(it, i) in cityTrains" :value="it.id" :label="it.name" :key="i") {{it.name}}
            img(src="../../assets/xia.png")

        .each
            //- span 选择卡种
            select(v-model="item.cardId" :class="item.cardId==''?'':'ff'")
                option(value="" label="选择卡种") 选择卡种
                option(v-for="(it, i) in trainCards" :value="it.id" :label="it.card" :key="i") {{it.card}}
            img(src="../../assets/xia.png")

        .each
            //- span 选择训练频次
            select(v-model="item.frequency" :class="item.frequency==''?'':'ff'")
                option(value="" label="选择训练频次") 选择训练频次
                option(v-for="(it, i) in weekTimes" :value="it.frequency" :label="it.frequency" :key="i") {{it.frequency}}
            img(src="../../assets/xia.png")

        
        .each(@click="chooseTimes=true;")
            span 上课时间
            div(style="text-align:right;padding-right:2.1rem;line-height:1.3rem;color:#888;") {{chooseTimesStr}}
        
        .each
            //- span 接待课程顾问
            select(v-model="item.sale" :class="item.sale==''?'':'ff'")
                option(value="" label="选择课程顾问") 选择课程顾问
                option(v-for="(it, i) in sells" :value="it.id" :label="it.name" :key="i") {{it.name}}
            img(src="../../assets/xia.png")

        .tip 注意：付款完成后请根据您的卡种选择上课时间并完善学员信息

        .money 费用合计：
            span {{item.fee | fee}}
            | 元
        
        .btn(@click="baoming") 支付报名

    class-times(v-show="chooseTimes" @next="next" @close="chooseTimes=false;" :times="timeList" :ids="chooseTimeIdS")

</template>

<script>
    'use strict';
    import classTimes from '../part/classTimes'
    export default {
        name: 'Baoming',
        components: {
            classTimes
        },
        data () {
            var query = this.$route.query;
            return {
                openId: query.openId || '',
                week: ['一', '二', '三', '四', '五', '六', '日'],
                chooseTimes: false,
                item: {
                    city: '', trainId: '', cardId: '', frequency: '', sale: '', fee: ''
                },
                citys: [],
                cityTrains: [],
                trainCards: [],
                sells: [],
                userId: query.userId,
                weekTimes: [],
                timeList: [],
                chooTimeList: []
            }
        },
        filters: {
            fee(v){
                if(!v) return 0
                return v/100
            }
        },
        computed: {
            chooseTimesStr(){
                if(this.chooTimeList.length < 1) return ''
                var week = this.chooTimeList[0].week
                var begin = this.chooTimeList[0].begin
                var end = this.chooTimeList[0].end
                var str = this.weekTimeStr(week, begin, end)
                return this.chooTimeList.length > 1 ? str + '...' : str
            },
            chooseTimeIdS(){
                if(this.chooTimeList.length < 1) return ''
                return this.chooTimeList.map(v=>v.id).join(',')
            }
        },
        watch: {
            async 'item.city'(v){
                this.cityTrains = []
                this.item.trainId = ''
                if(!v) return
                this.cityTrains = await this.getAllTrain(v)
            },
            async 'item.trainId'(v){
                this.trainCards = []
                this.timeList = []
                this.chooTimeList = []
                this.item.cardId = ''
                if(!v) return
                this.trainCards = await this.getAllCard(v)
                this.timeList = await this.getAllTrainTimes(v)
            },
            async 'item.cardId'(v){
                this.weekTimes = []
                this.item.frequency = ''
                this.item.fee = ''
                if(!v) return
                this.weekTimes = await this.getAllCardTimes(v)
            },
            async 'item.frequency'(v){
                if(!v) return
                var i = this.weekTimes.map(el=>el.frequency).indexOf(v)
                this.item.fee = this.weekTimes[i].price
            }
        },
        async mounted(){
            this.citys = await this.getAllExistCity()
            this.sells = await this.getAllSeller()
        },
        methods: {
            weekTimeStr(week, begin, end){
                return '周' + this.week[week] + ' ' + begin + '~' + end
            },
            next(data){
                this.chooseTimes = false
                this.chooTimeList = data
            },
            async baoming(){
                var item = Object.assign({}, this.item);
                if(item.city == '') return this.messageTip('地区未选~');
                if(item.trainId == '') return this.messageTip('训练营未选~');
                if(item.cardId == '') return this.messageTip('卡种未选~');
                if(item.frequency == '') return this.messageTip('训练频次未选~');
                if(this.chooTimeList.length == 0) return this.messageTip('上课时间没选~');

                var freq = this.allFrequency.indexOf(item.frequency)
                if(this.chooTimeList.length > (freq+1)) return this.messageTip('训练频次为'+this.allFrequency[freq]+'最多选'+(freq+1)+'个上课时间');

                if(item.sale == '') return this.messageTip('课程顾问未选~');
                item.userId = this.userId
                item.trainTimes = JSON.stringify(this.chooTimeList)
                item.openId = this.openId
                var res = await this.ajax('/order/add', item)
                if(res && res.code == this.successCode){
                    item.orderId = res.data.id
                    this.goUrl('/pay/pay', item)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.h100
    background: #f3f3f3

.bg
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: 0
    img
        width: 100%
        height: auto

.top
    text-align: center
    img
        width: 70%
        margin: 2rem auto

.enroll
    margin: 13rem auto 0
    width: 16rem

.tip
    font-size: 0.6rem
    color: #c6c6c6
    padding: 0 0.5rem
    margin-top: -0.5rem

.money
    text-align: center
    font-size: 0.8rem
    margin-top: 1rem
    span
        color: #48C4F5

select
    padding: 0 0.8rem
    width: 100%
    color: #9b9b9b
    line-height: 1.4rem
    background-size: 6%
    position: relative
    z-index: 1
    background: none
    &.ff
        background: #fff

.each
    // border-bottom: 1px solid #e3e3e3
    padding: 0.4rem 0
    margin-bottom: 0.9rem
    position: relative
    background: #fff
    height: 2.1rem
    > span
        position: absolute
        left: 0.8rem
        top: 0
        line-height: 2.1rem
        color: #9b9b9b

    img
        position: absolute
        z-index: 2
        width: 0.9rem
        top: 0.8rem
        right: 0.8rem

    input
        border: none
        color: #9b9b9b
        line-height: 1rem
        width: 6rem

.login-tip
    width: 15rem
    margin: 0 auto
    color: #48C4F5
    img
        width: 0.88rem
        float: left
        margin-right: 0.3rem

.btn
    width: 15rem
    margin: 1rem auto
    background: #48C4F5
    line-height: 2.1rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    border-radius: 0.4rem
    position: relative
    z-index: 1

</style>

