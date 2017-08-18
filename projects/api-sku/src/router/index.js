import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Index from '@/components/index'
import Api from '@/components/api'

import Manage from '@/components/Manage'
import MApp from '@/components/manage/app'
import MUser from '@/components/manage/user'
import MIndex from '@/components/manage/index'
import MDomain from '@/components/manage/domain'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/api',
        name: 'api',
        component: Api
    }, {
        path: '/manage',
        name: 'manage',
        component: Manage,
        children: [{
            path: '/m-index',
            name: 'MIndex',
            component: MIndex,
        }, {
            path: '/m-user',
            name: 'MUser',
            component: MUser,
        }, {
            path: '/m-app',
            name: 'MApp',
            component: MApp,
        }, {
            path: '/m-domain',
            name: 'MDomain',
            component: MDomain,
        }]
    }]
})

router.beforeEach((to, from, next) => {
    // 路由跳转前的钩子
    if (to.path == '/login') {
        next()
    } else {
        if (window.localStorage.pdApiUserId == undefined) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }

    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     if (window.localStorage.pdApiUserId == undefined) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next() // 确保一定要调用 next()
    // }
    // next()
})

export default router