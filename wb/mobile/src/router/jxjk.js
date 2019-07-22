import Vue from 'vue'
import Router from 'vue-router'
import APP from '@/App.vue'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'app',
            component: APP,
            redirect: '/login',
            children: [
                { path: '/login', name: 'login', component: () => import('@/pages/jxjk/login') },
                { path: '/sign', name: 'sign', component: () => import('@/pages/jxjk/sign') },
                { path: '/baoming', name: 'baoming', component: () => import('@/pages/jxjk/baoming') }
            ]
        }
    ]
})

// const white = ['/'];
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
