<template lang="pug">
    div(style="height:100%;")
        .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 课程配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="课程名称")
                            el-input(v-model="searchMsg.name" placeholder="输入课程关键字，请勿代符号")

                        el-form-item(label="所属等级")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.level")
                                el-option(v-for="(item, i) in levelList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(label="课程属性")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.type")
                                el-option(v-for="(item, i) in typeList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(label="最后编辑" class="search-time")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截至日期" v-model="searchMsg.endTime" style="width: 100%;")

                    el-button(type="primary" icon="search" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加课程

                //- mtable(:keys="keys" :ops="operates" :selfApi="selfApi" @edit="edit" :totalPage="totalPage" :curPage="curPage")
                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" @edit="edit" :tabOp="tabOp")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}课程
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="课程名称")
                            el-input(v-model="editItem.name" placeholder="20个以内汉字和数字组合")
                        el-form-item(label="课程简介")
                            el-input(v-model="editItem.desc" type="textarea" placeholder="80字以内")
                        el-form-item(label="讲师姓名")
                            el-input(v-model="editItem.teachName" placeholder="20个以内汉字和数字组合")
                        el-form-item(label="培训地点")
                            el-input(v-model="editItem.address" placeholder="20个以内汉字和数字组合")
                        el-form-item(label="培训时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择日期" v-model="editItem.startTime" style="width: 100%;")
                            el-col(class="line" :span="2") -
                            el-col(:span="11")
                                el-time-picker(type="fixed-time" placeholder="选择时间" v-model="editItem.endTime" style="width: 100%;")
                        el-form-item(label="培训时长")
                            el-input(v-model="editItem.desc" placeholder="10个以内数字")
                        el-form-item(label="所含课件" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData")

                    .sure.left(@click="submit") 完成
                    .goBack(@click="goBack") 返回


</template>

<script>
// table 公共逻辑 mixins
import mixTable from '@/basic/mixins/mixin.js'

// table列表组件
import mtable from '@/page/public/table.vue'
import navCenter from '@/page/public/nav-center.vue'

export default {
    name: 'role',
    mixins: [mixTable],
    components: {
        mtable,
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
            typeList: [],    //  属性下拉列表数据
            levelList: [],   // 状态下拉列表数据
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
