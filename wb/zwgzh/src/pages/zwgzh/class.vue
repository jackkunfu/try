<template lang="pug">
div
    swiper(:list="[1,2,3,4]")

    .sort-item 介绍

    .list
        .item(v-for="(item, i) in list" :key="i")
            .img-ctn
                img(:src="item.img")
            .title.els
            .sub-title.els
            
</template>

<script>
import Swiper from '../part/swiper'
export default {
    name: 'index',
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
