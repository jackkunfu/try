<template lang="pug">
.h100

    // class-times(v-show="chooseTimes" @next="next" @close="chooseTimes=false" :times="list")

    //- .block
        .each
            .fl 上课时间
            .fr(@click="chooseTimes=true") 选择上课时间
                .icon.fr
                    img(src="../../assets/xia.png")

    .block
        .each(@click="$refs.upfile.click()")
            .fl 修改头像
            .fr
                img.touxiang(:src="touxiang")
                .icon.fr
                    img(src="../../assets/you.png")
        .each
            .fl 姓名
            .fr
                input(v-model="my.name" placeholder="请输入学员姓名")
        .each
            .fl 性别
            .fr
                span.sex(@click="my.sex='0'")
                    img(src='../../assets/choose.png' v-if="my.sex === '0'")
                    img(src='../../assets/nochoose.png' v-else)
                    span 男

                span.sex(@click="my.sex=1")
                    img(src='../../assets/choose.png' v-if="my.sex === 1")
                    img(src='../../assets/nochoose.png' v-else)
                    span 女
                
        .each
            .fl 身高
            .fr
                input(v-model="my.height" placeholder="请输入学员身高(cm)" type="number")
        .each
            .fl 体重
            .fr
                input(v-model="my.weight" placeholder="请输入学员体重(kg)" type="number")
        .each
            .fl 生日
            .fr
                span#birth {{my.birthday || '请选择出生日期'}}
                // input(v-model="my.name" placeholder="请输入学员姓名")

    .block
        .each
            .fl 家长姓名
            .fr
                input(v-model="my.parentName" placeholder="请输入家长姓名")

        .each
            .fl 家长电话
            .fr
                input(v-model="my.parentPhone" placeholder="请输入联系电话" type="number")

    .lbtn(@click="submit") 保存

    input(type="file" style="display:none;" ref="upfile" @change="upfile")

</template>

<script>
import classTimes from '../part/classTimes'
export default {
    name: 'myset',
    components: {
        classTimes
    },
    data () {
        return {
            list: [],
            chooseTimes: false,
            my: {
                avatar: '',
                name: '',
                sex: null,
                weight: '',
                height: '',
                birthday: '',
                phone: '',
                parentName: '',
                parentPhone: ''
            },
            userId: this.$route.query.userId || this.$route.query.id,
            trainId: this.$route.query.trainId,
        }
    },
    computed: {
        touxiang(){
            return this.my.avatar ? this.config.imgPath + this.my.avatar : require('../../assets/touxiang.png')
        }
    },
    async mounted(){
        Object.keys(this.$route.query).forEach(el => {
            this.$set(this.my, el, this.$route.query[el])
        })
        // this.my = this.$route.query

        var res = await this.ajax('/user/detail', {userId:this.userId}, 'get')
        // console.log(res)
        this.my = res.data
        
        this.list = await this.getAllTrainTimes(this.trainId)

        var that = this
        new datePicker().init({
            'trigger': '#birth', /* 按钮选择器，用于触发弹出插件*/
            'type': 'date',/* 模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate': '1900-1-1',/* 最小日期*/
            // 'maxDate': new Date().format('yyyy-MM-dd'),/* 最大日期*/
            'maxDate': '2099-1-1',/* 最大日期*/
            /* 确认时触发事件*/
            'onSubmit': function () {
                // ios 浏览器解析new Date解析 2010-01 会出现NaN，转换成 2010/01
                that.my.birthday = this.value.replace(/\-/g, "/")
            },
            /* 取消时触发事件*/
            'onClose': function () {}
        })
    },
    methods: {
        next(data){
            this.chooseTimes = false
        },
        async submit(){
            var item = this.trimObj(this.my)
            if(item.avatar == '') return this.messageTip('头像未上传')
            if(item.name == '') return this.messageTip('姓名未填写')
            if(item.sex === null) return this.messageTip('性别未选择')
            if(item.height == '') return this.messageTip('身高未填写')
            if(item.weight == '') return this.messageTip('体重未填写')
            if(item.birthday == '') return this.messageTip('生日未选择')
            if(item.parentName == '') return this.messageTip('家长姓名未填写')
            if(item.parentPhone == '') return this.messageTip('家长手机未填写')
            if(!(/^1[3|5|6|7|8|9]\d{9}/.test(item.parentPhone))) return this.messageTip('家长手机格式不对')
            item.id = this.userId
            // item.birthday = new Date(item.birthday)
            var res = await this.ajax('/user/edit',{
                id: item.id,
                birthday: new Date(item.birthday),
                name: item.name,
                phone: item.phone,
                avatar: item.avatar,
                height: item.height,
                sex: item.sex,
                weight: item.weight,
                parentName: item.parentName,
                parentPhone: item.parentPhone
            })
            if(res && res.code == this.successCode){
                this.goUrl('/my', item)
            }
        },
        upfile(){
            this.file('', data => {
                this.my.avatar = data.data
            }, this.$refs.upfile)
        }
    }
}
</script>

<style scoped lang="sass">
.h100
    background: #eee

.lbtn
    margin: 0 0.5rem
    width: auto

.block
    margin-bottom: 1rem
    background: #fff
    .each
        overflow: hidden
        line-height: 2.5rem
        border-bottom: 1px solid #eee
        color: #6f6f6f
        padding: 0 1rem
        .fl
            font-size: 0.8rem

        .fr
            height: 2.5rem
            input
                text-align: right
                border: none
            .touxiang
                width: 2rem
                line-height: 1
                margin-top: 0.2rem
            .icon
                width: 0.7rem
                height: 0.7rem
                line-height: 2.6rem
                margin-left: 0.5rem
                text-align: right
                img
                    max-width: 0.7rem
                    max-height: 0.7rem

            .sex
                display: inline-block
                img
                    width: 0.8rem
                    margin: 0 0.2rem 0 0.6rem
                    position: relative
                    top: 0.12rem
</style>
