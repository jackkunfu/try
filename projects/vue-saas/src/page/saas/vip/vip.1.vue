<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
        //-     nav-center
        .table-main.no-nav

            div.table-ctn(v-if="!isInput")
                .page-title 会员配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="会员姓名")
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.realname")
                        el-form-item(label="会员手机" )
                            el-input(placeholder="输入会员手机号" v-model="searchMsg.mobile")
                        el-form-item(label="会员卡号")
                            el-input(placeholder="输入会员卡号" v-model="searchMsg.vendorMemberId")
                        br
                        el-form-item(label="会员固话")
                            el-input(placeholder="带区号输入11或12位数字" v-model="searchMsg.phone")
                        el-form-item(label="开卡店员" )
                            el-input(placeholder="输入姓名关键字，请勿带符号" v-model="searchMsg.creater")
                        el-form-item(label="店员手机")
                            el-input(placeholder="输入员开卡店员手机号码" v-model="searchMsg.clerkmobile ")
                        br
                        el-form-item( class="search-time" label="开卡时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截止日期" v-model="searchMsg.endTime" style="width: 100%;")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @freeze="freeze")

</template>

<script>
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'role',
    mixins: [mixTable],
    components: {
        navCenter
    },
    data(){
        return {
            isInput: false,
            keys: [
                {key: 'realname', str: '会员姓名'},
                {key: 'idCard', str: '身份证号'},
                {key: 'mobile', str: '手机号'},
                {key:'consumeNumber', str: '消费次数'},
                {key:'amountMoney', str: '消费总金额'},
                {key:'vendorMemberId', str: '会员卡号'},
                {key:'credit', str: '积分'},
                {key:'createdTime', str: '添加时间'},
            ],
            operates: [
                {f: 'freeze', str: '冻结', idKey: 'uid'}
            ],
            selfApi: {
                list: {type: 'get', url: '/user/index'},
                freeze: {type: 'post',url: '/user/freeze'}
            },
            searchMsg: {
                realname: '',
                mobile: '',
                vendorMemberId: '',
                phone: '',
                creater: '',
                clerkmobile: '',
                startTime: '',
                endTime: ''
            },
            // 搜索的各个字段配置
            searchKeys: ['realname', 'mobile','vendorMemberId','phone','creater','clerkmobile','startTime', 'endTime'],
            // 编辑的各个字段配置
            editKeys: ['vendorName', 'code', 'address', 'value']
        }
    },
    mounted(){
        this.$nextTick(async ()=>{})
    },
    methods: {
    }
}
</script>

<style lang="sass" scoped>

</style>
