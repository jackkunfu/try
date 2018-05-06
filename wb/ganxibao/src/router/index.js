import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('@/components/index')), 'index');   // 首页
const list = r => require.ensure([], () => r(require('@/components/list')), 'list');   // 列表
const detail = r => require.ensure([], () => r(require('@/components/detail')), 'detail');   // 详情
const marketing = r => require.ensure([], () => r(require('@/components/marketing')), 'marketing');   // 会员中心
const setUp = r => require.ensure([], () => r(require('@/components/setUp')), 'setUp');   // 设置
const aboutUs = r => require.ensure([], () => r(require('@/components/aboutUs')), 'aboutUs');   // 关于我们

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },{
		path: '/list',
		name: 'list',
		component: list
	},{
		path: '/detail',
		name: 'detail',
		component: detail
	},{
		path: '/marketing',
		name: 'marketing',
		component: marketing
	},{
		path: '/setUp',
		name: 'setUp',
		component: setUp
	},{
		path: '/aboutUs',
		name: 'aboutUs',
		component: aboutUs
	}]
})
