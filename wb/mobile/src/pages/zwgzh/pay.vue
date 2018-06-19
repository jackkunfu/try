<template lang="pug">
.h100
    div
        .item
            span(style="font-weight:bold") 订单名称：{{order.name}}
        .item
            span 订单金额：{{order.fee}}
        .item
            span 地区：{{order.city}}
        .item
            span 训练营：{{order.train}}
        .item
            span 卡种：{{order.cardType}}
        .item
            span 卡种：{{order.times}}

    div
        .item(@click="payWay=1")
            img(src="../../assets/wx.png")
            span 微信支付
            .fr
                img(src="../../assets/choose.png" v-if="payWay==1")
                img(src="../../assets/nochoose.png" v-else)

        .item(@click="payWay=2")
            img(src="../../assets/zfb.png")
            span 微信支付
            .fr
                img(src="../../assets/choose.png" v-if="payWay==2")
                img(src="../../assets/nochoose.png" v-else)

        
    .btn(@click="pay") 确认支付

</template>

<script>
    export default {
        name: 'pay',
        data () {
            var query = this.$route.query;
            return {
                order: {
                    name: '郑武体育篮球训练课', fee: '3000元', city: '杭州', train: '小龙训练营', cardType: '半年卡', times: '每周两次'
                },
                payWay: 0
            }
        },
        mounted(){
            
        },
        methods: {
            pay(){
                if(this.payWay == 1){

                }else if(this.payWay == 2){

                }
                this.messageTip('支付成功')
                this.goUrl('/my')
            }
        }
    }
</script>

<style lang="sass" scoped>
.h100
    background: #f3f3f3
    >div
        background: #fff
        margin-bottom: 0.7rem
        .item
            height: 2.7rem
            // line-height: 2.7rem
            font-size: 0.8rem
            border-bottom: 0.05rem solid #eee
            margin-bottom: 0
            padding: 0.8rem 1.4rem
            color: #6f6f6f

            img
                vertical-align: middle
                width: 1rem
                margin-right: 0.5rem
                position: relative
                top: -0.1rem

    .btn
        width: 16rem
        margin: 1rem auto
        line-height: 2.1rem
        background: #48C4F5
        font-size: 0.8rem
        text-align: center
        color: #fff
        border-radius: 0.2rem
</style>

