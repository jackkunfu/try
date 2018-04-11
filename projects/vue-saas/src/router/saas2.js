const saaClerk = r => require.ensure([], () => r(require('@/page/saas/supplies/clerk.vue')), 'saaClerk'); // 店员管理
const saasShopowner = r => require.ensure([], () => r(require('@/page/saas/supplies/shopowner.vue')), 'saasShopowner'); // 店长管理
const saasStore = r => require.ensure([], () => r(require('@/page/saas/supplies/store.vue')), 'saasStore'); // 门店管理
const saasArea = r => require.ensure([], () => r(require('@/page/saas/supplies/area.vue')), 'saasArea'); // 片区管理
const saasRegion = r => require.ensure([], () => r(require('@/page/saas/supplies/region.vue')), 'saasRegion'); // 区域管理
const saasSupplier = r => require.ensure([], () => r(require('@/page/saas/supplies/supplier.vue')), 'saasSupplier'); // 供应商管理

export default {
    children: [{
        path: '/sa-clerk',
        component: saaClerk
    }, {
        path: '/sa-shopowner',
        component: saasShopowner
    }, {
        path: '/sa-store',
        component: saasStore
    }, {
        path: '/sa-area',
        component: saasArea
    }, {
        path: '/sa-region',
        component: saasRegion
    }, {
        path: '/sa-supplier',
        component: saasSupplier
    }]
}
