<template lang="pug">
.ctn
    .name 中科
        span 生物
    .box(v-for="(item, i) in list" :key="i" :style="{ background: colors[i], color: item.color ? '#fff' : '#000' }" @click="goUrl('/list', { module: item.module })")
        img(:src="item.image")
        div {{item.name}}
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {
                list: [
                    // { image: '', name: '公司简介' },
                    // { image: '', name: '新闻中心' },
                    // { image: '', name: '市场营销' },
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
                this.list = cateRes.dataList;
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="sass" scoped>
.ctn
    height: 100%;
    background: #AFAFAF;
    padding: 0.3rem;
    text-align: left;

.name
    font-size: 0.6rem;
    line-height: 0.8rem;
    span
        margin-left: 0.1rem;
        font-size: 0.4rem;
        color: red;

.box
    width: 47%;
    margin: 1.5%;
    min-height: 4rem;
    line-height: 0.5rem;
    display: inline-block;
    text-align: center;
    img
        width: 1rem;
        height: 1rem;
        margin: 0.8rem auto;


</style>

