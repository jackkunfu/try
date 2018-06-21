<template lang="pug">
div
    .table-ctn
        .page-title 课程管理
            span /训练营设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.id")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="100px" size="mini")
                el-form-item(label="城市")
                    el-select(v-model="editInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.id")

                el-form-item(label="训练营名称")
                    el-input(v-model="editInfo.name")
                
                el-form-item(label="地址")
                    el-input(v-model="editInfo.address")

                el-form-item(label="上课时间")
                    el-select(v-model="curDate" placeholder="日期")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                    el-time-select(v-model="curTimeStart" :picker-options="{ start: '05:30', step: '00:30', end: '23:00' }" placeholder="选择开始时间")
                    el-time-select(v-model="curTimeEnd" :picker-options="{ start: '05:30', step: '00:30', end: '23:00', minTime: curTimeStart }" placeholder="选择结束时间")

                    el-button(type="primary" @click="addTime" size="small") 添加

                    div(v-for="(item, i) in addTimeList" v-if="addTimeList.length>0" :key="i" style="text-align:center")
                        span {{item.week}}
                        span(style="margin-left: 10px") {{item.begin + ' ~ ' + item.end}}
  
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
            week: ['一', '二', '三', '四', '五', '六', '日'],
            keys: [
                { str: '城市', key: 'appCode' },
                { str: '训练营', key: 'name' },
                { str: '地址', key: 'name' },
                { str: '上课时间', key: 'sex' }
            ],
            searchKeys: [],
            editKeys: ['address', 'city', 'name'],
            api: {
                list: { url: '/training/list', type: 'get' },
                add: { url: '/training/add' },
                edit: { url: '/training/edit' },
                del: { url: '/training/delete' }
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
    async mounted(){
        this.citys = await this.getAllCity()
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.trainTimes = this.addTimeList
            return info;
        },
        testInput(){
            var obj = this.trimObj(this.editInfo)
            if(obj.city == '') return this.messageTip('请选择城市')
            if(obj.name == '') return this.messageTip('请输入训练营名称')
            if(obj.address == '') return this.messageTip('请输入训练营地址')
            if(this.addTimeList.length == 0) return this.messageTip('请添加时间')
            // if(obj.city == '') return this.messageTip('请选择城市')
            return true
        },
        addTime(){
            if(this.curDate === '') return this.messageTip('请选择日期~')
            if(!this.curTimeStart) return this.messageTip('请选择开始时间~')
            if(!this.curTimeEnd) return this.messageTip('请选择结束时间~')
            var obj = {
                date: this.curDate,
                week: '周'+this.week[this.curDate],
                begin: this.curTimeStart,
                end: this.curTimeEnd
            }
            this.addTimeList.push(obj)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
