<template lang="pug">
div
    .table-ctn
        .page-title 教练管理
            span /教练评价

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="教练")
                    el-select(v-model="searchInfo.cocahId" placeholder="教练")
                        el-option(v-for="(item, i) in cocahs" :key="i" :label="item.name" :value="item.id")  

        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @seeDetail="seeDetail" @delScope="delScope")

    //- .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="应用编号")
                    el-input(v-model="editInfo.appCode")
                el-form-item(label="应用名称")
                    el-input(v-model="editInfo.appName")
                el-form-item(label="对接URL")
                    el-input(v-model="editInfo.appUrl")
                el-form-item(label="描述")
                    el-input(v-model="editInfo.remark")
                el-form-item(label="dorder")
                    el-input(v-model="editInfo.dorder")
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'coachJudge',
    mixins: [ tableManage ],
    data () {
        return {
            cocahs: [],
            keys: [
                { str: '头像', key: 'avatar' },
                { str: '姓名', key: 'name' },
                { str: '联系电话', key: 'mobile' },
                { str: '本月评价', key: 'avgEvaluate' }
            ],
            searchKeys: ['cocahId', 'city'],
            editKeys: [],
            api: {
                list: { url: '/evaluate/list' },
                del: { url: '/evaluate/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '查看详情', fun: 'seeDetail'},
                // { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                // { str: '新增', fun: 'add'},
                // { str: '修改', fun: 'edit'}
            ]
        }
    },
    mounted(){
        this.cocahs = ( this.ajax('/mgr/list', {
            limit: 10000,
            offset: 0,
            roleid: 4
        }, 'get') ).data.rows
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        seeDetail(scope){
            // console.log(scope)
            this.goUrl('/cocahClass', scope.row)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
