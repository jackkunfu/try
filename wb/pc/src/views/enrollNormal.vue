<template lang="pug">
div
    .table-ctn
        .page-title 报名管理
            span /正常报名

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")
                
                el-form-item(label="时间范围")
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")
                    el-col(:span="2" style="text-align: center") -
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in areaList" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="出生日期")
                    el-date-picker(type="date" placeholder="出生日期" v-model="searchInfo.birth" style="width: 100%;" value-format="yyyy-MM-dd")

                el-form-item(label="销售渠道")
                    el-select(v-model="searchInfo.sale" placeholder="销售渠道")
                        el-option(v-for="(item, i) in sales" :key="i" :label="item.name" :value="item.id")
            
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @openCard="openCard" @add="add" @editScope="editScope" @delScope="delScope" @jihuo="jihuo")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="80px" size="mini")
                .item 个人信息
                el-form-item(label="头像")
                    .up-ctn
                        input#up1(type="file" ref="up1")
                        span + 上传
                        img(:src="config.imgPath+editInfo.avatar" v-if="editInfo.avatar")
                el-form-item(label="姓名")
                    el-input(v-model="editInfo.name")
                el-form-item(label="性别")
                    el-radio-group(v-model="editInfo.sex")
                        el-radio(label="1") 男
                        el-radio(label="0") 女
                el-form-item(label="登陆手机")
                    el-input(v-model="editInfo.mobile" type="number")
                el-form-item(label="生日")
                    el-date-picker(type="date" placeholder="选择生日" v-model="editInfo.birthday" style="width: 100%;")   
                    //- value-format="yyyy-MM-dd"
                el-form-item(label="身高")
                    el-input(v-model="editInfo.height" type="number")
                el-form-item(label="体重")
                    el-input(v-model="editInfo.weight" type="number")
                el-form-item(label="家长姓名")
                    el-input(v-model="editInfo.parentName")
                el-form-item(label="联系电话")
                    el-input(v-model="editInfo.parentPhone")
                
                .item 课程信息
                el-form-item(label="地区")
                    el-select(v-model="editInfo.city")
                        el-option(v-for="(item, i) in citys" :label="item.city" placeholder="选择地区" :value="item.city" :key="i")
                el-form-item(label="训练营")
                    el-select(v-model="editInfo.trainId")
                        el-option(v-for="(item, i) in cityTrains" :label="item.name" placeholder="选择训练营" :value="item.id" :key="i")
                el-form-item(label="卡种")
                    el-select(v-model="editInfo.cardId")
                        el-option(v-for="(item, i) in cards" :label="item.card" placeholder="选择卡种" :value="item.id" :key="i")
                el-form-item(label="上课时间")
                    el-select(v-model="editInfo.time")
                        el-option(v-for="(item, i) in classTimes" :label="'周'+week[item.week]+' '+item.begin+'~'+item.end" placeholder="选择训练频次" :value="item.id" :key="i")
                el-form-item(label="训练频次")
                    el-select(v-model="editInfo.frequency")
                        el-option(v-for="(item, i) in frequencys" :label="item.frequency" placeholder="选择训练频次" :value="item.id" :key="i")
                el-form-item(label="价格")
                    el-input(v-model="editInfo.price")

                el-form-item(label="支付日期")
                    el-date-picker(v-model="editInfo.payDate" type="date" placeholder="选择支付日期" value-format="yyyy-MM-dd")
                //- el-form-item(label="上课时间")
                    div(v-for="(item, i) in classTimes" :key="i")
                        span {{item.time}}
                        el-switch(v-model="item.delivery")
                el-form-item(label="销售顾问")
                    el-select(v-model="editInfo.sale")
                        el-option(v-for="(item, i) in sales" :label="item.name" :value="item.id" :key="i")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
      
</template>

