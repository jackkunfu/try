import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'class',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/class')), 'class')
        }
    ]
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
