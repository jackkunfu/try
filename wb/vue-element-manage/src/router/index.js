import Vue from 'vue'
import Router from 'vue-router'

// 基础管理
const studentList = r => require.ensure([], () => r(require('@/components/studentList')), 'studentList');  // 学员列表
const user = r => require.ensure([], () => r(require('@/components/views/user')), 'user');  // 用户
const place = r => require.ensure([], () => r(require('@/components/views/place')), 'place');  // 小区

Vue.use(Router)

const router =  new Router({
  routes: [{
    path: '/student/list',
    name: 'studentList',
    component: studentList
  },{
    path: '/place',
    name: 'place',
    component: place
  },{
    path: '/user',
    name: 'user',
    component: user
  }]
})

const white = ['/'];
router.beforeEach((to, from, next) => {
    // 路由跳转前的钩子
    // if (white.indexOf(to.path) < 0) {
    //     if (!localStorage.saasUser) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next()
    // }

    next()
})

export default router
