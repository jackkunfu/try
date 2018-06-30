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
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="90px")
                el-form-item(label="城市")
                    el-select(v-model="editInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="editInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in cityTrains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="卡种名称")
                    el-input(v-model="editInfo.card" placeholder="卡种名称")

                el-form-item(label="频次和价格")
                    el-form-item(label="训练频次")
                        el-select(v-model="curFrequency" placeholder="训练频次")
                            el-option(v-for="(item, i) in times" :key="i" :label="item" :value="item")

                    el-form-item(label="价格")
                        el-input(v-model="curPrice" type="number" placeholder="价格")

                    el-button(type="primary" @click="addTime" size="small") 添加

                    div(v-for="(item, i) in addTimeList" v-if="addTimeList.length>0" :key="i" style="text-align:center")
                        span(style="margin-right:20px") {{item.frequency}}
                        span {{item.price}}
                        i.el-icon-delete(style="margin-left:30px;cursor:pointer;" @click="addTimeList.splice(i,1)")

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
                { str: '训练营', key: 'trainName' },
                { str: '卡种', key: 'card' },
                { str: '训练频次以及价格', key: 'frequencyPrice' }
                // { str: '价格', key: 'price' }
            ],
            searchKeys: ['trainId', 'city', 'card', 'frequency'],
            editKeys: ['trainId', 'city', 'card'],
            api: {
                list: { url: '/card/list' },
                add: { url: '/card/add' },
                edit: { url: '/card/edit' },
                del: { url: '/card/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'},
                { str: '编辑', fun: 'editScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ],
            cityTrains: [],

            addTimeList: [],
            curFrequency: '',
            curPrice: ''
        }
    },
    watch: {
        async 'editInfo.city'(v){
            this.cityTrains = []
            this.editInfo.trainId = ''
            if(!v) return
            this.cityTrains = await this.getAllTrain(v)
        }
    },
    methods: {
        selfEdit(item){
            this.addTimeList = item.cfs.map(v => {
                return {
                    frequency: v.frequency,
                    price: (v.price - 0)/100
                }
            })
        },
        addTime(){
            if(this.curFrequency == '') return this.messageTip('请选择频次')
            if(this.curPrice.trim() == '') return this.messageTip('请选择价格')
            let price = this.curPrice.trim()
            if(isNaN(price)) return this.messageTip('价格格式有误')
            var xiaoshu = price.split('.')[1]
            if(xiaoshu && xiaoshu.length > 2) return this.messageTip('最多两位小数')
            if(this.addTimeList.map(v=>v.frequency).indexOf(this.curFrequency) > -1) return this.messageTip('已存在该频次')
            this.addTimeList.push({
                frequency: this.curFrequency,
                price: price,
            })
        },
        changeTableData(data){     //  处理搜索请求传参
            return data.map(v=>{
                // v.price = (v.price - 0) / 100 + '元'
                if(v.cfs){
                    var html = ''
                    v.cfs.forEach(element => {
                        html += element.frequency + ' ~ ' + (element.price - 0) / 100 + '元'
                    });
                    v.frequencyPrice = html
                }
                return v
            });
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.frequencys = JSON.stringify( this.addTimeList.map(v => {
                return {
                    frequency: v.frequency,
                    price: (v.price - 0)*100
                }
            }) )
            return info;
        },
        testInput(){
            var obj = this.trimObj(this.editInfo)
            if(obj.city == '') return this.messageTip('请选择城市')
            if(obj.tranid == '') return this.messageTip('请选择训练营')
            if(obj.card == '') return this.messageTip('请输入卡种名称')

            if(this.addTimeList.length == 0) return this.messageTip('请添加频次和价格')
            // if(obj.frequency == '') return this.messageTip('请输入卡种名称')
            // if(obj.price == '') return this.messageTip('请输入价格')
            // if(isNaN(obj.price)) return this.messageTip('价格格式有误')
            // var xiaoshu = obj.price.split('.')[1]
            // if(xiaoshu && xiaoshu.length > 2) return this.messageTip('最多两位小数')
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
