<template lang="pug">
div.about-us
	div(v-html="")  {{article}}

    

</template>

<script>

export default {
	name: 'HelloWorld',
    data () {
        return {
			article: '遥忆有家，牵惹情怀，冷冬觅影，早随风儿吹拂，悄然遁隐，俏丽嫣然大地彤，百花开放姹紫红；盎然春意水润浓，惟见人间笑意融。'
        }
    },
    mounted(){
	},
	methods: {
		goOther(src){
			this.$router.push({path: src})
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

