<template lang="pug">
div
    .half 成员姓名
    .half 状态

    div(v-for="(item, i) in stuList" :key="i")
        span {{item.name}}
        img(src="" @click="dianming(1)")
        img(src="item.img" @click="dianming(0)")
            
</template>

<script>
export default {
    name: 'course',
    data () {
        return {
            stuList: [1,2,3]
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
    
.half
    width: 50%
</style>
