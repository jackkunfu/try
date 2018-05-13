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
}]

var course = [{     // 课程管理
  path: '/course/list',
  name: 'studentList',
  component: studentList
}]
var courseManage = [{  // 排课管理
  path: '/courseManage/list',
  name: 'studentList',
  component: studentList
}]

var enroll = [{   // 报名
  path: '/enroll/list',
  name: 'studentList',
  component: studentList
}]

var perm = [{    // 权限路由
  path: '/perm/manage',
  name: 'permManage',
  component: r => require.ensure([], () => r(require('@/views/permManage')), 'permManage')
},{
  path: '/perm/coach',
  name: 'permCoach',
  component: r => require.ensure([], () => r(require('@/views/permCoach')), 'permCoach')
},{
  path: '/perm/class',
  name: 'permClass',
  component: r => require.ensure([], () => r(require('@/views/permClass')), 'permClass')
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
