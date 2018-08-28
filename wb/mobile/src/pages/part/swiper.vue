<template lang="pug">
.swiper-ctn
    .swiper(:style="{width: listWidth}")
        .each-swiper(
            v-for="(item, i) in list" :key="i" 
            :style="{width: oneWidth}" 
            :class="curItem==i?'show':'hide'"
            @click="locationTo(item.url)"
        )
            img(:src="config.imgPath+item.img")

    .dots
        .dot(v-for="(item, i) in list" :class="{'cur': curItem == i}" :key="i" @click="curItem=i")
</template>

<script>
export default {
    name: 'Swiper',
    props: ['list', 'time'],
    data () {
        return {
            curItem: null,
            t: this.time ? this.time*1000 : 2000,
            timer: null
        }
    },
    beforeDestroy(){
        clearInterval(this.timer)
    },
    computed: {
        listWidth(){ return this.list.length*100+'%' },
        oneWidth(){ return 1/this.list.length*100+'%' }
    },
    watch: {
        list(v){
            if(!v) return
            if(v.length > 0) this.curItem = 0
            if(v.length > 1) this.swiper()
        }
    },
    methods: {
        locationTo(url){
            location.href = url
        },
        swiper(){
            this.timer = setInterval(()=>{
                if(this.curItem < this.list.length - 1) this.curItem = this.curItem - 0 + 1
                else this.curItem = 0
                // $('.swiper').animate({'margin-left':'-100%'}, this.t, ()=>{
                    
                //     var first = this.list.splice(0, 1)[0]
                //     this.list.splice(this.list.length, 0, first)
                //     // $('.swiper').css({'margin-left':'0'})
                //     if(this.curItem < this.list.length) this.curItem = this.curItem - 0 + 1
                //     else this.curItem = 0
                // })
            }, this.t-0 + 2000)
        }
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
            height: 7rem
            overflow: hidden
            transition: all 0.5s
            &.show
                display: block
            &.hide
                display: none
            img
                width: 100%
                height: 7rem

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
                // background: #48C4F5
                background: #81B7E9
</style>