<template lang="pug">
.h100
    .bg
        img(src="../../assets/apply_bg@2x.png")

    // .top
        img(src="../../assets/activity_logo@2x.png")

    .enroll
        .each
            span 选择地区
            select(v-model="item.city" :class="item.city==''?'':'ff'")
                option(v-for="(it, i) in citys" :value="it.city" :label="it.city" :key="i")
            img(src="../../assets/xia.png")

        .each
            span 选择训练营
            select(v-model="item.trainId" :class="item.trainId==''?'':'ff'")
                option(v-for="(it, i) in cityTrains" :value="it.id" :label="it.name" :key="i")
            img(src="../../assets/xia.png")

        .each
            span 选择卡种
            select(v-model="item.cardId" :class="item.cardId==''?'':'ff'")
                option(v-for="(it, i) in trainCards" :value="it.id" :label="it.card" :key="i")
            img(src="../../assets/xia.png")

        .each
            span 选择训练频次
            select(v-model="item.frequency" :class="item.frequency==''?'':'ff'")
                option(v-for="(it, i) in weekTimes" :value="it.frequency" :label="it.frequency" :key="i")
            img(src="../../assets/xia.png")
        
        .each
            span 接待课程顾问
            select(v-model="item.sale" :class="item.sale==''?'':'ff'")
                option(v-for="(it, i) in sells" :value="it.id" :label="it.name" :key="i")
            img(src="../../assets/xia.png")

        .tip 注意：付款完成后请根据您的卡种选择上课时间并完善学员信息

        .money 费用合计：
            span {{item.fee | fee}}
            | 元
        
        .btn(@click="baoming") 支付报名

</template>

<script>
    export default {
        name: 'Baoming',
        data () {
            var query = this.$route.query;
            return {
                item: {
                    city: '', trainId: '', cardId: '', frequency: '', sale: '', fee: ''
                },
                citys: [],
                cityTrains: [],
                trainCards: [],
                sells: [],
                userId: query.userId,
                weekTimes: []
            }
        },
        filters: {
            fee(v){
                if(!v) return 0
                return v/100
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
                this.item.cardId = ''
                if(!v) return
                this.trainCards = await this.getAllCard(v)
            },
            async 'item.cardId'(v){
                this.weekTimes = []
                this.item.frequency = ''
                this.item.fee = ''
                if(!v) return
                this.weekTimes = await this.getAllCardTimes(v)
            },
            async 'item.frequency'(v){
                var i = this.weekTimes.map(v=>v.frequency).indexOf(v)
                this.item.fee = this.weekTimes[i].price
            }
        },
        async mounted(){
            this.citys = await this.getAllExistCity()
            this.sells = await this.getAllSeller()
        },
        methods: {
            async baoming(){
                this.item.userId = this.userId
                var res = await this.ajax('/order/add', this.item)
                if(res && res.code == this.successCode){
                    this.item.orderId = res.data.id
                    this.goUrl('/pay', this.item)
                }
            },
            async loginFun(){
                var item = this.item;
                if(item.city == '') return this.messageTip('地区未选~');
                if(item.city == '') return this.messageTip('训练营未选~');
                if(item.city == '') return this.messageTip('卡种未选~');
                if(item.city == '') return this.messageTip('训练频次未选~');
                if(item.city == '') return this.messageTip('课程顾问~');

                var res = await this.ajax('/api/user/login', this.item);
                if(res && res.status == 200){
                    var data = res.data;
                    // this.goUrl('/myset', { tb_tk: data.token, tb_userInfo: JSON.stringify(data.tbUser) });
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

</style>

