<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /教练排课

        //- search(@search="search" @reset="reset")
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
                    el-select(v-model="searchInfo.coachId" placeholder="教练")
                        el-option(v-for="(item, i) in allCoach" :key="i" :label="item.name" :value="item.id")
        
        el-table(:data="tableData" border)

            el-table-column(prop="name" label="校区")
                
            template(v-for="(item, i) in ['一', '二', '三', '四', '五', '六', '日']")
                el-table-column(:label="'周'+item")
                    template(slot-scope="scope")
                        template(v-for="(cls, j) in scope.row.list")
                            .cls(v-if="i == cls.week")
                                .time {{cls.begin + ' ~ ' +cls.end}}
                                    //- el-button(type="primary" @click="handleCoach(j, cls, 0)" size="mini" v-if="!cls.coachs || cls.coachs.length == 0") 添加教练
                                el-button(type="primary" @click="addOrEdit(0, cls)" size="mini") 添加教练
                                // i.el-icon-plus
                                template(v-if="cls.plan && cls.plan.coachs")
                                    div(v-for="(coach, k) in cls.plan.coachs")
                                        span.name {{coach.name}}
                                            .x(@click="del(cls, k)")
                                                i.el-icon-close
                                        i.el-icon-edit-outline(@click="addOrEdit(1, cls, k)")
                                        //- el-button(type="primary" icon="el-icon-edit" @click="addOrEdit(1, cls, k)" size="mini")
                                        //- el-button(type="warning" @click="delCoach(i, coach)" size="small") 删除

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="160px" size="mini")
                el-form-item(label="教练")
                    el-select(v-model="editInfo.coachId" placeholder="教练")
                        el-option(v-for="(item, i) in allCoach" :key="i" :label="item.name" :value="item.id")

                el-form-item
                    el-button(type="primary" @click="chooseOk" size="small") 保存
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
            searchKeys: ['coachId', 'trainId', 'city', 'week'],
            editKeys: ['coachId'],
            api: {
                list: { url: '/teacher_plan/coach/list' },
                // add: { url: '/teacher_plan/add' },
                // edit: { url: '/teacher_plan/edit' },
                // del: { url: '/teacher_plan/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            allCoach: [],
            curEditPlan: null,
            changeIdx: null
        }
    },
    watch: {
        showEditCtn(v){
            if(!v){
                this.curEditPlan = null
                this.changeIdx = null
                this.editInfo.coachId = ''
            }

        }
    },
    mounted(){
        this.getAllCoach()
    },
    methods: {
        async tableList(){
            var obj = this.trimObj(this.searchInfo)
            obj.offset = 0
            obj.limit = 1000
            var loading = this.$loading()
            var req = await this.ajax(this.api.list.url, obj, 'get')
            loading.close()
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
        add(cls){
            this.curEditPlan = cls
            this.showEditCtn = true
        },
        addOrEdit(type, cls, i){  // type 0 添加   1 替换
            this.changeIdx = i !== undefined ? i : null
            this.curEditPlan = cls
            this.showEditCtn = true
        },
        async chooseOk(){
            if(this.editInfo.cocahId == '') return this.messageTip('请选择教练')
            let coachs = this.curEditPlan.plan ? this.curEditPlan.plan.coachs : ''
            var coachIdArr = coachs ? coachs.map(v=>v.id) : []
            if(coachIdArr.indexOf(this.editInfo.coachId) > -1) return this.messageTip('该教练已添加')
            if(this.changeIdx !== null) coachIdArr.splice(this.changeIdx, 1)
            coachIdArr.push(this.editInfo.coachId)
            // console.log(coachIdArr)
            var req = await this.ajax('/teacher_plan/coach', {
                trainTimeId: this.curEditPlan.id,
                city: this.curEditPlan.training.city,
                week: this.curEditPlan.week,
                begin: this.curEditPlan.begin,
                end: this.curEditPlan.end,
                trainId: this.curEditPlan.trainId,
                coachIds: coachIdArr.join(',')
            })
            if(req && req.code == this.successCode){
                this.messageTip(req.message, 1)
                
                var newCoach = this.allCoach[this.allCoach.map(v=>v.id).indexOf(this.editInfo.coachId)]

                if(this.changeIdx !== null) coachs.splice(this.changeIdx, 1, newCoach)
                else{
                    if(!this.curEditPlan.plan.coachs) this.$set(this.curEditPlan.plan, 'coachs', [])
                    this.curEditPlan.plan.coachs.push(newCoach)
                }

                this.showEditCtn = false
                this.changeIdx = null

            }else this.messageTip(req.message || '操作失败')
        },
        async del(item, i){
            // console.log(item)
            let allIds = item.plan.coachs.map(v=>v.id)
            allIds.splice(i, 1)
            var req = await this.ajax('/teacher_plan/coach', {
                planId: item.plan.id,
                trainTimeId: item.id,
                city: item.training.city,
                week: item.week,
                begin: item.begin,
                end: item.end,
                trainId: item.trainId,
                coachIds: allIds.join(',')
            })
            if(req && req.code == this.successCode){
                this.messageTip(req.message, 1)
                item.plan.coachs.splice(i, 1)
            }else this.messageTip(req.message || '操作失败')
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
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.cls
    margin: 10px 0
    padding: 10px 0 10px
    border-bottom: 1px solid #339999
    .name
        position: relative
        display: inline-block
        padding-left: 13px
        margin: 0 5px
        .x
            position: absolute
            left: -5px
            top: 0
            color: red
            cursor: pointer
    .time
        &+.el-button
            margin-bottom: 10px

    .el-button
        margin-left: 5px
</style>
