<template lang="pug">
div
    swiper(:list="[1,2,3,4]")

    .sort-item 介绍

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl('/detail', item)")
            .img-ctn
                img(:src="item.img")
            .title.els {{item.name}}
            .sub-title.els {{item.desc}}
            // img(src="../../assets/icon-right.png")
            
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
            list: []
        }
    }
}
</script>

<style scoped lang="sass">

</style>
