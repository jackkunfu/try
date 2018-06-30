<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /学员等级

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
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @changeLevel="changeLevel")

        .edit-ctn.fix-cover(v-show="isChooseLevel")
            .x(@click="curLevel='';isChooseLevel=''")
                i.el-icon-close
            .box
                .x(@click="isChooseLevel=false;curLevel=''")
                    i.el-icon-close
                el-form(:model="editInfo" label-width="160px" size="mini")
                    el-form-item(label="等级")
                        el-select(v-model="curLevel" placeholder="等级")
                            el-option(v-for="(item, i) in levels" :key="i" :label="'Level '+item" :value="i")

                    el-form-item
                        el-button(type="primary" @click="submit") 保存
    
</template>

<script>
export default {
    name: 'studentLevel',
    mixins: [ tableManage ],
    data () {
        return {
            levels: ['一', '二', '三', '四', '五'],
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '性别', key: 'sex' },
                { str: '生日', key: 'birth' },
                { str: '家长姓名', key: 'pname' },
                { str: '联系电话', key: 'mobile' },
                { str: '训练营', key: 'trainName' },
                { str: '当前等级', key: 'level' },
                { str: '评级操作', fun: 'changeLevel', type: 'fun', text: '修改等级', class: 'change-level' }
            ],
            searchKeys: [],
            tableData: [1],
            editKeys: [],
            api: {
                list: { url: '/user/list' }
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
        changeLevel(scope){
            console.log(11)
            this.isChooseLevel = true
            var item = scope.row
            this.curId = item.id
            this.curLevel = item.lv - 1
            // var id = scope.row.id
        },
        async submit(){
            if(this.curLevel === '') return this.messageTip('请选择等级')
            var res = await this.ajax('/user/level', { userId: this.curId, level: this.curLevel-0+1  })
            if(res && res.code == this.successCode){
                this.messageTip(res.message, 1)
                this.curLevel = ''
                this.curId = ''
                this.isChooseLevel = false
                this.tableList()
            }else this.messageTip(res.message)
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
