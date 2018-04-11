import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// https://github.com/bailicangdu/vue2-manage
// import manage from './manage.js' // 老manage路由,暂不用

// 引入saas子路由
import saas from './saas.js' // 账户管理路由
import saas2 from './saas2.js' // 供应商管理路由
import vip from './vip.js' // 会员管理路由
import report from './report.js' // 会员管理路由

import business from './business.js' // 智慧商务路由
import healthManage from './healthManage.js' // 健康管理路由
import employee from './employee.js' // 员工成长路由
import increment from './increment.js' // 增值业务路由

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');  // 登录页
const saasPage = r => require.ensure([], () => r(require('@/page/saas')), 'saas');   // saas router view主页

const index = r => require.ensure([], () => r(require('@/page/index')), 'index'); // 概况

const other = r => require.ensure([], () => r(require('@/page/saas/other/main')), 'other'); // 外链展示

const coming = r => require.ensure([], () => r(require('@/page/saas/coming')), 'coming'); // 敬请期待

const routes = [{
    path: '/',
    component: saasPage,
    children: [{
        path: '/other',
        component: other
    }]
},{
    path: '/login',
    name: 'login',
    component: login
},{
    path: '/coming',
    name: 'coming',
    component: coming
}]

var saasChildrens = [saas, saas2, vip, report, business, employee, healthManage,increment];

saasChildrens.forEach((v)=>{
    v.children.forEach((item)=>{
        routes[0].children.push(item);
    })
})

// console.log(routes)

const router = new Router({
    // mode: 'history',
    routes,
    strict: process.env.NODE_ENV !== 'production'
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
