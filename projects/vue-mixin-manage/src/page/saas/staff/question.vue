<template lang="pug">
    div(style="height:100%;")
        .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 考题配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="所属分类")
                            el-select(placeholder="请选择" auto-complete="off" v-model="searchMsg.sort")
                                el-option(v-for="(item, i) in sortList" :label="item.label" :value="item.value" :key="i")

                        el-form-item(label="是否考试")
                            el-radio-group(v-model="searchMsg.isTest")
                                el-radio(label="是")
                                el-radio(label="否")

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
                    el-button(type="success" @click="add" ref="add") 添加考题

                mtable(:keys="keys" :ops="operates" :selfApi="selfApi" @edit="edit" :totalPage="totalPage" :curPage="curPage" :tabOp="tabOp")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}考题
                .form-ctn
                    //- el-form(:model="editItem" label-width="80px")
                    //-     el-menu(theme="" :default-active="activeTab" class="el-menu-demo" mode="horizontal" @select="handleSelect")
                    //-         el-menu-item(v-for="(item, i) in tabs" :index="i+''" @click="activeTab = i;" :key="i") {{item}}
                    //-
                    //- ul.choose-ctn
                    //-     li(:class="activeTab == 0 ? 'show' : ''")
                    //-
                    //-     li(:class="activeTab == 1 ? 'show' : ''")
                    //-         //- el-table(:data="testList" ref="multipleTable" style="width:100%" @selection-change="handleSelectionChange")
                    //-         //-     el-table-column(type="selection" width="55" label="全选")
                    //-         //-     el-table-column(prop="name" label="考题名称")
                    //-         //-     el-table-column(prop="score" label="考题分值")
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="题目")
                            el-input(v-model="editItem.name" type="textarea" placeholder="")
                        el-form-item(label="选项A")
                            el-input(v-model="editItem.valueA" placeholder="")
                        el-form-item(label="选项B")
                            el-input(v-model="editItem.valueB" placeholder="")
                        el-form-item(label="选项C")
                            el-input(v-model="editItem.valueC" placeholder="")
                        el-form-item(label="选项D")
                            el-input(v-model="editItem.valueD" placeholder="")
                        el-form-item(label="正确答案")
                            el-checkbox-group(v-model="editItem.answer")
                                el-checkbox(label="A" name="type")
                                el-checkbox(label="B" name="type")
                                el-checkbox(label="C" name="type")
                                el-checkbox(label="D" name="type")
                        el-form-item(label="该题分值")
                            el-input(v-model="editItem.mark" placeholder="9位以内数字")
                        .border-line
                    .next(@click="submit") 添加下一道考题
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
            isInput: false,
            curOperate: '新增',
            activeTab: '0',
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
            sortList: [],    //  分类下拉列表数据
            statuList: [],   // 状态下拉列表数据
            searchKeys: ['startTime', 'endTime', 'isTest'],
            editKeys: ['answer']
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

.next
    width: 180px;
    height: 36px;
    border-radius: 4px;
    background-color: #13ce66;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-top: 20px;
    cursor: pointer;

.sure
    margin-left: 0;
.goBack
    top: 13px;
</style>
