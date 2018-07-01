<template lang="pug">
.h100
    div
        .item
            span(style="font-weight:bold") 订单名称：{{order.name}}
        .item
            span 订单金额：{{order.fee}}
        .item
            span 地区：{{order.train.city}}
        .item
            span 训练营：{{order.train.name}}
        .item
            span 卡种：{{order.card.card}}
        .item
            span 训练频次：{{order.frequency}}

    div
        .item(@click="payWay=1")
            img(src="../../assets/wx.png")
            span 微信支付
            .fr
                img(src="../../assets/choose.png" v-if="payWay==1")
                img(src="../../assets/nochoose.png" v-else)

        .item(@click="payWay=2")
            img(src="../../assets/zfb.png")
            span 支付宝支付
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
                    name: '郑武体育篮球训练课', fee: '3000元', city: '杭州', train: {}, cardType: '半年卡', times: '每周两次', card: {}
                },
                payWay: 0,
                userId: query.userId,
                trainId: query.trainId,
                orderId: query.orderId
            }
        },
        async mounted(){
            var res = await this.ajax('/order/detail', { id: this.orderId }, 'post')
            if(res && res.code == this.successCode){
                this.order = res.data
                this.order.fee = this.order.fee/100 + '元'
                this.order.name = '郑武体育篮球训练课'
            }
        },
        methods: {
            async pay(){
                if(this.payWay == 0) return this.messageTip('请选择支付方式');
                var options = {
                    orderId: this.orderId,
                    body: '郑武体育篮球训练课',
                    subject: '郑武体育篮球训练课',
                    // totalAmount: this.order.fee
                    totalAmount: 1
                }
                if(this.payWay == 1){
                    // location.href = '/api/index/toOauth'   //  跳转显示微信验证
                    var wxres = await this.ajax('/wxpay/webPay', options)
                    if(wxres && wxres.code == this.successCode){
                        alert(JSON.stringify(wxres))
                        // $('body').append(wxres.data);
                    }else{
                        // this.messageTip(wxres.message)
                        location.href = '/api/index/toOauth'   //  跳转显示微信验证
                    }

                }else if(this.payWay == 2){
                    location.href = '/api/alipay/wapPay?orderId='+this.orderId+'&body=郑武体育篮球训练课'+'&subject=郑武体育篮球训练课&totalAmount=1'   //  跳转支付宝支付

                    // var res = await this.ajax('/alipay/wapPay', options)
                    // if(res && res.code == this.successCode){
                    //     $('body').append(res.data);
                    // }else this.messageTip(res.message)
                }

                

                return

                // 不跳到个人中心，跳到选课页面
                // setTimeout(()=>{ this.goUrl('/my') }, 1000)
                // setTimeout(()=>{ this.goUrl('/timesChoose', { cardId: this.order.cardId, userId: this.userId, trainId: this.trainId }) }, 1000)
                setTimeout(()=>{ this.goUrl('/myset', { cardId: this.order.cardId, userId: this.userId, trainId: this.trainId }) }, 1000)
                
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

