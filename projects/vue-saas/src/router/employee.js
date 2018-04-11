// 员工成长

// 培训晋升
const promot = r => require.ensure([], () => r(require('@/page/saas/employee/promot.vue')), 'promot'); // 培训晋升

// 内容中心
const content = r => require.ensure([], () => r(require('@/page/saas/employee/content.vue')), 'content'); // 内容
const newsSort = r => require.ensure([], () => r(require('@/page/saas/staff/newsSort.vue')), 'newsSort'); // 内容分类
const news = r => require.ensure([], () => r(require('@/page/saas/staff/news.vue')), 'news'); // 内容配置

// 敬请期待
const coming = r => require.ensure([], () => r(require('@/page/saas/coming.vue')), 'coming'); // 敬请期待

export default {
    children: [{
        path: '/promot',
        component: promot,
        children: [{
            path: '/promot/coming',
            component: coming
        }]
    },{
        path: '/content',
        component: content,
        children: [{
            path: '/content/coming',
            component: coming
        },{
            path: '/sa-newsSort',
            component: newsSort
        },{
            path: '/sa-news',
            component: news
        }]
    }]
}
