const index = r => require.ensure([], () => r(require('@/page/index')), 'index'); // 概况

const saasUser = r => require.ensure([], () => r(require('@/page/saas/account/user.vue')), 'saasUser'); // 用户管理
const saasRole = r => require.ensure([], () => r(require('@/page/saas/account/role.vue')), 'saasRole'); // 角色管理

// 员工 staff
const position = r => require.ensure([], () => r(require('@/page/saas/staff/position.vue')), 'position'); // 岗位管理
const level = r => require.ensure([], () => r(require('@/page/saas/staff/level.vue')), 'level'); // 等级管理
const course = r => require.ensure([], () => r(require('@/page/saas/staff/course.vue')), 'course'); // 课程管理
const courseware = r => require.ensure([], () => r(require('@/page/saas/staff/courseware.vue')), 'courseware'); // 课件管理
const testPaper = r => require.ensure([], () => r(require('@/page/saas/staff/test-paper.vue')), 'testPaper'); // 试卷管理
const question = r => require.ensure([], () => r(require('@/page/saas/staff/question.vue')), 'question'); // 考题管理

const news = r => require.ensure([], () => r(require('@/page/saas/staff/news.vue')), 'news'); // 内容管理
const newsSort = r => require.ensure([], () => r(require('@/page/saas/staff/newsSort.vue')), 'newsSort'); // 内容分类管理

// 健康
const saClass = r => require.ensure([], () => r(require('@/page/saas/health/class.vue')), 'saClass'); // 健康讲堂


export default {
    children: [{
        path: '/',
        component: index
    }, {
        path: '/sa-user',
        component: saasUser
    }, {
        path: '/sa-role',
        component: saasRole
    }, {
        path: '/sa-class',
        component: saClass
    }, {
        path: '/position',
        component: position
    }, {
        path: '/level',
        component: level
    }, {
        path: '/course',
        component: course
    }, {
        path: '/courseware',
        component: courseware
    }, {
        path: '/testPaper',
        component: testPaper
    }, {
        path: '/question',
        component: question
    }, {
        path: '/news',
        component: news
    }, {
        path: '/newsSort',
        component: newsSort
    }]
}
