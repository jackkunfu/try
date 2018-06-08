<template lang="pug">
div
    img(src="topImg")

    .sort-item 班主任中心

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl('/dianming', item)")
            .img-ctn
                img(:src="item.img")
            .title.els {{item.name}}
            .sub-title.els {{item.desc}}
            // img(src="../../assets/right.png")
            
</template>

<script>
export default {
    name: 'course',
    data () {
        return {
            list: [],
            topImg: ''
        }
    }
}
</script>

<style scoped lang="sass">
.item
    padding: 0.3rem
</style>
