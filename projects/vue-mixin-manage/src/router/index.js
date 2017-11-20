import Vue from "vue";
import Router from "vue-router";
// import { islogin } from '@/api/getData.js'
Vue.use(Router);

// https://github.com/bailicangdu/vue2-manage
// import manage from './manage.js' // 老manage路由,暂不用

// 引入saas子路由
import saas from './saas.js' // 账户管理路由
import saas2 from './saas2.js' // 供应商管理路由
import vip from './vip.js' // 会员管理路由
import report from './report.js' // 会员管理路由
import business from './business.js' // 会员管理路由

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');  // 登录页
const saasPage = r => require.ensure([], () => r(require('@/page/saas')), 'saas');   // saas router view主页

const index = r => require.ensure([], () => r(require('@/page/index')), 'index'); // 概况

const routes = [{
    path: '/',
    component: saasPage,
    children: []
},{
    path: '/login',
    name: 'login',
    component: login
}]

var saasChildrens = [saas, saas2, vip, report, business];

saasChildrens.forEach((v)=>{
    v.children.forEach((item)=>{
        routes[0].children.push(item);
    })
})

const router = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production'
})

const white = ['/login'];
router.beforeEach((to, from, next) => {
    // 路由跳转前的钩子
    if (white.indexOf(to.path) < 0) {
        if (!window.localStorage.pdSaasUserId || window.localStorage.pdSaasUserId == 'undefined') {
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
