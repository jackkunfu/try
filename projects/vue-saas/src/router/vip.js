const saasVip = r => require.ensure([], () => r(require('@/page/saas/vip/vip.vue')), 'saasVip'); // 会员管理

export default {
    children: [{
        path: '/sa-vip',
        component: saasVip
    }]
}
