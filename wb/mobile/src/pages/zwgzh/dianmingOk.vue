<template lang="pug">
.h100
    img(src="../../assets/Sign_icon_chenggong@2x.png")

    .lbtn(@click="goBnzhure") 返回
</template>

<script>
export default {
    name: 'dianmingOk',
    data () {
        return {}
    },
    methods: {
        goBnzhure(){
            this.goUrl('/banzhuren', { userId: this.$route.query.userId })
        }
    }
}
</script>

<style scoped lang="sass">
.h100
    padding: 5rem 1rem 0
    text-align: center
        
img
    width: 6.2rem
    margin: 2.5rem auto
</style>
