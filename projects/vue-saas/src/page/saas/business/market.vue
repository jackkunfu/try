<template lang="pug">
    div(style="height:100%;")
        div.nav2-ctn
            nav-center(:navData="navaData")

        div(style="padding-left:150px;height:100%;")
            router-view

</template>

<script>
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'market',
    components: {
        navCenter
    },
    data(){
        return {
            navaData: [{
                name: '优惠券相关',
                lists: [{
                    name: '优惠券分类',
                    url: '/market/sa-couponSort'
                }, {
                    name: '优惠券管理',
                    url: '/market/sa-coupon',
                }
                // , {
                //     name: '优惠码管理'
                // }, {
                //     name: '码加券管理'
                // }
                ]
            }, {
                name: '商品产品配置',
                lists: [{
                    name: '商品分类管理',
                    url: '/market/good-category'
                }, {
                    name: '商品管理',
                    url: '/market/good',
                }]
            }, {
                name: '公共配置',
                lists: [{
                    name: '优惠券分类-公共',
                    url: '/market/sa-couponSort-all'
                }]
            }, {
                name: '营销活动',
                lists: [{
                    name: '刮刮卡',
                    url: '/market/coming'
                },{
                    name: '水果连连看',
                    url: '/market/coming'
                },{
                    name: '摇一摇',
                    url: '/market/coming'
                },{
                    name: '幸运大抽奖',
                    url: '/market/coming'
                }]
            },

            // , {
            //     name: 'nav2 木有子集',
            // }, {
            //     lists: [{
            //         name: '优惠券分类管理',
            //         url: '/business/sa-couponSort'
            //     }, {
            //         name: '优惠券管理',
            //         url: '/business/sa-coupon'
            //     }, {
            //         name: '优惠码管理'
            //     }, {
            //         name: '码加券管理'
            //     }]
            // }
            ],
            id: this.$route.query.id
        }
    },
    mounted(){},
    methods: {}
}
</script>

<style lang="sass" scoped>


</style>
