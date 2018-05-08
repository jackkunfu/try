<template lang="pug">
div
	.box
		.name {{item.title}}
		.time {{item.createDate | time}}
		//- img(:src="item.image.charAt(0) == '/' ? srPath + item.image.slice(1) : srPath + item.image")
		.content(v-html="item.marathonArticleData.content")

</template>

<script>
export default {
	name: 'detail',
	filters: {
		time(v){ return v.split(' ')[0] }
	},
    data() {
        return {
			srPath: window.srPath,
			item: {
				// id: 1,
				title: '',
				createDate: '',
				content: '',
				image: ''
			}
        }
    },
    async mounted(){
		var res = await this.ajax('/app/mls/article/get', {
			id: this.$route.query.id
		});
		if(res && res.code == 1){
			this.item = res.objectData || {}
		}
	},
	methods: {
		
	}
}
</script>
<style lang="sass" scoped>
.box
	padding: 0.3rem;
	border-radius: 3px;
	backgrond: #ccc;
	text-align: left;
	padding: 0.3rem;
	.name
		font-size: 0.5rem;
		line-height: 1.2;
		padding: 0.2rem 0;
	.time
		font-size: 0.4rem;
		color: #999;
		line-height: 1.5;
	img
		width: 100%;
		height: 4rem;
		margin: 0.1rem 0;
</style>

