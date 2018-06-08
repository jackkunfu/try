<template lang="pug">
div
    .table-ctn
        .page-title 课程管理
            span /训练营设置

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
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @openCard="openCard")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="80px" size="mini")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="训练营名称")
                    el-input(v-model="editInfo.name")
                
                el-form-item(label="地址")
                    el-input(v-model="editInfo.remark")

                el-form-item(label="上课时间")
                    el-select(v-model="curDate" placeholder="日期")
                        el-option(v-for="(item, i) in ['一', '二', '三', '四', '五', '六', '日']" :key="i" :label="'周'+item" :value="i")

                    el-time-select(v-model="curTimeStart" :picker-options="{ start: '05:30', step: '00:30', end: '23:00' }" placeholder="选择开始时间")
                    el-time-select(v-model="curTimeEnd" :picker-options="{ start: '05:30', step: '00:30', end: '23:00', minTime: curTimeStart }" placeholder="选择结束时间")

                    el-button(type="primary" @click="addTime" size="small") 添加

                    div(v-for="(item, i) in addTimeList" v-if="addTimeList.length>0" :key="i" style="text-align:center")
                        span {{item.datestr}}
                        span(style="margin-left: 10px") {{item.stime + '~' + item.etime}}
  
                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'trainTeamSet',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '城市', key: 'appCode' },
                { str: '训练营', key: 'name' },
                { str: '地址', key: 'name' },
                { str: '上课时间', key: 'sex' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            citys: [],
            curDate: '',
            curTimeStart: '',
            curTimeEnd: '',
            addTimeList: []
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
        addTime(){
            if(this.curDate === '') return this.messageTip('请选择日期~')
            if(!this.curTimeStart) return this.messageTip('请选择开始时间~')
            if(!this.curTimeEnd) return this.messageTip('请选择结束时间~')
            this.addTimeList.push({
                date: this.curDate,
                datestr: '周'+['一', '二', '三', '四', '五', '六', '日'][this.curDate],
                stime: this.curTimeStart,
                etime: this.curTimeEnd
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
