<template lang="pug">
    .nav2
        .nav-box(v-for="item in navs" v-if="!ifOther")
            .title(v-if="item.name") {{item.name}}
            ul(v-if="item.lists")
                li(v-for="nav in item.lists" @click="goUrl(nav.url || '', $event)") {{nav.name}}

        .nav-box(v-for="item in navs" v-if="ifOther")
            ul
                li(@click="emitOther(item)") {{item.name}}

</template>

<script>
export default {
    name: 'nav-center',
    props: ['navData', 'isOther'],
    data(){
        return {
            navs: this.navData,
            ifOther: this.isOther || false
        }
    },
    methods: {
        goUrl(url, event){
            $('li.cur').removeClass('cur');
            $(event.target).addClass('cur')
            if(!url) return
            this.$router.push({ path: url })
        },
        emitOther(item){
            this.$emit('otherChange', item)
        }
    },
    mounted(){
        // console.log(this.navs)
        // console.log(this.ifOther)
    },
    watch:{
        navData(v){
            this.navs = v;
        }
    }
}
</script>

<style lang="sass" scoped>
.nav2
    width: 120px;
    background-image: linear-gradient(to right, #e5e9f2, #e2e4eb);
    float: left;
    height: 100%;
    .nav-box
        border-bottom: 1px solid #ccd5de;
        color: #475669;
        line-height: 36px;
        font-size: 12px;
        margin: 0 18px;
        .title
            font-weight: bold;
        ul
            margin: 0 -18px;
            li
                padding-left: 24px;
                cursor: pointer;
                &.cur
                    background: #fff;
                &:hover
                    background: #fff;

</style>

