<template lang="pug">
    .ctn {{msg}}
</template>
   
<script>
export default {
    name: 'demo',
    data () {
        return {
            msg: 'this is a demo page'
        }
    }
}
</script>

<style lang="sass">
    .ctn
        width: 1200px;
        margin: 0 auto;
        background: #FFF;
</style>
    