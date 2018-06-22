<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /教练排课

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

                el-form-item(label="教练")
                    el-select(v-model="searchInfo.city" placeholder="教练")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        el-table(:data="tableData")

            el-table-column(prop="name" label="校区")
                
            template(v-for="(item, i) in ['一', '二', '三', '四', '五', '六', '日']")
                el-table-column(:label="'周'+item")
                    template(slot-scope="scope")
                        div(v-if="scope.row.date == i")
                            span {{scope.row.time}}
                            el-button(type="primary" @click="handleCoach(i, scope.row, 0)" size="small" v-if="!scope.row.has") 添加教练
                            div(v-else)
                                .name {{scope.row.name}}
                                el-button(type="primary" @click="handleCoach(i, scope.row, 1)" size="small") 替换
                                el-button(type="warning" @click="delCoach(i, scope.row)" size="small") 删除

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="160px" size="mini")
                el-form-item(label="教练")
                    el-select(v-model="editInfo.city" placeholder="教练")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'classSetCoach',
    mixins: [ tableManage ],
    data () {
        return {
            tableData: [{
                name: '洛克校区',
                has: true,
                date: 0,
                time: '9:00 - 11: 00',
                name: 'coach wang'
            }, {
                name: '下沙校区',
                has: false,
                date: 3,
                time: '14:00 - 15: 00',
                name: 'coach wang'
            }, {
                name: '滨江校区',
                has: true,
                date: 5,
                time: '19:00 - 21: 00',
                name: 'coach wang'
            }],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/teacher_plan/list' },
                add: { url: '/teacher_plan/add' },
                edit: { url: '/teacher_plan/edit' },
                del: { url: '/teacher_plan/delete' }
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
        async tableList(){
            var obj = this.trimObj(this.searchInfo)
            obj.offset = 0
            obj.limit = 10
            var req = await this.ajax(this.api.list.url, obj)
            if(req && req.code == this.successCode){
                var result = res.data
                this.tableData = result.rows
                this.page.total = result.total;
                this.curChooseRow = null;
            }
        },
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
        },
        handleCoach(i, item, type){   // type 1 是替换   0 是添加
            this.showEditCtn = true
        },
        delCoach(i, item){}
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
