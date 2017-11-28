// 报表
const formArea = r => require.ensure([], () => r(require('@/page/saas/report/f-area.vue')), 'formArea'); // 片区
const formRegion = r => require.ensure([], () => r(require('@/page/saas/report/f-region.vue')), 'formRegion'); // 区域
const formStore = r => require.ensure([], () => r(require('@/page/saas/report/f-store.vue')), 'formStore'); // 门店
const formStoreCheck = r => require.ensure([], () => r(require('@/page/saas/report/f-store-check.vue')), 'formStoreCheck'); // 门店检测
const formStaff = r => require.ensure([], () => r(require('@/page/saas/report/f-staff.vue')), 'formStaff'); // 店员
const formStaffDone = r => require.ensure([], () => r(require('@/page/saas/report/f-staff-done.vue')), 'formStaffDone'); // 店员业绩
const formSupplier = r => require.ensure([], () => r(require('@/page/saas/report/f-supplier.vue')), 'formSupplier'); // 供应商
const formCoupon = r => require.ensure([], () => r(require('@/page/saas/report/f-coupon.vue')), 'formCoupon'); // 优惠券
const formVip = r => require.ensure([], () => r(require('@/page/saas/report/f-vip.vue')), 'formVip'); // 会员
const formDataCheck = r => require.ensure([], () => r(require('@/page/saas/report/f-check-data.vue')), 'formDataCheck'); // 检测数据
const formCard = r => require.ensure([], () => r(require('@/page/saas/report/f-card.vue')), 'formCard'); // 开卡报表
const formCardDone = r => require.ensure([], () => r(require('@/page/saas/report/f-card-done.vue')), 'formCardDone'); // 开卡报表

// 操作日志
const opeLog = r => require.ensure([], () => r(require('@/page/saas/report/ope-log.vue')), 'opeLog'); // 操作日志

export default {
    children: [{
        path: '/form-region',
        component: formRegion
    }, {
        path: '/form-area',
        component: formArea
    }, {
        path: '/form-store',
        component: formStore
    }, {
        path: '/form-store-check',
        component: formStoreCheck
    }, {
        path: '/form-staff',
        component: formStaff
    }, {
        path: '/form-staff-done',
        component: formStaffDone
    }, {
        path: '/form-supplier',
        component: formSupplier
    }, {
        path: '/form-coupon',
        component: formCoupon
    }, {
        path: '/form-vip',
        component: formVip
    }, {
        path: '/form-check-data',
        component: formDataCheck
    }, {
        path: '/form-card',
        component: formCard
    }, {
        path: '/form-card-done',
        component: formCardDone
    }, {
        path: '/sa-log',
        component: opeLog
    }]
}