import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: r => require.ensure([], () => r(require('@/pages/jxjk/login')), 'login')
        },
        {
            path: '/sign',
            name: 'sign',
            component: r => require.ensure([], () => r(require('@/pages/jxjk/sign')), 'sign')
        },
        {
            path: '/baoming',
            name: 'baoming',
            component: r => require.ensure([], () => r(require('@/pages/jxjk/baoming')), 'baoming')
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
