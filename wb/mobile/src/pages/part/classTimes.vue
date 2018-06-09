<template lang="pug">

    .h100
        .item-ctn(v-for="(item, i) in list" @click="item.check=!item.check")
            img.fl(src="../../assets/choose_icon_basketball@2x.png")
            .title {{item.name}}
            .sub-title {{item.time}}
            img.fr(src="../../assets/choose_btn_s@2x.png" v-if="item.check")
            img.fr(src="../../assets/choose_btn_n@2x.png" v-else)

        .next(@click="$emit('next', list)") 下一步

</template>

<script>
export default {
    name: 'classTimes',
    props: ['str', 'titleName'],
    data () {
        return {
            list:[{
                name: '周一上午',
                time: '9:00 - 11:00'
            },{
                name: '周一上午',
                time: '9:00 - 11:00'
            },{
                name: '周一上午',
                time: '9:00 - 11:00'
            }]
        }
    },
    mounted(){
        this.list.forEach(v=>{
            this.$set(v, 'check', false)
        })
    }
}
</script>

<style scoped lang="sass">
.h100
    background-image: url('../../assets/choose_bg@2x.png')
    background-size: 100% 100%
    position: absolute
    z-index: 20

.item-ctn
    margin: 1rem
    background: #fff
    height: 3.2rem
    padding: 0.5rem 1rem
    img.fl
        width: 2rem
        margin-right: 1rem
    >div
        width: 10rem
    .title
        font-size: 0.8rem
        color: #4a4a4a
    img.fr
        float: right
        width: 1.1rem
        position: relative
        top: -1.5rem

.next
    width: 12rem
    margin: 1.5rem auto
    line-height: 1.8rem
    background: #fff
    color: #48C4F5
    text-align: center
    border-radius: 0.2rem
</style>