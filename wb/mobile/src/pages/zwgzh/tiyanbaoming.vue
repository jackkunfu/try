<template lang="pug">
.h100

    class-times(v-if="chooseTimes" @next="next" @close="closeChooseTime" :times="clsTimes")

    .fix(v-if="ok")
        .box-ctn
            .box 
                span 恭喜您体验课报名成功
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
            input(v-model="item.mobile" type="number" placeholder="请输入联系方式")
        .each
            span 城市：
            select(v-model="item.city")
                option(v-for="(it, i) in citys" :value="it.city" :label="it.city" :key="i") {{it.city}}
        .each
            span 训练营：
            select(v-model="item.trainId")
                option(v-for="(it, i) in trains" :value="it.id" :label="it.name" :key="i") {{it.name}}
        .each
            span 上课时间：
            .fr(@click="chooseTimes=true")
                span {{curTiyanTimeStr}}
                img(src="../../assets/xia.png")
        
        .btn(@click="baoming") 提交报名

</template>

<script>
    import classTimes from '../part/classTimes'
    export default {
        name: 'tiyanbaoming',
        components: {
            classTimes: classTimes
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
                clsTimes: [],  // 选择训练营卡种的可选上课时间,
            }
        },
        computed: {
            curTiyanTimeStr(){
                if(this.item.begin == '') return '请选择上课时间'
                let item = this.item
                return '周'+this.week[item.week]+' '+item.begin+'~'+item.end
            }
        },
        watch: {
            async 'item.city'(v){
                this.trains = []
                this.item.trainId = ''
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
                this.clsTimes = []
                this.chooseTimes = false
            },
            async baoming(){
                this.item.name = this.item.name.trim()
                this.item.mobile = this.item.mobile.trim()
                
                if(this.item.name == '' ) return this.messageTip('姓名不能为空~');
                if(this.item.mobile == '') return this.messageTip('手联系方式不能为空~');
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

.enroll
    margin: 1rem auto 0
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
        width: 9rem
        border: none
        outline: none
        color: #9b9b9b
        line-height: 1rem

    .fr
        width: 9rem
        color: #9b9b9b
        position: relative

        img
            position: absolute
            right: 0
            top: 0.2rem
            width: 0.7rem

.btn
    position: relative
    margin: 2rem auto
    background-image: linear-gradient(-45deg, #76D5FA 0%, #0BACEE 100%)
    box-shadow: 0 2px 6px 0 rgba(64,190,246,0.50)
    line-height: 2.1rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    border-radius: 2.1rem

.box
    text-align: center
    font-size: 0.9rem
    > span
        line-height: 5rem
    .ensure
        border-top: 1px solid #eee
        color: #4a4a4a
        span
            display: inline-block
            line-height: 1.4rem
            margin: 0.5rem auto
            width: 4rem
            background: #48C4F5
            border-radius: 0.2rem
            color: #fff
            font-size: 0.7rem

    
</style>

