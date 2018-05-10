<template lang="pug">
.list
	.each(v-for="(item, i) in arr" @click="goUrl('/detail', {id: item.id})")
		img(:src="item.image.charAt(0) == '|' ? srPath + item.image.slice(1) : srPath + item.image")
		.name {{item.title}}
		//- .content(v-html="item.marathonArticleData.content")
		.content {{item.marathonArticleData.content | content}}
		.time {{item.createDate}}

	.no-more(v-if="!isMore") 没有更多了~
</template>

<script>

export default {
	name: 'order',
	filters: {
		content(v){ return $(v).text().substr(0, 28) + '...' }
	},
    data () {
		var module = this.$route.query.module;
		// var childId = this.$route.query.childId;
		var pId = this.$route.query.id;
		var type = this.$route.query.type;
        return {
			type,
			// childId,
			pId,
			srPath: window.srPath,
			module,
			page: 1,
			done: true,
			isMore: true,
            arr: [
                // {
				// 	id: 1,
                //     title:'张三张三张三张三张三张三张三张三张三张三张三张三张三张三',
				// 	time: 1524831951993,
				// 	content: 100,
				// 	image: ''
				// },{
				// 	id: 1,
                //     title:'张三张三张三张三张三张三张三张三张三张三张三张三张三张三',
				// 	time: 1524831951993,
				// 	content: 100,
				// 	image: ''
				// },{
				// 	id: 1,
                //     title:'张三张三张三张三张三张三张三张三张三张三张三张三张三张三',
				// 	time: 1524831951993,
				// 	content: 100,
				// 	image: ''
				// },
				// {
                //     name:'李四',
				// 	mobile: '13333333333',
				// 	time: 1524831951993,
				// 	money: 100,
				// 	commision: 10,
				// 	payStatus: false
				// },
				// {
                //     name:'张三',
				// 	mobile: '13333333333',
				// 	time: 1524831951993,
				// 	money: 100,
				// 	commision: 10,
				// 	payStatus: true
                // }
            ]
        }
    },
    mounted(){
		this.list();
		// if(this.type == 2) this.cateList();
		// else this.list();


		$(window).scroll(()=>{
			if($(document).height() - $(document).scrollTop() - $(window).height() == 0){
				this.page++;
				this.list(1);
				// if(this.type == 2) this.cateList(1);
				// else this.list(1);
			}
		})
	},
	methods: {
		// async cateList(type){
		// 	if(!this.isMore) return;
		// 	if(!this.done) return;
		// 	this.done = false;
		// 	var res = await this.ajax('/app/mls/category/'+this.pId, {}, 'get');
		// 	if(res && res.code == 1){
		// 		var list = res.objectData.list || [];
		// 		if(!type) this.arr = list;
		// 		else this.arr = this.arr.concat(list);
		// 		if(list.length < 10) this.isMore = false;
		// 	}
		// 	this.done = true;
		// },
		// async list(type){
		// 	if(!this.isMore) return;
		// 	if(!this.done) return;
		// 	this.done = false;
		// 	var artRes = await this.ajax('/app/mls/articleList', {
		// 		module: this.module,
		// 		pageNo: this.page,
		// 		pageSize: 10
		// 	});
		// 	if(artRes && artRes.code == 1){
		// 		var list = artRes.objectData.list || [];
		// 		if(!type) this.arr = list;
		// 		else this.arr = this.arr.concat(list);
		// 		if(list.length < 10) this.isMore = false;
		// 	}
		// 	this.done = true;
		// },
		async list(concat){
			if(!this.isMore) return;
			if(!this.done) return;
			this.done = false;
			var url = this.type == 2 ? '/app/mls/category/' + this.pId : '/app/mls/articleList';
			var options = {}
			if(this.type != 2){
				options.module = this.module,
				options.pageNo = this.page,
				options.pageSize = 10
			}
			var res = await this.ajax(url, options);
			if(res && res.code == 1){
				var list = res.objectData.list || [];
				if(!concat) this.arr = list;
				else this.arr = this.arr.concat(list);
				if(list.length < 10) this.isMore = false;
			}
			this.done = true;
		}
	}
}
</script>
<style lang="sass" scoped>
@mixin els
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

.list
	padding: 0 0.5rem
.each
	padding: 0.5rem 0
	text-align: left
	overflow: hidden
	border-bottom: 1px solid #ccc
	&:last-child
		border-bottom: none
	img
		width: 3rem
		height: 3rem
		float: left
		margin-right: 0.3rem

	.name
		@include els
		font-size: 0.5rem
		line-height: 2
	
	.content
		@include els
		color: #999
		line-height: 2
		font-size: 0.4rem!important
		height: 0.8rem
		overflow: hidden

	.time
		text-align: right
		margin-top: 0.8rem


</style>

