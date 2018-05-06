<template lang="pug">
div.set-up
	div(v-for="(item,i) in setList" @click="goOther(item.src,item.type)")
		span.left {{item.name}}
		img(:src="item.url").right

    

</template>

<script>

export default {
	name: 'HelloWorld',
    data () {
        return {
			setList: [
				{url: require('../img/more@3x.png'),name:'修改密码',src:'/',type:'isFogt'},
				{url: require('../img/more@3x.png'),name:'关于我们',src:'/aboutUs',type:''},
			]
        }
    },
    mounted(){
	},
	methods: {
		goOther(src,type){
			this.goUrl(src, {type});
			// this.$router.push({path: src})
		}
	}
}
</script>
<style lang="sass" scoped>
.set-up
	font-size: 0.4rem;
	div
		height: 1.3rem;
		line-height: 1.3rem;
		padding: 0 0.5rem;
		background: #eee;
		margin-bottom: 0.1rem;
		img
			width: 0.2rem;
			position: relative;
			top: 0.5rem;
</style>

