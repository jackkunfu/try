<template lang="pug">
.h100
    swiper(:list="lunbotuList")

    .sort-item 课程介绍

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl(item.url)")
            .img-ctn.fl
                img(:src="config.imgPath + item.img")
            .title.els {{item.city}}
            .sub-title {{item.address}}
            //- .sub-title.els 11111111111111111111111111111111111111111111111111111111111111111
            img.icon.fr(src="../../assets/course_icon@2x.png")
            
</template>

<script>
import Swiper from '../part/swiper'
export default {
    name: 'course',
    components: {
       Swiper
    },
    data () {
        return {
            list: [],
            lunbotuList: []
        }
    },
    async mounted(){
        document.title = '课程信息'
        this.getLunboList()
        this.getAreaList()
    },
    methods: {
        goUrl(url){
            location.href = ( url.indexOf('http://') < 0 && url.indexOf('https://') < 0 ) ? 'http://'+url : url
        },
        async getLunboList(){
            var req = await this.ajax('/carousel/list', {
                limit: 100,
                offset: 0
            }, 'get')
            if(req && req.code == this.successCode){
                this.lunbotuList = req.data.rows || []
            }
        },
        async getAreaList(){
            var req = await this.ajax('/course/list', {
                limit: 100,
                offset: 0
            }, 'get')
            if(req && req.code == this.successCode){
                this.list = req.data.rows || []
            }
        }
    }
}
</script>

<style scoped lang="sass">
.h100
    background: #f3f4f3
    .list
        padding: 0 0.7rem

.item
    height: 4.5rem
    position: relative
    .img-ctn
        width: 8rem
        img
            width: 100%
            height: 100%
    .icon
        position: absolute
        right: 0.3rem
        bottom: 0.3rem
        margin-right: 0

    .title, .sub-title
        margin-left: 8.5rem
        width: 7rem

    .title
        margin-top: 0.5rem

    .sub-title
        height: 2rem
        overflow: hidden

.sort-item
    margin: 0.75rem 0.7rem
</style>
