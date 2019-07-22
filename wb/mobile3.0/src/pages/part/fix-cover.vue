<template lang="pug">

    .fix(v-if="str")
        .box-ctn
            .box
                div
                    // img.x(src="../../assets/Sign_icon_w_s@2x.png" @click="showFix=false;$emit('close')")
                    .title {{titleName}}
                    .main
                        slot

</template>

<script>
export default {
    name: 'fix-cover',
    props: ['str', 'titleName'],
    data () {
        return {
            // showFix: this.str
        }
    },

    // 好像不watch  不computed也可以检测到变化
    computed: {
        // showFix(){ return this.str }
    },
    watch: {
        // str(v){
        //     this.showFix = v
        // }
    }
}
</script>

<style scoped lang="sass">
.swiper-ctn
    width: 100%
    position: relative
    .list
        .each-Swiper
            float: left

    .dots
        position: absolute
        top: 0
        left: 0
        width: 100%
        text-align: center
        .dot
            width: 1rem
            height: 1rem
            border-radius: 50%
            background: #fff
            margin: 0.5rem 1rem
            display: inline-block
            &.cur
                background: #48C4F5
</style>