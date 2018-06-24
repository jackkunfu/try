<template lang="pug">
.swiper-ctn
    .swiper(:style="{width: listWidth}")
        .each-swiper(v-for="(item, i) in list" :key="i" :style="{width: oneWidth}")
            img(:src="config.imgPath+item.img")

    .dots
        .dot(v-for="(item, i) in list" :class="{'cur': curItem == i}" :key="i" @click="")
</template>

<script>
export default {
    name: 'Swiper',
    props: ['list', 'time'],
    data () {
        return {
            curItem: null,
            t: this.time ? this.time*1000 : 1000
        }
    },
    computed: {
        listWidth(){ return this.list.length*100+'%' },
        oneWidth(){ return 1/this.list.length*100+'%' }
    },
    watch: {
        list(v){
            if(v && v.length > 0){
                this.curItem = 0
            }
        },
        curItem(v){
            if(v === null) return
            
        }
    },
    mounted(){
        if(this.list.length <= 1) return
        setInterval(()=>{
            console.log(1)
            if(this.curItem < this.list.length) this.curItem = this.curItem - 0 + 1
            else this.curItem = 0
            
            $('.swiper').animate({'margin-left':'-100%'}, this.t, ()=>{
                var first = this.list.splice(0, 1)[0]
                $('.swiper').css({'margin-left':'0'})
                this.list.splice(this.list.length, 0, first)
            })
        }, this.t)
    }
}
</script>

<style scoped lang="sass">
.swiper-ctn
    width: 100%
    position: relative
    overflow: hidden
    .swiper
        
        .each-swiper
            float: left
            height: 6rem
            overflow: hidden
            img
                width: 100%

    .dots
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        text-align: center
        .dot
            width: 0.5rem
            height: 0.5rem
            border-radius: 50%
            background: #fff
            margin: 0.25rem
            display: inline-block
            &.cur
                background: #48C4F5
</style>