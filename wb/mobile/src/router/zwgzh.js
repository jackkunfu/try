import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/course',
            name: 'course',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/course')), 'course')
        },
        {
            path: '/detail',
            name: 'detail',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/detail')), 'detail')
        },
        {
            path: '/banzhuren',
            name: 'banzhuren',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/banzhuren')), 'banzhuren')
        },
        {
            path: '/dianming',
            name: 'dianming',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/dianming')), 'dianming')
        },
        {
            path: '/dianmingOk',
            name: 'dianmingOk',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/dianmingOk')), 'dianmingOk')
        },
        {
            path: '/login',
            name: 'login',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/login')), 'login')
        },
        {
            path: '/my',
            name: 'my',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/my')), 'my')
        },
        {
            path: '/myset',
            name: 'myset',
            component: r => require.ensure([], () => r(require('@/pages/zwgzh/myset')), 'myset')
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
