<template lang="pug">
div
    div(v-for="(item, i) in stuList" :key="i")
        span {{item.name}}
        img(src="item.img" @click="dianming(1)")
        img(src="item.img" @click="dianming(0)")
            
</template>

<script>
export default {
    name: 'course',
    data () {
        return {
            stuList: []
        }
    },
    methods: {
        dianming(type){
            
        }
    }
}
</script>

<style scoped lang="sass">
.item
    padding: 0.3rem
</style>
