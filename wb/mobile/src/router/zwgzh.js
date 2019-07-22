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
            redirect: '/course',
            children: [
                {
                    path: '/course',
                    name: 'course',
                    component: () => import('@/pages/zwgzh/course')
                },
                {
                    path: '/detail',
                    name: 'detail',
                    component: () => import('@/pages/zwgzh/detail')
                },
                {
                    path: '/banzhuren',
                    name: 'banzhuren',
                    component: () => import('@/pages/zwgzh/banzhuren')
                },
                {
                    path: '/dianming',
                    name: 'dianming',
                    component: () => import('@/pages/zwgzh/dianming')
                },
                {
                    path: '/dianmingOk',
                    name: 'dianmingOk',
                    component: () => import('@/pages/zwgzh/dianmingOk')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/pages/zwgzh/login')
                },
                {
                    path: '/baoming',
                    name: 'baoming',
                    component: () => import('@/pages/zwgzh/baoming')
                },
                {
                    path: '/pay/pay',
                    name: 'pay',
                    component: () => import('@/pages/zwgzh/pay')
                },
                {
                    path: '/payZfb',
                    name: 'payZfb',
                    component: () => import('@/pages/zwgzh/payZfb')
                },
                {
                    path: '/tiyanbaoming',
                    name: 'tiyanbaoming',
                    component: () => import('@/pages/zwgzh/tiyanbaoming')
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/pages/zwgzh/my')
                },
                {
                    path: '/myset',
                    name: 'myset',
                    component: () => import('@/pages/zwgzh/myset')
                },{
                    path: '/timesChoose',
                    name: 'timesChoose',
                    component: () => import('@/pages/zwgzh/timesChoose')
                }
            ]
        },
        
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
