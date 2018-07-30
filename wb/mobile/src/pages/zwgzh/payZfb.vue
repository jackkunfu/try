<template lang="pug">
.h100(style="text-align:center;background:rgba(0,0,0,0.4);")
    // div(v-if="isWx") 请点击点击右上角在手机浏览器中打开完成支付~
    img.fr(v-if="isWx" src="../../assets/wxjt.png" style="width:8rem;")
    img(v-if="isWx" src="../../assets/wxts.png" style="width:15rem;")

</template>

<script>
    export default {
        name: 'payZfb',
        data () {
            var query = this.$route.query;
            return {
                totalAmount: query.totalAmount,
                orderId: query.orderId,
                isWx: false,
                userId: query.userId
            }
        },
        mounted(){
            var ua = navigator.userAgent.toLowerCase(); 
            if(ua.match(/MicroMessenger/i)=="micromessenger") { 
                this.isWx = true
            } else { 
                location.href = '/api/alipay/wapPay?userId='+this.userId+'&orderId='+this.orderId+'&body=郑武体育篮球训练课'+'&subject=郑武体育篮球训练课&totalAmount='+this.totalAmount  //  跳转支付宝支付
            }
        }
    }
</script>

