<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /学员等级

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")

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
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @changeLevel="changeLevel")

        .edit-ctn.fix-cover(v-show="isChooseLevel")
            //- .x(@click="curLevel='';isChooseLevel=''")
                i.el-icon-close
            .box
                .x
                    i.el-icon-close(@click="isChooseLevel=false;curLevel=''")
                .scroll-box
                    el-form(:model="editInfo" label-width="160px" size="mini")
                        el-form-item(label="等级")
                            el-select(v-model="curLevel" placeholder="等级")
                                //- el-option(label="入门级" :value="0")
                                el-option(label="请选择" :value="0")
                                el-option(v-for="(item, i) in levels" :key="i" :label="'Level '+item" :value="i-0+1")

                        el-form-item
                            el-button(type="primary" @click="submit") 保存
    
</template>

<script>
export default {
    name: 'studentLevel',
    mixins: [ tableManage ],
    data () {
        return {
            // levels: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
            levels: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            keys: [
                // { str: '头像', key: 'avatar', type: 'img' },
                // { str: '姓名', key: 'name' },
                // { str: '性别', key: 'sexStr' },
                // { str: '生日', key: 'birthday' },
                // { str: '家长姓名', key: 'parentName' },
                // { str: '联系电话', key: 'parentPhone' },
                // { str: '训练营', key: 'trainName' },
                // { str: '当前等级', key: 'level' },

                { str: '头像', key: 'img', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '手机', key: 'user.phone' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '训练营', key: 'train.name' },
                { str: '当前等级', key: 'levelStr' },

                { str: '评级操作', fun: 'changeLevel', type: 'fun', text: '修改等级', class: 'change-level' }
            ],
            searchKeys: ['name', 'city', 'trainId', 'week', 'begin', 'end'],
            tableData: [],
            editKeys: [],
            api: {
                // list: { url: '/user/list' }
                list: { url: '/order/list' }
            },
            scopeOperates: [    // 每一行种的操作
                // { str: '编辑', fun: 'editScope'}
            ],
            isChooseLevel: false,
            curLevel: '',
            curId: ''
        }
    },
    methods: {
        changeTableData(data){
            data.forEach(element => {
                // element.level = element.lv ? 'Level ' + this.levels[element.lv-1] : element.lv === 0 ? '入门级' : ''
                element.level = element.lv ? 'Level ' + this.levels[element.lv-1] : ''
                element.sexStr = element.sex ? '女' : '男'
                element.img = element.user.avatar
                // element.levelStr = element.user.lv ? '等级' + element.user.lv : '入门级'
                element.levelStr = element.user.lv ? '等级' + this.levels[element.user.lv-1] : ''
            })
            return data
        },
        changeLevel(scope){
            this.isChooseLevel = true
            var item = scope.row
            // console.log(item)
            this.curId = item.userId
            this.curLevel = item.user.lv ? item.user.lv : 0
            // var id = scope.row.id
        },
        async submit(){
            if(this.curLevel === '') return this.messageTip('请选择等级')
            var res = await this.ajax('/user/level', { userId: this.curId, level: this.curLevel  })
            if(res && res.code == this.successCode){
                this.messageTip(res.message, 1)
                this.curLevel = ''
                this.curId = ''
                this.isChooseLevel = false
                this.tableList()
            }else this.messageTip(res.message)
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.status = 3
            return info;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
