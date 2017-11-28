<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
        //-     nav-center
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 片区配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="片区名称查询")
                            el-input(placeholder="输入片区关键字，请勿带符号" v-model="searchMsg.areaName")
                        el-form-item(label="下属门店查询" style="margin-left: 80px;")
                            el-input(placeholder="输入门店关键字，请勿带符号" v-model="searchMsg.storeName")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加片区

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" :tabOp="tabOp"
                    @pageChange="pageChange" @edit="edit")

            div.edit-ctn(v-if="isInput")
                .page-title {{curOperate}}片区
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="片区名称")
                            el-input(type="text" auto-complete="off" v-model="editItem.areaName" placeholder="20个以内的汉字和数字组合")
                        el-button.left(type="primary" @click="editOk") 完成
                        //- router-link(:to = "{ path:'sa-store',query:{op:'add'}}")
                        el-button.left(type="success" @click="editOk2(goToStore)") 完成，去添加对应门店
                        .goBack(@click="goBack") 返回

            //- div.edit-ctn(v-if="isLot")
            //-     .page-title 批量增加店员
            //-     .form-ctn
            //-         el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
            //-             i(class="el-icon-upload")
            //-             div(class="el-upload__text") 将文件拖到此处，或
            //-                 em 点击上传
            //-         el-button(type="primary" @click="isEdit=false,isInput=false,isLot=false") 完成

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
            isLot: false,
            curOperate: '添加',
            keys: [
                {key: 'areaName', str: '片区名称'},
                {key: 'vendorName', str: '供应商'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                //- {f: 'del', str: '删除'},
            ],
            selfApi: {
                list: {type: 'get', url: '/zone/index'},
                add: {type: 'post', url: '/zone/addDo'},
                edit: {type: 'post', url: '/zone/editDo'},
                del: {type: 'post', url: '/delRole'}
            },
            // 搜索的各个字段配置
            searchKeys: ['areaName', 'storeName'],
            // 编辑的各个字段配置
            editKeys: [],
            editName: ''
        }
    },
    mounted(){},
    methods: {
        testRule(){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                this.$message({
                    type: 'error',
                    message: '名称不能为空~'
                })
                return false;
            }
            if(this.editItem.areaName.trim() == this.editName){
                this.isInput = false;
                return false
            }
            return true;
        },
        selfEdit(item){
            this.editName = item.row.areaName;
        },
        async editOk2(cb){
            if(!this.editItem.areaName || this.editItem.areaName.trim() == ''){
                //- alert('名称不能为空');
                this.$message({
                    type: 'error',
                    message: '名称不能为空'
                })
                return false;
            }

            if(this.editItem.areaName.trim() == this.editName){   //  编辑的时候没更改时下一步
                cb(this.editItem);
            }else{
                var curSubmit = this.curEditing.id ? 'edit' : 'add';
                var d = await tryAwait(this.selfApi[curSubmit].type, this.selfApi[curSubmit].url, this.editItem);
                if (d.success) {
                    if(this.curEditing.id) d.model = this.curEditing.id;
                    cb(d);
                } else {
                    this.$message({ type: 'error', message: d.msgInfo });
                }
            }
        },
        goToStore(d){
            if(!isNaN(d.model)){
                this.$router.push({path:'/sa-store',query:{op:'add', areaId:d.model}})
            }else{
                alert('没返回获取到id');
            }
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
