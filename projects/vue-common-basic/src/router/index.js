import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/components/login')), 'login');  // 登录页
const index = r => require.ensure([], () => r(require('@/components/index')), 'index');  // 登录页

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})

const white = ['/login'];
router.beforeEach((to, from, next) => {
    // 路由跳转前的钩子
    if (white.indexOf(to.path) < 0) {
        if (!localStorage.saasUser) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
