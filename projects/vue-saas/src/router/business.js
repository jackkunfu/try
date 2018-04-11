// 智慧商务

// 营销中心
const market = r => require.ensure([], () => r(require('@/page/saas/business/market.vue')), 'market'); // 营销中心首页
const saasCoupon = r => require.ensure([], () => r(require('@/page/saas/business/coupon.vue')), 'saasCoupon'); // 优惠券管理
const saasCouponSort = r => require.ensure([], () => r(require('@/page/saas/business/couponSort.vue')), 'saasCouponSort'); // 优惠券分类管理
const saasCouponSortAll = r => require.ensure([], () => r(require('@/page/saas/business/couponSortAll.vue')), 'saasCouponSortAll'); // 优惠券分类管理
const good = r => require.ensure([], () => r(require('@/page/saas/business/good.vue')), 'saasCouponSort'); // 产品管理
const goodCategory = r => require.ensure([], () => r(require('@/page/saas/business/goodCategory.vue')), 'saasCouponSort'); // 产品分类管理

// 统一消息中心
const newsCenter = r => require.ensure([], () => r(require('@/page/saas/business/newsCenter.vue')), 'newsCenter'); // 统一消息中心

// 推荐中心

// 敬请期待
const coming = r => require.ensure([], () => r(require('@/page/saas/coming.vue')), 'coming'); // 产品分类管理

export default {
    children: [{
        path: '/market',
        component: market,
        children: [{
            path: '/market/sa-coupon',
            component: saasCoupon
        },{
            path: '/market/sa-couponSort',
            component: saasCouponSort
        },,{
            path: '/market/sa-couponSort-all',
            component: saasCouponSortAll
        },{
            path: '/market/good-category',
            component: goodCategory
        },{
            path: '/market/good',
            component: good
        },{
            path: '/market/coming',
            component: coming
        }]
    },{
        path: '/newsCenter',
        component: newsCenter,
        children: [{
            path: '/newsCenter/sa-coupon',
            component: saasCoupon
        },{
            path: '/newsCenter/coming',
            component: coming
        }]
    }]


    // children: [{
    //     path: '/sa-coupon',
    //     component: saasCoupon
    // },{
    //     path: '/sa-couponSort',
    //     component: saasCouponSort
    // }]
}
