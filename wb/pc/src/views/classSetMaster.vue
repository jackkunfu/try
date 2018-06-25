<template lang="pug">
div
    .table-ctn
        .page-title 排课管理
            span /班主任排课

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.id")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.train" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.train" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="班主任")
                    el-select(v-model="searchInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @add="add" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="160px" size="mini")
                el-form-item(label="地区")
                    el-select(v-model="editInfo.city")
                        el-option(v-for="(item, i) in areaList" :label="item.city" placeholder="选择地区" :value="item.city" :key="i")
                el-form-item(label="训练营")
                    el-select(v-model="editInfo.trainId")
                        el-option(v-for="(item, i) in cityTrains" :label="item.name" placeholder="选择训练营" :value="item.id" :key="i")
                el-form-item(label="上课时间")
                    el-select(v-model="editInfo.time" placeholder="上课时间")
                        el-option(v-for="(item, i) in trainTimes" :key="i" :label="'周'+week[item.week]+' '+item.begin+'~'+item.end" :value="item.id")

                el-form-item(label="班主任")
                    el-select(v-model="editInfo.city" placeholder="班主任")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.id")

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
                { str: '城市', key: 'city' },
                { str: '训练营', key: 'name' },
                { str: '地址', key: 'address' },
                { str: '上课时间', key: 'time' },
                { str: '班主任', key: 'sex' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/application/queryAppPage' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
                del: { url: '/application/saveApp' }
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
            week: ['一', '二', '三', '四', '五', '六', '日']
        }
    },
    watch: {
        async 'editInfo.city'(v){
            this.cityTrains = []
            this.cityTrains = await this.getAllTrain(v)
        },
        async 'editInfo.trainId'(id){
            this.trainTimes = []
            this.trainTimes = await this.getAllTrainTimes(id)
        },
        async 'editInfo.cardId'(id){
            this.frequencys = []
            this.frequencys = await this.getAllCardTimes(id)
        },
        async 'editInfo.frequency'(v){
            var i = this.frequencys.map(v=>v.id).indexOf(v)
            this.editInfo.price = (this.frequencys[i].price - 0)/100
        }
    },
    async mounted(){
        this.areaList = await this.getAllExistCity()
        this.citys = await this.getAllCity()
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
