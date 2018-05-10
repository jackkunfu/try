<template lang="pug">
.ctn
    .name 中科
        span 生物
    .box(v-for="(item, i) in list" :key="i" :style="{ background: colors[i], color: i%4==3 || i%4 == 0 ? '#fff' : '#000' }" @click="go(item)")
        img(:src="item.isAllImage ? item.image : srPath + item.image")
        div {{item.name}}
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {
                srPath: window.srPath,
                list: [
                    // { image: '', name: '公司简介' },
                    // { image: '', name: '新闻中心' },
                    { image: require('../assets/scyx.png'), name: '市场营销', url: '/marketing', isAllImage: true },
                    // { img: '', name: '治疗实例' },
                    // { img: '', name: '质量保障' },
                    // { img: '', name: '人才引进' },
                    // { img: '', name: '科技创新' },
                    // { img: '', name: '合作机构' },
                    // { img: '', name: '联系我们' }
                ],
                colors: ['#499ECC', '#fff', '#fff', '#09F41D', '#DB6972', '#fff', '#fff', '#F2D813', '#968CAF']
            }
        },
        async mounted(){
            var cateRes = await this.ajax('/app/mls/categoryList', {});
            if(cateRes && cateRes.code == 1){
                var scyx = { image: require('../assets/scyx.png'), name: '市场营销', url: '/marketing', isAllImage: true }
                var list = cateRes.dataList
                list.splice(2, 0, scyx);
                console.log(list)
                this.list = list;
            }
        },
        methods: {
            go(item){
                if(item.url) return this.goUrl(item.url)
                var url = item.appView == 0 ? '/list' : '/detail';
                this.goUrl(url, {
                    module: item.module,
                    // childId: item.childList[0].id,
                    id: item.id,
                    type: item.type || 1
                })
            }
        }
    }
</script>

<style lang="sass" scoped>
.ctn
    height: 100%
    background: #AFAFAF
    padding: 0.3rem
    text-align: left

.name
    font-size: 0.6rem
    line-height: 0.8rem
    font-weight: 600
    color: #fff
    span
        margin-left: 0.1rem
        font-size: 0.4rem
        color: red

.box
    width: 47%
    margin: 1.5%
    // min-height: 4rem
    line-height: 0.5rem
    display: inline-block
    text-align: center
    padding: 0.5rem
    img
        width: 1.5rem
        height: 1.5rem
        margin-bottom: 0.4rem


</style>

