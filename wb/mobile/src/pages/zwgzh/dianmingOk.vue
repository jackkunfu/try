<template lang="pug">
.h100
    img(src="../../assets/Sign_icon_chenggong@2x.png")

    .lbtn(@click="goUrl('/banzhuren')") 返回
</template>

<script>
export default {
    name: 'dianmingOk',
    data () {
        return {}
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
