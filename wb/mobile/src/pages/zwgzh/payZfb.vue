<template lang="pug">
.h100
    img(v-if="isWx" src="")

</template>

<script>
    export default {
        name: 'pay',
        data () {
            var query = this.$route.query;
            return {
                totalAmount: query.totalAmount,
                orderId: query.orderId,
                isWx: false
            }
        },
        mounted(){
            var ua = navigator.userAgent.toLowerCase(); 
            if(ua.match(/MicroMessenger/i)=="micromessenger") { 
                this.isWx = true
            } else { 
                location.href = '/api/alipay/wapPay?orderId='+this.orderId+'&body=郑武体育篮球训练课'+'&subject=郑武体育篮球训练课&totalAmount='+this.totalAmount  //  跳转支付宝支付
            }
        }
    }
</script>

