<template lang="pug">
    div(style="height:100%;")
        //- div.nav2-ctn
        //-     nav-center
        .table-main.no-nav
            div.table-ctn(v-if="!isInput")
                .page-title 区域配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        el-form-item(label="区域名称")
                            el-input(placeholder="输入区域名称，请勿带符号" v-model="searchMsg.areaName")
                        el-form-item(label="下属片区" style="margin-left: 80px;")
                            el-input(placeholder="输入片区关键字，请勿带符号" v-model="searchMsg.childAreaName")
                    el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button(type="success" @click="add" ref="add") 添加区域

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi"
                    :totalPage="totalPage" :currentPage="currentPage" ref="table" :tabOp="tabOp"
                    @pageChange="pageChange" @edit="edit" @del="del")

            div.edit-ctn(v-if="isInput && !isLot")
                .page-title {{curOperate}}区域
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="区域名称")
                            el-input(type="text" auto-complete="off" placeholder="20个以内的汉字和数字组合" v-model="editItem.areaName")
                        el-form-item(label="下属片区" class="transfer-item")
                            el-transfer(v-model="chooseTransfer" :data="transferData"
                                :titles="['全部片区', '已选片区']")

                        el-button.left(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回


            div.edit-ctn(v-if="isLot")
                .page-title 批量增加店员
                .form-ctn
                    el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
                        i(class="el-icon-upload")
                        div(class="el-upload__text") 将文件拖到此处，或
                            em 点击上传
                    el-button(type="primary" @click="isEdit=false,isInput=true,isLot=false") 完成

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
            keys: [
                {key: 'areaName', str: '区域名称'},
                {key: 'vendorName', str: '供应商'},
                {key: 'childArea', str: '下属片区'},
                {key: 'createdTime', str: '添加时间'}
            ],
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'del', str: '删除'}
            ],
            selfApi: {
                list: {type: 'get', url: '/area/index'},
                add: {type: 'post', url: '/area/addDo'},
                edit: {type: 'post', url: '/area/editDo'},
                del: {type: 'post', url: '/area/delete'}
            },
            // 搜索的各个字段配置
            searchKeys: ['areaName', 'childAreaName'],
            // 编辑的各个字段配置
            editKeys: ['areaName', 'childArea'],
            transferData: [    //   下属片区数组
                //- { key: 0, label: `备选项 1`}
            ],
            chooseTransfer: []    // 已选中的下属片区序号数组
        }
    },
    async mounted(){
        this.$nextTick(()=>{})
        this.transferData = (await tryAwait('get', '/area/zone', {})).model.map((v)=>{
            return {    //  需要这种格式，所以
                key: v.id,
                label: v.areaName,
                id: v.id
            }
        });
    },
    methods: {
        testRule(){
            return true;
        },
        selfEdit(){
            //- this.chooseTransfer = this.editItem.childArea.split(',');
            // 由于穿梭框组件需求数据与实际数据字段不同，所以这里处理下
            var chooses = this.transferData.filter((v)=>{
                return this.editItem.childArea.indexOf(v.label) > -1
            })
            this.chooseTransfer = chooses.map((v)=>{
                return v.id
            })
        },
        selfEditCancel(){
            this.chooseTransfer = [];
        }
    },
    watch: {
        chooseTransfer(v){
            this.editItem.childArea = v.join(',')
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
