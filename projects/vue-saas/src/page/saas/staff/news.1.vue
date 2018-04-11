<template lang="pug">
    div(style="height:100%;")
        //- .nav2-ctn
            nav-center
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 内容配置
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

                mtable(:keys="keys" :ops="operates" :selfApi="selfApi" @edit="edit" :totalPage="totalPage" :curPage="curPage"
                    :tabOp="tabOp")

            .edit-ctn(v-if="isInput")
                .page-title {{curOperate}}内容
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
                        el-form-item(label="序号")
                            el-input(v-model="editItem.idx" placeholder="")
                        .border-line
                        el-form-item(label="选项A")
                            el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
                                i(class="el-icon-upload")
                                div(class="el-upload__text") 将文件拖到此处，或
                                    em 点击上传
                        el-form-item(label="内容标题")
                            el-input(v-model="editItem.valueB" placeholder="20个以内的汉字和数字组合")
                        el-form-item(label="内容详情")
                            el-input(v-model="editItem.valueC" type="textarea" placeholder="80字以内")
                        el-form-item(label="内容类型")
                            el-radio-group(v-model="editItem.type")
                                el-radio(label="图片")
                                el-radio(label="URL")
                                el-radio(label="视频")
                                el-radio(label="图文")
                        el-form-item(label="阅读量")
                            el-input(v-model="editItem.valueD" placeholder="9位以内数字")
                        el-form-item(label="收藏量")
                            el-input(v-model="editItem.mark" placeholder="9位以内数字")
                        el-form-item(label="所属分类" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData")
                        .border-line

                    .sure.left(@click="submit") 完成
                    .set-ques.left(@click="submit") 完成去配置对应考题
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
            isInput: false,
            //- curOperate: '新增',
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
            editKeys: ['answer', 'type']
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

.set-ques
    width: 180px;
    height: 36px;
    border-radius: 4px;
    background-color: #13ce66;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-top: 20px;
    cursor: pointer;
    display: inline-block;

.sure
    margin-left: 0;
    margin-right: 20px;;
    display: inline-block;
.goBack
    top: 13px;
</style>
