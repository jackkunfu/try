<template lang="pug">
div
	.box
		.name {{item.title}}
		.time {{item.createDate | time}}
		.content(v-html="item.marathonArticleData.content")

	.share(v-if="wxReady")
		.btn 分享到朋友圈

</template>

<script>
export default {
	name: 'detail',
	filters: {
		time(v){ return (v+'').split(' ')[0] }
	},
    data() {
		var module = this.$route.query.module;
        return {
			module,
			srPath: window.srPath,
			item: {
				// id: 1,
				title: '--',
				createDate: '--',
				marathonArticleData: {
					content: '暂无内容'
				}
			},
			wxReady: false
        }
    },
    async mounted(){
		var query = this.$route.query;
		if(query.type == 2){
			this.getOne()
		}else{
			var res = await this.ajax('/app/mls/article/get', {
				id: this.$route.query.id
			});
			if(res && res.code == 1){
				if(res.objectData){
					this.item = res.objectData || {}
					this.$nextTick(()=>{
						this.img();
					})
				}else{
					this.getOne()
				}
			}
		}
		
		// if(this.$route.query.type == 2){
		// 	this.getOne();
		// }else{
		// 	// this.wxinit();
		// 	var res = await this.ajax('/app/mls/article/get', {
		// 		id: this.$route.query.id
		// 	});
		// 	if(res && res.code == 1){
		// 		this.item = res.objectData || {}
		// 		this.$nextTick(()=>{
		// 			this.img();
		// 		})
		// 	}
		// }
	},
	methods: {
		wxinit(){
			var sc = document.createElement('script')
			sc.src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
			document.body.appendChild(sc);

			wx.config({
				appId: ''
			})
		},
		async getOne(type){
			var artRes = await this.ajax('/app/mls/articleList', {
				module: this.module,
				pageNo: this.page,
				pageSize: 10
			})
			if(artRes && artRes.code == 1){
				var list = artRes.objectData.list || [];
				this.item = list[0];
			}
			this.$nextTick(()=>{
				this.img();
			})
		},
		img(){
			$('.content img').each( (i, el) =>{
				var src = $(el).attr('src');
				$(el).attr('src', this.srPath + src)
				$(el).css({'max-width': '100%', display: 'block', 'margin': '5px'})
			})
		}
	}
}
</script>
<style lang="sass" scoped>
.box
	padding: 0.3rem;
	border-radius: 3px;
	background: #ccc;
	text-align: left;
	margin: 0.3rem;
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

