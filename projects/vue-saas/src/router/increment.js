// 增值业务

// 
const monitor = r => require.ensure([], () => r(require('@/page/saas/increment/monitor.vue')), 'monitor'); // 监控中心
const health = r => require.ensure([], () => r(require('@/page/saas/increment/health.vue')), 'health'); // 内容

// 敬请期待
const coming = r => require.ensure([], () => r(require('@/page/saas/coming.vue')), 'coming'); // 敬请期待

export default {
    children: [{
        path: '/monitor',
        component: monitor,
        children: [{
            path: '/monitor/coming',
            component: coming
        }]
    },{
        path: '/health',
        component: health,
        children: [{
            path: '/health/coming',
            component: coming
        }]
    }]
}
