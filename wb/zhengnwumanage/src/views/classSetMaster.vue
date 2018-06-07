<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /班主任排课

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.city" placeholder="上课时间")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="班主任")
                    el-select(v-model="searchInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @add="add" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="160px" size="mini")
                el-form-item(label="城市")
                    el-select(v-model="editInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="训练营")
                    el-select(v-model="editInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="上课时间")
                    el-select(v-model="editInfo.city" placeholder="上课时间")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="班主任")
                    el-select(v-model="editInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'classSetMaster',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '城市', key: 'appCode' },
                { str: '训练营', key: 'name' },
                { str: '地址', key: 'sex' },
                { str: '上课时间', key: 'sex' },
                { str: '班主任', key: 'sex' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
                del: { url: '/application/saveApp' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ]
        }
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        testInput(){
            return true
        },
        openCard(scope){
            var row = scope.row;
            console.log(row)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
