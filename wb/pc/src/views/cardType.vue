<template lang="pug">
div
    .table-ctn
        .page-title 课程管理
            span /卡种设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="卡种")
                    el-input(v-model="searchInfo.card" placeholder="名称")
                    //- el-select(v-model="searchInfo.card" placeholder="卡种")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.train" :value="item.id")

                el-form-item(label="训练频次")
                    el-select(v-model="searchInfo.frequency" placeholder="训练频次")
                        el-option(v-for="(item, i) in times" :key="i" :label="item" :value="item")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="城市")
                    el-select(v-model="editInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="editInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in cityTrains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="卡种名称")
                    el-input(v-model="editInfo.card" placeholder="卡种名称")

                el-form-item(label="训练频次")
                    el-select(v-model="editInfo.frequency" placeholder="训练频次")
                        el-option(v-for="(item, i) in times" :key="i" :label="item" :value="item")

                el-form-item(label="价格")
                    el-input(v-model="editInfo.price" type="number" placeholder="价格")
                    
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'cardType',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '城市', key: 'city' },
                { str: '训练营', key: 'name' },
                { str: '卡种', key: 'card' },
                { str: '训练频次', key: 'frequency' },
                { str: '价格', key: 'price' }
            ],
            searchKeys: ['trainId', 'city', 'card', 'frequency'],
            editKeys: ['trainId', 'city', 'card', 'frequency', 'price'],
            api: {
                list: { url: '/card/list' },
                add: { url: '/card/add' },
                del: { url: '/card/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            cityTrains: []
        }
    },
    watch: {
        async 'editInfo.city'(v){
            this.cityTrains = []
            if(!v) return
            this.cityTrains = await this.getAllTrain(v)
        }
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.price = (info.price - 0)*100  // 钱数化成分传参
            return info;
        },
        testInput(){
            var obj = this.trimObj(this.editInfo)
            if(obj.city == '') return this.messageTip('请选择城市')
            if(obj.tranid == '') return this.messageTip('请选择训练营')
            if(obj.card == '') return this.messageTip('请输入卡种名称')
            if(obj.frequency == '') return this.messageTip('请输入卡种名称')
            if(obj.price == '') return this.messageTip('请输入价格')
            if(isNaN(obj.price)) return this.messageTip('价格格式有误')
            var xiaoshu = obj.price.split('.')[1]
            if(xiaoshu && xiaoshu.length > 2) return this.messageTip('最多两位小数')
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