<script>
export default {
    name: 'enrollNormal',
    mixins: [ tableManage ],
    data () {
        return {
            areaList: [],
            cityTrains: [],
            cards: [],
            frequencys: [],
            sales: [],
            keys: [
                { str: '头像', key: 'user.avatar', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '地区', key: 'city' },
                { str: '训练营', key: 'train.name' },
                { str: '卡种', key: 'card.card' },
                { str: '训练频次', key: 'frequency' },
                { str: '费用', key: 'fee' },
                // { str: '支付时间', key: 'height' },
                { str: '创建时间', key: 'createDate' },
                { str: '销售', key: 'sales.name' }
            ],
            searchKeys: ['city', 'trainId', 'week', 'birthday', 'sale'],
            editKeys: ['avatar', 'account', 'name', 'birthday', 'sex', 'email', 'phone', 'city', 'trainId', 'cardId', 'frequency', 'sale', 'price', 'time' ],
            api: {
                list: { url: '/order/list' },
                add: { url: '/order/add' },
                edit: { url: '/order/edit' },
                del: { url: '/order/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '开卡', fun: 'openCard'},
                { str: '已开卡', isShow: { key: '', value: '' }},
                // { str: '激活', fun: 'jihuo', isShow: { key: '', value: '' } },
                // { str: '已激活', fun: 'jihuo'},
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'},
                { str: '导出excel', fun: 'export'}
            ],
            classTimes: []
        }
    },
    watch: {
        async 'editInfo.city'(v){
            this.cityTrains = []
            this.editInfo.trainId = ''
            this.cityTrains = await this.getAllTrain(v)
        },
        async 'editInfo.trainId'(id){
            this.cards = []
            this.classTimes = []
            this.editInfo.cardId = ''
            if(id == '') return
            this.classTimes = await this.getAllTrainTimes(id)
            this.cards = await this.getAllCard(id)
        },
        async 'editInfo.cardId'(id){
            this.frequencys = []
            this.editInfo.frequency = ''
            this.editInfo.price = ''
            if(id == '') return
            this.frequencys = await this.getAllCardTimes(id)
        },
        async 'editInfo.frequency'(v){
            if(!v) return
            var i = this.frequencys.map(v=>v.id).indexOf(v)
            this.editInfo.price = (this.frequencys[i].price - 0)/100
        }
    },
    async mounted(){
        this.citys = await this.getAllExistCity()
        this.areaList = await this.getAllCity()

        this.sales = await this.getAllSeller()

        $(this.$refs.up1).change(()=>{
            this.file('up1', async res =>{
                if(res && res.code == this.successCode){
                    let img = res.data
                    this.editInfo.avatar = res.data
                }
            })
        })
    },
    methods: {
        selfAdd(){
            this.cityTrains = []
            this.cards = []
        },
        changeTableData(data){
            data.forEach(element => {
                element.sexStr = item.user.sex ? '女' : '男'
            });
            return data
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.trainId = 1
            info.price = (info.price - 0)*100
            return info;
        },
        testInput(){
            // var arr = ['account', 'name', 'birthday', 'sex', 'email', 'phone']
            var obj = this.trimObj(this.editInfo)
            if(obj.avatar == '') return this.messageTip('头像未上传')
            if(obj.name == '') return this.messageTip('名称不能为空')
            if(obj.sex === '' || obj.sex === null) return this.messageTip('性别未选')
            if(obj.account == '') return this.messageTip('账号不能为空')
            if(obj.account == '') return this.messageTip('账号不能为空')
            if(obj.account == '') return this.messageTip('账号不能为空')
            if(obj.account == '') return this.messageTip('账号不能为空')
            if(obj.account == '') return this.messageTip('账号不能为空')

            return true
        },
        async openCard(scope){
            var row = scope.row;
            var res = await this.ajax('/order/open', {
                id: row.id,
                openDate: row.openDate || '',
                endDate: row.endDate
            })
            
            if(res && res.code == this.successCode){
                this.messageTip(res.message, 1)
            }else this.messageTip(res.message)

        },
        async jihuo(scope){
            var row = scope.row;
            var res = await this.ajax('/order/activate', { id: row.id })
            
            if(res && res.code == this.successCode){
                this.messageTip(res.message, 1)
            }else this.messageTip(res.message)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.up-ctn
    width: 100px
    height: 100px
    line-height: 100px

</style>
