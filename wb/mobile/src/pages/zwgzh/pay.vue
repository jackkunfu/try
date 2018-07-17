<template lang="pug">
.h100
    div
        .item
            span(style="font-weight:bold") 订单名称：{{order.name}}
        .item
            span 订单金额：{{order.feeStr}}
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
                openId: query.openId,
                order: {
                    name: '郑武体育篮球训练课', fee: '', city: '杭州', train: {}, cardType: '半年卡', times: '每周两次', card: {}, feeStr: ''
                },
                payWay: 0,
                userId: query.userId,
                trainId: query.trainId,
                orderId: query.orderId,
                wxdata: {}
            }
        },
        async mounted(){
            var res = await this.ajax('/order/detail', { id: this.orderId }, 'post')
            if(res && res.code == this.successCode){
                this.order = res.data
                this.order.feeStr = this.order.fee/100 + '元'
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
                    totalAmount: this.order.fee
                }
                if(this.payWay == 1){
                    options.openId = this.openId
                    var wxres = await this.ajax('/wxpay/webPay', options)
                    if(wxres && wxres.code == this.successCode){
                        this.wxdata = JSON.parse(wxres.data)
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
                                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                            }
                        }else{
                            this.onBridgeReady();
                        }
                    }
                }else if(this.payWay == 2){
                    options.userId = this.userId
                    this.goUrl('/payZfb', options)

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
                
            },
            onBridgeReady(){
                var data = this.wxdata
                WeixinJSBridge.invoke('getBrandWCPayRequest', data,
                    res => {
                        // alert(JSON.stringify(res))
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                            this.goUrl('/myset', { cardId: this.order.cardId, userId: this.userId, trainId: this.trainId })
                        }
                    }
                )
                // {
                //     "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
                //     "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
                //     "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
                //     "package":"prepay_id=u802345jgfjsdfgsdg888",     
                //     "signType":"MD5",         //微信签名方式：     
                //     "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
                // }
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

