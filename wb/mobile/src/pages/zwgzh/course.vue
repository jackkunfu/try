<template lang="pug">
.h100
    // swiper(:list="[1,2,3,4]")

    .sort-item 介绍

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl('/detail', item)")
            .img-ctn.fl
                img(:src="item.img")
            .title.els {{item.name}}
            .sub-title.els {{item.desc}}
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
            list: [{
                img: require('../../assets/logo.png'),
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            },{
                img: require('../../assets/logo.png'),
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            },{
                img: require('../../assets/logo.png'),
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            }]
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
