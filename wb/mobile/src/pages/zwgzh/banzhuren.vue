<template lang="pug">
.banzhuren
    img.topImg(src="../../assets/center_banner@2x.png")

    .sort-item 班主任中心

    .list
        .item(v-for="(item, i) in list" :key="i" @click="goUrl('/dianming', item)")
            img(src="../../assets/center_list_bg@2x.png")
            .title.els {{item.name}}
            .sub-title.els {{item.desc}}
            
</template>

<script>
export default {
    name: 'course',
    data () {
        return {
            list: [{
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            },{
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            },{
                name: '洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区洛克校区',
                desc: 'zhouwuzhouwuzhouwuzhouwuzhouwuzhouwuzhouwu'
            }]
        }
    }
}
</script>

<style scoped lang="sass">
.item
    padding: 0.8rem

.topImg
    width: 100%

.banzhuren
    .list
        padding: 0 0.4rem
        .item
            // background-image: url('../../assets/center_list_bg@2x.png')
            // background-size: 100% 100%
            height: 5.7rem
            padding: 0
            position: relative
            margin-bottom: 0
            img
                position: absolute
                z-index: 0
                left: 0
                top: 0
                width: 100%
            .img-ctn
                width: 3.2rem
                height: 3.2rem
                padding: 0.6rem
                background: #fff
                border-radius: 0.4rem
                img
                    min-height: 0
                    min-width: 0
                    width: 2rem
            .sub-title, .title
                color: #fff
                margin-left: 5.6rem
                width: 8rem
                position: relative
                z-index: 1
            .title
                margin-top: 2rem
                margin-bottom: 0.2rem
                font-size: 0.8rem


</style>
