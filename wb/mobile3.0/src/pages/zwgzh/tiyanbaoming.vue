<template lang="pug">
.h100

    class-times(v-show="chooseTimes" @next="next" @close="closeChooseTime" :times="clsTimes" :ids="chooseTimeId")

    .fix(v-if="ok")
        .box-ctn
            .box 
                span 恭喜您体验课报名成功
                span(style="font-size:0.7rem;color:#999;padding:0 0 0.5rem;") 我们工作人员将在1-3个工作日内和您联系
                .info
                    div
                        | 姓名:
                        span {{item.name}}
                    div
                        | 联系方式:
                        span {{item.mobile}}
                    div
                        | 城市: 
                        span {{curChooseCityName}}
                    div
                        | 训练营: 
                        span {{curTrain}}
                    div
                        | 上课时间: 
                        span {{curTiyanTimeTanchuangStr}}
                .ensure
                    span(@click="ok=false") 确定

    .bg
        img(src="../../assets/activity_bg@2x.png")

    .top
        img(src="../../assets/activity_logo@2x.png")

    .enroll
        .each
            span 姓名：
            input(v-model="item.name" placeholder="请输入姓名")
        .each
            span 联系方式：
            input(v-model="item.mobile" placeholder="请输入联系方式")
        .each
            span 城市：
            select(v-model="item.city")
                option(value="" label="请选择城市") 请选择城市
                option(v-for="(it, i) in citys" :value="it.id" :label="it.name" :key="i") {{it.name}}
        .each
            span 训练营：
            select(v-model="item.trainId")
                option(value="" label="请选择训练营") 请选择训练营
                option(v-for="(it, i) in trains" :value="it.id" :label="it.name" :key="i") {{it.name}}
        .each
            span 上课时间：
            .fr(@click="chooseTimes=true")
                span(style="color:#9b9b9b;") {{curTiyanTimeStr}}
                img(src="../../assets/xia.png")
        
        .btn(@click="baoming") 提交报名

</template>

<script>
    import classTimes from '../part/classTimes'
    export default {
        name: 'tiyanbaoming',
        components: {
            classTimes
        },
        data() {
            var query = this.$route.query
            return {
                week: ['一', '二', '三', '四', '五', '六', '日'],
                ok: false,
                chooseTimes: false,
                item: {
                    name: '', mobile: '', city: '', trainId: '', week: '', begin: '', end: ''
                },
                citys: [],
                trains: [],
                times: [],
                clsTimes: [],  // 选择训练营卡种的可选上课时间
                chooseTimeId: ''
            }
        },
        computed: {
            curTiyanTimeStr(){
                if(this.item.begin == '') return '请选择上课时间'
                let item = this.item
                return '周'+this.week[item.week]+' '+item.begin+'~'+item.end
            },
            curTiyanTimeTanchuangStr(){
                if(this.item.begin == '') return ''
                let item = this.item
                return '周'+this.week[item.week]+' '+item.begin+'~'+item.end
            },
            curTrain(){
                let trainId = this.item.trainId
                if(trainId) return this.trains[this.trains.map(v=>v.id).indexOf(this.item.trainId)].name
                else return ''
            },
            curChooseCityName(){
                if(!this.item.city) return ''
                let idx = this.citys.map(el=>el.id).indexOf(this.item.city)
                return this.citys[idx].name
            }
        },
        watch: {
            async 'item.city'(v){
                this.trains = []
                this.item.trainId = ''
                if(!v) return
                this.trains = await this.getAllTrain(v)
            },
            async 'item.trainId'(id){
                this.clsTimes = []
                if(id == '') return
                this.clsTimes = await this.getAllTrainTimes(id)
            }
        },
        async mounted(){
            this.citys = await this.getAllExistCity()
        },
        methods: {
            closeChooseTime(){
                this.chooseTimes = false
            },
            async baoming(){
                this.item.name = this.item.name.trim()
                this.item.mobile = this.item.mobile.trim()
                
                if(this.item.name == '' ) return this.messageTip('姓名不能为空~');
                if(this.item.mobile == '') return this.messageTip('联系方式不能为空~');
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.item.mobile)) ) return this.messageTip('手机号格式有误~');

                if(this.item.city == '') return this.messageTip('请选择城市~');
                if(this.item.trainId == '') return this.messageTip('请选择训练营~');

                if(this.item.begin == '') return this.messageTip('请选择上课时间~');

                var res = await this.ajax('/experience/add', this.item);
                if(res && res.code == this.successCode) this.ok = true
            },
            next(data){
                if(data.length > 1) return this.messageTip('体验只能选择一个上课时间~');
                var da = data[0]
                this.chooseTimeId = da.id
                this.item.week = da.week
                this.item.begin = da.begin
                this.item.end = da.end
                this.chooseTimes = false
            }
        }
    }
</script>

<style lang="sass" scoped>
.h100
    background-color: #fff
    // background-image: linear-gradient(2deg, #FFFFFF 48%, rgba(13,175,241,0.00) 100%);

.bg
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: 0
    img
        width: 100%
        height: auto

.top
    text-align: center
    position: relative
    z-index: 1
    img
        width: 72%
        margin: 1.4rem auto

.info
    color: #999
    text-align: left
    padding-left: 1rem
    margin-bottom: 0.5rem
    font-size: 0.8rem
    line-height: 1.2rem

.enroll
    margin: 0 auto
    width: 16rem
    background: #fff
    padding: 0.8rem 0.8rem 1rem
    border-radius: 0.8rem
    position: relative
    box-shadow: 0 0 1.4rem 0 rgba(154,177,185,0.71)

.each
    border-bottom: 1px solid #e3e3e3
    padding: 0.8rem
    position: relative
    overflow: hidden

    input, select
        float: right
        width: 8.5rem
        border: none
        outline: none
        color: #9b9b9b
        height: 1rem
        font-size: 0.8rem

    .fr
        width: 8.5rem
        color: #9b9b9b
        position: relative
        font-size: 0.8rem

        img
            position: absolute
            right: 0
            top: 0.2rem
            width: 0.7rem

.btn
    position: relative
    margin: 2rem auto
    // background-image: linear-gradient(-45deg, #76D5FA 0%, #0BACEE 100%)
    background: #81B7E9
    // box-shadow: 0 2px 6px 0 rgba(64,190,246,0.50)
    line-height: 2.1rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    border-radius: 2.1rem

.fix
    .box
        width: 15rem

.box
    text-align: center
    font-size: 0.9rem
    height: 14rem
    > span
        display: block
        padding: 1rem 0.5rem 0.5rem
        line-height: 1.5rem
    .ensure
        border-top: 1px solid #eee
        color: #4a4a4a
        span
            display: inline-block
            line-height: 1.4rem
            margin: 0.5rem auto
            width: 4rem
            background: #81B7E9
            border-radius: 0.2rem
            color: #fff
            font-size: 0.7rem

</style>

