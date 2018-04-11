<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center(:navData="navaData" :isOther="true" @otherChange="otherChange")

        div(style="padding-left:270px;height:100%;")
            iframe(:src="newUrl" style="width:100%;height:100%;")

</template>

<script>
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'bussiness',
    components: {
        navCenter,
    },
    data(){
        return {
            navaData: JSON.parse(this.$route.query.nav),
            newUrl: ''
        }
    },
    mounted(){
        this.$nextTick(()=>{
            setTimeout(()=>{
                if(this.$route.path == '/other') $('.nav-left li.el-submenu').last().addClass('is-opened').find('.el-menu').show();
                // else $('.nav-left li.el-submenu').last().removeClass('is-opened').find('.el-menu').hide();
            }, 500)
        })

        // window.onhashchange = ()=>{
        //     if(this.$route.path == '/other'){
        //         this.navaData = JSON.parse(this.$route.query.nav)
        //     }
        // }
    },
    methods: {
        otherChange(item){
            this.newUrl = item.url;
        }
    }
}
</script>

<style lang="sass" scoped>


</style>
