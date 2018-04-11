<template lang="pug">
.data
    .table-main.no-nav
        img.home(src='http://prd-static-image-files.oss-cn-hangzhou.aliyuncs.com/Saas2/home.png')
        //- | 欢迎使用扑咚saas管理系统
        //- div
            .top
                .box
                    .title 门店统计
                    .main
            .half.left
                .box.staff
                    .title 店员统计
                    .main
                        .ctn
                            .left
                                .sub-title 店员（人）
                                #bar-staff
                            .right
                                .sub-title 上月新增店员数
                                .val {{staffData.newStaff}}
                                .sub-title 上月流失店员数
                                .val {{staffData.goStaff}}
                                .sub-title 店员流失率
                                .val {{staffData.staffGoRate}}
                                .sub-title 店员总计
                                .val {{staffData.staffNum}}

                .box.vip
                    .title 会员统计
                    .main
                .box
                    .title 检测统计
                    .main
            .half.right
                .box
                    .title 优惠券数据
                    .main

</template>

<script>
export default {
    name: "",
    data(){
        return {
            staffData: {
                data: [],
                newStaff: 100,
                goStaff: 66,
                staffGoRate: 1,
                staffNum: 23456
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.data
    //- overflow: auto;
    min-width: 1150px;
    .table-main
        //- min-width: 1000px;
        text-align: center;
        img
            width: 40%;
            overflow: auto;
            margin: auto;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
        >div
            margin: 0 -10px;
            .box
                margin-bottom: 20px;
                margin-left: 10px;
                margin-right: 10px;
                .title
                    line-height: 40px;
                    padding-left: 20px;
                    height: 40px;
                    border-radius: 4px;
                    background-color: #f8f9fa;
                    border: solid 1px #d8e1eb;
                    font-size: 14px;
                    color: #475669;
                .main
                    padding: 40px;
                    background-color: #fff;
                    text-align: center;
                    .ctn
                        text-align: left;
                        min-width: 450px;
                        overflow: hidden;
                        .left
                            width: 70%;
                            border-right: 1px solid #e0e6ed;
                        .right
                            width: 30%;
                            padding-left: 20px;

            .sub-title
                font-size: 12px;
                color: #99a9bf;
            .val
                font-size: 24px;
                font-weight: bold;
                color: #475669;
                line-height: 1;
                margin-bottom: 10px;
            .top
                margin-top: 25px;
            .half
                width: 50%;

</style>
