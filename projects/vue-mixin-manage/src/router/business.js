// 智慧商务
const saasCoupon = r => require.ensure([], () => r(require('@/page/saas/business/coupon.vue')), 'saasCoupon'); // 优惠券管理
const saasCouponSort = r => require.ensure([], () => r(require('@/page/saas/business/couponSort.vue')), 'saasCouponSort'); // 优惠券管理

export default {
    children: [{
        path: '/sa-coupon',
        component: saasCoupon
    },{
        path: '/sa-couponSort',
        component: saasCouponSort
    }]
}
