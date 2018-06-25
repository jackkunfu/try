<template lang="pug">
.h100
    swiper(:list="lunbotuList")

    .sort-item 课程介绍

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl(item.url)")
            .img-ctn.fl
                img(:src="config.imgPath + item.img")
            .title.els {{item.city}}
            //- .sub-title.els {{item.desc}}
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

.item
    height: 6rem
</style>
