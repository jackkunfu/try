// 健康管理


const detection = r => require.ensure([], () => r(require('@/page/saas/healthManage/detection.vue')), 'detection'); // 产品分类管理

// 敬请期待
const coming = r => require.ensure([], () => r(require('@/page/saas/coming.vue')), 'coming'); // 产品分类管理

export default {
    children: [{
        path: '/detection', // 检测数据
        component: detection,
    },{
        path: '/healthPlan', // 健康计划
        component: coming,
    }]
}
