<template lang="pug">
    div(style="height:100%;")
        .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 等级配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="等级序号")
                            el-input(v-model="searchMsg.idx" placeholder="9位以内数字")

                        el-form-item(label="等级名称")
                            el-input(v-model="searchMsg.levelName" placeholder="输入名称关键字，请勿代符号")

                        el-form-item(label="设店时间" class="search-time")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截至日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加等级

                mtable(:keys="keys" :ops="operates" :selfApi="selfApi" @edit="edit" :totalPage="totalPage" :curPage="curPage"
                    :tabOp="tabOp")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}等级
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="等级名称")
                            el-input(v-model="editItem.name" placeholder="20个以内汉字和数字组合")
                        el-form-item(label="等级序号")
                            el-input(v-model="editItem.idx" placeholder="80字以内" readonly)
                        el-form-item(label="等级简介")
                            el-input(v-model="editItem.desc" type="textarea" placeholder="80字以内")
                        el-form-item(label="培训地点")
                            el-input(v-model="editItem.desc" placeholder="20个以内汉字和数字组合")
                        el-form-item(label="所含课件" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData")

                    .sure.left(@click="submit") 完成
                    .goBack(@click="goBack") 返回



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
            keys: [
                {key: 'id', str: 'ID'},
                {key: 'avator', str: '头像'},
                {key: 'name', str: '名字'},
                {key:'address', str: '地址'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'del', str: '删除'}
            ],
            selfApi: {
                list: ()=>{
                    return this.api.userList;
                },
                del: {type: 'post', url: '/delRole'}
            },
            transferData: [],
            chooseTransfer: [1, 2],    // 已选择到右边穿梭框的序号
            searchKeys: ['startTime', 'endTime'],
            editKeys: []
        }
    },
    mounted(){},
    methods: {
        testRule(){
            return true;
        }
    }
}
</script>

<style lang="sass" scoped>
.el-menu
    background-color: #f9fafc;
.el-form
    //- border-bottom: 1px solid #e0e6ed;
.el-menu-item.is-active
    border-bottom: 5px solid #20a0ff;
ul.choose-ctn
    margin-top: 30px;
    li
        display: none;
        &.show
            display: block;
.goBack
    top: 13px;
</style>
