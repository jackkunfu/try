<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /班主任排课

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="开始时间")
                    el-time-select(v-model="searchInfo.begin" :picker-options="{ start: '00:00', step: '00:30', end: '23:00'}" placeholder="选择开始时间")

                el-form-item(label="结束时间")
                    el-time-select(v-model="searchInfo.end" :picker-options="{ start: '00:00', step: '00:30', end: '23:00'}" placeholder="选择结束时间")

                el-form-item(label="班主任")
                    el-select(v-model="searchInfo.userId" placeholder="班主任")
                        el-option(v-for="(item, i) in bzrs" :key="i" :label="item.name" :value="item.id")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @add="add" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        // .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x
                i.el-icon-close(@click="closeEditBox")
            .scroll-box
                el-form(:model="editInfo" label-width="160px" size="mini")
                    el-form-item(label="地区")
                        el-select(v-model="editInfo.city")
                            el-option(v-for="(item, i) in areaList" :label="item.name" placeholder="选择地区" :value="item.id" :key="i")
                    el-form-item(label="训练营")
                        el-select(v-model="editInfo.trainId")
                            el-option(v-for="(item, i) in cityTrains" :label="item.name" placeholder="选择训练营" :value="item.id" :key="i")
                    el-form-item(label="上课时间")
                        el-select(v-model="editInfo.time" placeholder="上课时间")
                            el-option(v-for="(item, i) in trainTimes" :key="i" :label="'周'+week[item.week]+' '+item.begin+'~'+item.end" :value="item.id")

                    el-form-item(label="班主任")
                        el-select(v-model="editInfo.userId" placeholder="班主任")
                            el-option(v-for="(item, i) in bzrs" :key="i" :label="item.name" :value="item.id")

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
                { str: '城市', key: 'train.ci.name' },
                { str: '训练营', key: 'train.name' },
                { str: '地址', key: 'train.address' },
                { str: '上课时间', key: 'time' },
                { str: '班主任', key: 'user.name' }
            ],
            searchKeys: ['userId', 'time', 'trainId', 'city', 'begin', 'end'],
            editKeys: ['userId', 'time', 'trainId', 'city'],
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
            ],
            areaList: [],
            cityTrains: [],
            trainTimes: [],
            bzrs: []
        }
    },
    watch: {
        async 'editInfo.city'(v){
            this.cityTrains = []
            this.editInfo.trainId = ''
            this.cityTrains = await this.getAllTrain(v)
        },
        async 'editInfo.trainId'(id){
            this.trainTimes = []
            this.editInfo.time = ''
            if(!id) return
            this.trainTimes = await this.getAllTrainTimes(id)
        },
    },
    async mounted(){
        this.areaList = await this.getAllExistCity()
        this.bzrs = (await this.ajax('/mgr/list', {
            offset: 0,
            limit: 100,
            roleid: 3
        }, 'get')).data.rows
    },
    methods: {
        selfAdd(){
            this.cityTrains = []
            this.trainTimes = []
        },
        changeTableData(data){
            return data.map(v=>{
                v.time = '周'+this.week[v.week] + ' ' + v.begin + ' ~ ' + v.end
                return v
            })
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            var idx = this.trainTimes.map(v=>v.id).indexOf(info.time)
            info.week = this.trainTimes[idx].week
            info.begin = this.trainTimes[idx].begin
            info.end = this.trainTimes[idx].end
            info.trainTimeId = this.trainTimes[idx].id
            return info;
        },
        testInput(){
            if(this.editInfo.city == '') return this.messageTip('qing')
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
