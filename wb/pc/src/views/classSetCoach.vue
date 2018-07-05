<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /教练排课

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="教练")
                    el-select(v-model="searchInfo.coach" placeholder="教练")
                        el-option(v-for="(item, i) in allCoach" :key="i" :label="item.name" :value="item.id")
        
        el-table(:data="tableData")

            el-table-column(prop="name" label="校区")
                
            template(v-for="(item, i) in ['一', '二', '三', '四', '五', '六', '日']")
                el-table-column(:label="'周'+item")
                    template(slot-scope="scope")
                        template(v-for="(cls, j) in scope.row.list")
                            .cls(v-if="i == cls.week")
                                span {{cls.begin + ' ~ ' +cls.end}}
                                el-button(type="primary" @click="handleCoach(j, cls, 0)" size="small" v-if="!cls.coachs || cls.coachs.length == 0") 添加教练
                                div(v-for="(coach, k) in cls.coachs")
                                    span.name {{coach.name}}
                                        .x X
                                    el-button(type="primary" icon="el-icon-edit" @click="handleCoach(k, coach, 1)" size="mini")
                                    //- el-button(type="warning" @click="delCoach(i, coach)" size="small") 删除

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
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
            tableData: [
                // {
                //     name: '下沙校区',
                //     has: false,
                //     date: 3,
                //     time: '14:00 - 15: 00',
                //     name: 'coach wang'
                // }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/teacher_plan/coach/list' },
                add: { url: '/teacher_plan/add' },
                edit: { url: '/teacher_plan/edit' },
                del: { url: '/teacher_plan/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            allCoach: []
        }
    },
    mounted(){
        this.getAllCoach()
    },
    methods: {
        async tableList(){
            var obj = this.trimObj(this.searchInfo)
            obj.offset = 0
            obj.limit = 10
            var req = await this.ajax(this.api.list.url, obj, 'get')
            if(req && req.code == this.successCode){
                var result = req.data
                var newData = Object.keys(result).map(v => {
                    return {
                        name: v,
                        list: result[v]
                    }
                })  || []
                console.log(newData)
                this.tableData = newData
            }
        },
        async getAllCoach(){
            var res = await this.ajax('/mgr/list', {
                roleid: 4,
                offset: 0,
                limit: 1000
            }, 'get')
            if(res && res.code == this.successCode){
                this.allCoach = res.data.rows
            }
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.city = info.city || 1
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
.cls
    padding: 10px
    border-bottom: 1px solid #339999
    .name
        position: relative
        display: inline-block
        .x
            position: absolute
            left: -15px
            top: 0
            color: red
            cursor: pointer

    .el-button
        margin-left: 5px
</style>
