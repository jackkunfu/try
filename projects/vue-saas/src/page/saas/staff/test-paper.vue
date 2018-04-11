<template lang="pug">
    div(style="height:100%;")
        .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 试卷配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="试卷名称")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.sort")
                                el-option(v-for="(item, i) in sortList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(label="状态")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.statu")
                                el-option(v-for="(item, i) in statuList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(label="最后编辑" class="search-time")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择起始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择截至日期" v-model="searchMsg.endTime" style="width: 100%;")
                    el-button(type="primary" icon="search" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加内容

                mtable(:keys="keys" :ops="operates" :selfApi="selfApi" @edit="edit" :totalPage="totalPage" :curPage="curPage" :tabOp="tabOp")


            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}试卷
                .form-ctn.long
                    el-form(:model="editItem" label-width="80px")
                        el-menu(theme="" :default-active="activeTab" class="el-menu-demo" mode="horizontal" @select="handleSelect")
                            el-menu-item(v-for="(item, i) in tabs" :index="i+''" @click="activeTab = i;" :key="i") {{item}}

                        ul.choose-ctn
                            li(:class="activeTab == 0 ? 'show' : ''")
                                el-form(:model="editItem.basic" label-width="80px")
                                    el-form-item(label="序号")
                                        el-input(v-model="editItem.basic.name" placeholder="9位以内数字")
                                    el-form-item(label="试卷名称")
                                        el-input(v-model="editItem.basic.idx" placeholder="20个以内汉字和数字组合")
                                    el-form-item(label="试卷详情")
                                        el-input(v-model="editItem.basic.desc" placeholder="20个以内汉字和数字组合")
                                    el-form-item(label="所属课件")
                                        el-select(v-model="editItem.basic.courseWare" placeholder="请选择所属课件")
                                            el-option(v-for="(item, i) in courseWares" :label="item.label" :value="item.value" :key="i")
                                    el-form-item(label="答题时间" style="width:400px")
                                        el-input(v-model="editItem.basic.time" class="input-append" placeholder="3位以内数字")
                                            template(slot="append") 分钟

                            li(:class="activeTab == 1 ? 'show' : ''")
                                el-table(:data="testList" ref="multipleTable" style="width:100%" @selection-change="handleSelectionChange")
                                    el-table-column(type="selection" width="55" label="全选")
                                    el-table-column(prop="name" label="考题名称")
                                    el-table-column(prop="score" label="考题分值")

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
            tabs: ['基础配置','考题选择'],
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
            testList: [{name: 'kaotilkatikaoti', score: 10, id: 0}, {name: 'kaotilkatikaoti', score: 10, id: 1}, {name: 'kaotilkatikaoti', score: 10, id: 2}, {name: 'kaotilkatikaoti', score: 10, id: 3}],
            multipleSelection: [],
            courseWares: [],
            searchKeys: ['startTime', 'endTime'],
            editKeys: []
        }
    },
    mounted(){},
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        submit(){
            var testIds = this.multipleSelection.map((v)=>{return v.id}).join(',');
            console.log(testIds)
            if(testIds == ''){
                alert('考题未选');
                return;
            }
        },
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
    .el-menu
        border-bottom: 1px solid #e0e6ed;
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
