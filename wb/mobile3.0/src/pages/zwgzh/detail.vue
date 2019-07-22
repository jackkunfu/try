<template lang="pug">
div(v-html="htmlStr")
</template>

<script>
export default {
    name: 'detail',
    data () {
        return {
        }
    },
    computed: {
        htmlStr(){
            return this.$route.query.content || ''
        }
    }
}
</script>

<style scoped lang="sass">

</style>
