<template lang="pug">
div
    Swiper(:list="[1,2,3,4]")
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
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style scoped lang="sass">
</style>
