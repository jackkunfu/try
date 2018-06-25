import Vue from 'vue'
import Router from 'vue-router'

// 基础管理
const studentList = r => require.ensure([], () => r(require('@/views/studentList')), 'studentList');  // 学员列表
const checkIn = r => require.ensure([], () => r(require('@/views/checkIn')), 'checkIn');  // 点名签到
const bodyTest = r => require.ensure([], () => r(require('@/views/bodyTest')), 'bodyTest');  // 体能测试
const stuLevel = r => require.ensure([], () => r(require('@/views/stuLevel')), 'stuLevel');  // 学员等级

const cocahJudge = r => require.ensure([], () => r(require('@/views/cocahJudge')), 'cocahJudge');  // 教练评价

Vue.use(Router)

var routes = [];

var students = [{   // 学员
  path: '/studentList',
  name: 'studentList',
  component: studentList
},{
  path: '/checkIn',
  name: 'checkIn',
  component: checkIn
},{
  path: '/bodyTest',
  name: 'bodyTest',
  component: bodyTest
},{
  path: '/stuLevel',
  name: 'stuLevel',
  component: stuLevel
}]

var coach = [{     // 教练
  path: '/cocahJudge',
  name: 'cocahJudge',
  component: cocahJudge
},{     // 教练课堂
  path: '/cocahClass',
  name: 'cocahClass',
  component: r => require.ensure([], () => r(require('@/views/cocahClass')), 'cocahClass')
}]

var course = [{     // 课程管理
  path: '/class/desc',
  name: 'classDesc',
  component: r => require.ensure([], () => r(require('@/views/classDesc')), 'classDesc')
},{
  path: '/trainTeam/set',
  name: 'trainTeamSet',
  component: r => require.ensure([], () => r(require('@/views/trainTeamSet')), 'trainTeamSet')
},{
  path: '/card/type',
  name: 'cardType',
  component: r => require.ensure([], () => r(require('@/views/cardType')), 'cardType')
}]

var courseManage = [{  // 排课管理
  path: '/class/set/coach',
  name: 'classSetCoach',
  component: r => require.ensure([], () => r(require('@/views/classSetCoach')), 'classSetCoach')
},{
  path: '/class/set/master',
  name: 'classSetMaster',
  component: r => require.ensure([], () => r(require('@/views/classSetMaster')), 'classSetMaster')
}]

var enroll = [{   // 报名
  path: '/enroll/normal',
  name: 'enrollNormal',
  component: r => require.ensure([], () => r(require('@/views/enrollNormal')), 'enrollNormal')
},{
  path: '/enroll/once',
  name: 'enrollOnce',
  component: r => require.ensure([], () => r(require('@/views/enrollOnce')), 'enrollOnce')
}]

var perm = [{    // 权限路由
  path: '/set/manage',
  name: 'setManage',
  component: r => require.ensure([], () => r(require('@/views/setManage')), 'setManage')
},{
  path: '/set/coach',
  name: 'setCoach',
  component: r => require.ensure([], () => r(require('@/views/setCoach')), 'setCoach')
},{
  path: '/set/class',
  name: 'setClass',
  component: r => require.ensure([], () => r(require('@/views/setClass')), 'setClass')
},{
  path: '/set/sell',
  name: 'setSell',
  component: r => require.ensure([], () => r(require('@/views/setSell')), 'setSell')
}]

routes = routes.concat(students, coach, course, courseManage, enroll, perm)

const router =  new Router({ routes });

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
