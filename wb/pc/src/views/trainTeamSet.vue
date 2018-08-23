<template lang="pug">
div
    .table-ctn
        .page-title 课程管理
            span /训练营设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="训练营")
                    el-input(v-model="searchInfo.name" placeholder="名称")
                    //- el-select(v-model="searchInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                //- el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        //- .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x
                i.el-icon-close(@click="closeEditBox")
            .scroll-box
                el-form(:model="editInfo" label-width="100px" size="mini")
                    el-form-item(label="城市")
                        el-select(v-model="editInfo.city" placeholder="城市")
                            el-option(v-for="(item, i) in ALLCITY" :key="i" :label="item.name" :value="item.id")

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
                            span {{'周'+week[item.week]}}
                            span(style="margin-left: 10px") {{item.begin + ' ~ ' + item.end}}
                            i.el-icon-delete(style="margin-left:30px;cursor:pointer;" @click="addTimeList.splice(i,1)")
    
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
                { str: '城市', key: 'city' },
                { str: '训练营', key: 'name' },
                { str: '地址', key: 'address' },
                { str: '上课时间', key: 'time', type: 'html' }
            ],
            searchKeys: ['city', 'name', 'week'],
            editKeys: ['address', 'city', 'name'],
            api: {
                list: { url: '/training/list' },
                add: { url: '/training/add' },
                edit: { url: '/training/edit' },
                del: { url: '/training/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                // { str: '删除', fun: 'delScope'},
                { str: '编辑', fun: 'editScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            curDate: '',
            curTimeStart: '',
            curTimeEnd: '',
            addTimeList: [],

            ALLCITY: []
        }
    },
    async mounted(){
        var res = await this.ajax('/city/list', {}, 'get')
        this.ALLCITY = res.data
    },
    watch: {
        showEditCtn(v){
            if(!v){
                this.editInit()
                this.addTimeList = []
                this.curDate = ''
                this.curTimeStart = ''
                this.curTimeEnd = ''
            }
        }
    },
    methods: {
        selfEdit(item){
            console.log(item)
            this.addTimeList = item.times || []
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.trainTimes = JSON.stringify(this.addTimeList)
            return info;
        },
        changeTableData(data){
            return data.map(v => {
                if(v.times){
                    var html = ''
                    v.times.forEach(element => {
                        html += '周'+this.week[element.week] + ' ' + element.begin + ' ~ ' + element.end + '<br/>'
                    });
                    // v.time = '周'+this.week[v.week] + ' ' + v.begin + ' ~ ' + v.end
                    v.time = html
                }
                return v
            })
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
                // date: this.curDate,
                // week: '周'+this.week[this.curDate],
                week: this.curDate,
                begin: this.curTimeStart,
                end: this.curTimeEnd
            }
            console.log(this.addTimeList)
            var strTimeList = this.addTimeList.map(v=>JSON.stringify(v))
            // if(strTimeList.indexOf(JSON.stringify(obj)) > -1) return this.messageTip('已存在该时间~')
            let weeks = this.addTimeList.map(v=>v.week)
            let begins = this.addTimeList.map(v=>v.begin)
            let ends = this.addTimeList.map(v=>v.end)
            if(weeks.indexOf(this.curDate) > -1 && begins.indexOf(this.curTimeStart) > -1 && ends.indexOf(this.curTimeEnd) > -1) return this.messageTip('已存在该时间~')
            this.addTimeList.push(obj)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
