<template lang="pug">
.swiper-ctn
    .list(:style="{width: listWidth}")
        .each-swiper(v-for="(item, i) in list" :key="i" :style="{width: oneWidth}")
            //- img(:src="item")
            div {{i}}

    .dots
        .dot(v-for="(item, i) in list" :class="{'cur': curItem == i}" :key="i")
</template>

<script>
export default {
    name: 'Swiper',
    props: ['list', 'time'],
    data () {
        return {
            curItem: 0
        }
    },
    computed: {
        allWidth(){ return this.list.length*100+'%' },
        oneWidth(){ return 1/this.list.length }
    },
    watch: {
        // curItem(v){
        //     $('.list').animate({'margin-left':'-100%'}, this.time)
        //     var first = this.list.splice(0, 1)[0]
        //     this.list.splice(this.list.length-1, 1, first)
        // }
    },
    mounted(){
        this.$nextTick(()=>{
            if(this.list.length<=1) return
            // setInterval(()=>{
            //     this.curItem++
            //     if(this.curItem == this.list.length) this.curItem = 0
            // }, this.time || 1000)
        })
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