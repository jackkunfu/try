<template lang="pug">
.ctn
    ul
        li(v-for="(item,i) in lists")
            .front(style="")
                h1
            .end
</template>
   

<script>
export default {
    name: 'm-index',
    data () {
        return {
            lists: [
                {title:'系统管理', color: '#336666', icon:'', desc:'1.用户管理,2.其他'},
                {title:'Api', color: '#336666', icon:'', desc:'1.api查询,2.api调试,3.api-sku'}
            ]
        }
    }
}
</script>

<style lang="sass">
    ul
        li
</style>
    