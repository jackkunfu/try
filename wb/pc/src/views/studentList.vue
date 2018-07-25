<template lang="pug">
div
    .table-ctn(v-show="!showEditCtn")
        .page-title 学员管理
            span /学员信息

        search(@search="search" @reset="beReset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

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

                el-form-item(label="出生日期")
                    el-date-picker(type="date" placeholder="出生日期" v-model="searchInfo.birth" style="width: 100%;" value-format="yyyy-MM-dd")

        .btn-search
            el-button(size="small" @click="searchDaoqi" :class="isDaoqi ? 'cur' : ''") 即将到期
            span 总数：{{wilEndNum}}

        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope" @daochu="daochu('/user/excel')")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        //- .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            .scroll-box
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
                            el-radio(label="0") 男
                            el-radio(label="1") 女
                    el-form-item(label="登陆手机")
                        el-input(v-model="editInfo.phone" type="number")
                    el-form-item(label="生日")
                        el-date-picker(type="date" placeholder="选择生日" v-model="editInfo.birthday" style="width: 100%;" value-format="yyyy-MM-dd")   
                        //- value-format="yyyy-MM-dd"
                    el-form-item(label="身高")
                        el-input(v-model="editInfo.height" type="number")
                    el-form-item(label="体重")
                        el-input(v-model="editInfo.weight" type="number")
                    el-form-item(label="家长姓名")
                        el-input(v-model="editInfo.parentName")
                    el-form-item(label="联系电话")
                        el-input(v-model="editInfo.parentPhone")
                    el-form-item(label="备注")
                        el-input(v-model="editInfo.remarks")
                    
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
                    //- el-form-item(label="上课时间")
                        el-select(v-model="editInfo.time")
                            el-option(v-for="(item, i) in classTimes" :label="'周'+week[item.week]+' '+item.begin+'~'+item.end" placeholder="选择训练频次" :value="item.id" :key="i")
                    el-form-item(label="训练频次")
                        el-select(v-model="editInfo.frequency")
                            el-option(v-for="(item, i) in frequencys" :label="item.frequency" placeholder="选择训练频次" :value="item.frequency" :key="i")
                    el-form-item(label="价格")
                        el-input(v-model="editInfo.fee" :disabled="true")
                    el-form-item(label="上课时间")
                        div(v-for="(item, i) in classTimes" :key="i")
                            el-switch(v-model="item.isChoose" style="margin-right:20px;position:relative;top:-2px;")
                            span {{'周'+week[item.week]+' '+item.begin+'~'+item.end}}
                            

                    //- el-form-item(label="支付日期")
                        el-date-picker(v-model="editInfo.payDate" type="date" placeholder="选择支付日期" value-format="yyyy-MM-dd")
                    
                    //- el-form-item(label="销售顾问")
                        el-select(v-model="editInfo.sale")
                            el-option(v-for="(item, i) in sales" :label="item.name" :value="item.id" :key="i")

                    el-form-item
                        el-button(type="primary" @click="addOrUpdate" size="small") 保存
                        el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'studentList',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'img', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '生日', key: 'birth' },
                { str: '身高', key: 'user.height' },
                { str: '体重', key: 'user.weight' },
                { str: '手机', key: 'user.phone' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '训练营', key: 'train.name' },
                { str: '卡种', key: 'card.card' },
                { str: '训练频次', key: 'frequency' },
                { str: '上课时间', key: 'time', type: 'html' },
                { str: '开卡时间', key: 'openDate' },
                { str: '到期时间', key: 'endDateStr', type: 'html' },
                // { str: '学员作业', key: 'remark' },
                // { str: '体能测试', key: 'remark' }
            ],
            // keys: [
            //     { str: '头像', key: 'img', type: 'img' },
            //     { str: '姓名', key: 'user.name' },
            //     { str: '性别', key: 'sexStr' },
            //     { str: '家长姓名', key: 'user.parentName' },
            //     { str: '联系电话', key: 'user.parentPhone' },
            //     { str: '地区', key: 'city' },
            //     { str: '训练营', key: 'train.name' },
            //     { str: '卡种', key: 'card.card' },
            //     { str: '训练频次', key: 'frequency' },
            //     { str: '费用', key: 'fee' },
            //     { str: '开卡时间', key: 'openDate' },
            //     { str: '创建时间', key: 'createDate' },
            //     { str: '销售', key: 'sales.name' }
            // ],
            searchKeys: ['city', 'trainId', 'week', 'birthday', 'sale', 'begin', 'end'],
            editKeys: ['avatar', 'account', 'name', 'birthday', 'sex', 'email', 'phone', 'city', 'trainId', 'cardId', 'frequency', 'sale', 'fee', 'time', 'parentName', 'parentPhone', 'payDate', 'remarks' ],
            api: {
                list: { url: '/order/list' },
                add: { url: '/mgr/addStu' },
                edit: { url: '/mgr/editStu' },
                del: { url: '/user/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                // { str: '新增', fun: 'add'},
                { str: '导出excel', fun: 'daochu'}
            ],
            cityTrains: [],
            cards: [],
            frequencys: [],
            classTimes: [],
            sales: [],
            isDaoqi: false,       // 是否即将到期
            wilEndNum: 0
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
            this.editInfo.fee = ''
            if(id == '') return
            this.frequencys = await this.getAllCardTimes(id)
        },
        async 'editInfo.frequency'(v){
            if(!v) return
            var i = this.frequencys.map(v=>v.frequency).indexOf(v)
            this.editInfo.fee = (this.frequencys[i].price - 0)/100
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
        searchDaoqi(){
            this.isDaoqi = true;
            this.tableList()
        },
        afterTableList(data){
            this.wilEndNum = data.expireSum || 0
        },
        beReset(){
            this.isDaoqi = false
            this.reset()
        },
        changeTableData(data){
            data.forEach(element => {
                element.birth = element.user.birthday ? element.user.birthday.split(' ')[0] : ''
                element.sexStr = element.user.sex ? '女' : '男'
                element.img = element.user.avatar
                if(element.times){
                    element.time = element.times.reduce((a, b)=>{
                        a = a + '周'+this.week[b.week] + ' ' + b.begin + '~' + b.end + '<br>'
                        return a
                    }, '')
                }else element.time = ''
                
                if(!element.endDate){
                    element.endDateStr = ''
                }else{   // 快30天到期的展示红色字体
                    var eTime = new Date(element.endDate.split(' ')).getTime()
                    var nTime = new Date().getTime()
                    if( eTime - nTime < 30*24*60*60*1000 ) element.endDateStr = '<span style="color:red;">'+element.endDate.split(' ')[0]+'</span>'
                    else element.endDateStr = element.endDate
                }
            });
            console.log(data)
            return data
        },
        selfEdit(data){
            console.log('data')
            console.log(data)
            var train = data.train
            var card = data.card
            var user = data.user
            console.log('user')
            console.log(user)
            this.editInfo.avatar = user.avatar
            this.editInfo.name = user.name
            this.editInfo.sex = user.sex + ''
            this.editInfo.birthday = user.birthday
            this.editInfo.height = user.height
            this.editInfo.weight = user.weight
            this.editInfo.phone = user.phone
            this.editInfo.parentName = user.parentName
            this.editInfo.parentPhone = user.parentPhone
            
            setTimeout(()=>{
                this.editInfo.trainId = data.trainId
                setTimeout(()=>{
                    this.editInfo.cardId = data.cardId
                    setTimeout(()=>{
                        this.editInfo.frequency = data.frequency
                        this.editInfo.fee = data.fee

                        let cts = data.times.map(v=>v.id)
                        console.log(cts)

                        this.classTimes.forEach(el => {
                            console.log(el.id)
                            if(cts.indexOf(el.id) > -1) this.$set(el, 'isChoose', true)
                            else this.$set(el, 'isChoose', false)
                        })
                        
                    }, 500)
                }, 300)
            }, 300)

            this.editInfo.payDate = data.payDate
            this.editInfo.sale = data.sales.id
        },
        testInput(){
            var obj = this.trimObj(this.editInfo)
            // if(obj.avatar == '') return this.messageTip('头像未上传')
            if(obj.name == '') return this.messageTip('名称不能为空')
            if(obj.sex === '' || obj.sex === null) return this.messageTip('性别未选')
            if(obj.phone == '') return this.messageTip('登陆手机未填')
            if( !(/^1[3|4|5|7|8]\d{9}/.test(obj.phone)) ) return this.messageTip('登陆手机格式有误')
            if(obj.birthday == '') return this.messageTip('生日未选')
            if(obj.height == '') return this.messageTip('身高未填')
            if(obj.weight == '') return this.messageTip('体重未填')
            if(obj.parentName == '') return this.messageTip('家长姓名未填')
            if(obj.parentPhone == '') return this.messageTip('家长联系方式未填')
            if( !(/^1[3|4|5|7|8]\d{9}/.test(obj.parentPhone)) ) return this.messageTip('家长联系方式手机格式有误')

            if(obj.city == '') return this.messageTip('地区未选')
            if(obj.trainId == '') return this.messageTip('训练营未选')
            if(obj.cardId == '') return this.messageTip('卡种未选')
            if(obj.frequency == '') return this.messageTip('训练频次未选')

            var chooseTimesLength = this.classTimes.filter(v=>v.isChoose).length
            if(chooseTimesLength == 0) return this.messageTip('上课时间未选')

            var freq = this.allFrequency.indexOf(obj.frequency)
            if(chooseTimesLength > (freq+1)) return this.messageTip('训练频次为'+this.allFrequency[freq]+'最多选'+(freq+1)+'个上课时间');

            // if(obj.payDate == '') return this.messageTip('支付日期未选')
            // if(obj.sale == '') return this.messageTip('销售顾问未选')

            return true
        },
        handleDelRow(data){
            return { userId: data.userId }
        },
        changeSearchValue(info){     //  处理搜索请求传参
            if(this.isDaoqi) info.expire = 1     // 即将到期
            info.status = 3
            return info
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.fee = (info.fee - 0)*100
            info.birthday = new Date(info.birthday)
            info.payDate = new Date(info.payDate)
            if(this.curOperateType == 2) info.userId = this.curChooseRow.userId
            return info;
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
