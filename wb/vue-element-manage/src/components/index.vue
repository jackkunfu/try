<template lang="pug">
    .ctn
        top.ctn-top
        .ctn-main
            //- 左边导航
            left.main-left

            //- 中间导航
            //- center.main-center

            //- 主显示区域
            router-view.main-view

</template>

<script>
import Top from './part/top'
import Left from './part/left'
// import Center from './part/center'
export default {
    name: 'ctn',
    data () {
        return {
            msg: ''
        }
    },
    components: {
        Top,
        Left,
        // Center
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
