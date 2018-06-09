<template lang="pug">
.h100

    class-times.cover(v-if="chooseTimes" @next="next")

    .block
        .each
            .fl 上课时间
            .fr(@click="chooseTimes=true") 选择上课时间
                .icon.fr
                    img(src="../../assets/xia.png")

    .block
        .each
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
                span.sex(@click="my.sex=0")
                    img(src='../../assets/choose.png' v-if="my.sex === 0")
                    img(src='../../assets/nochoose.png' v-else)
                    span 男

                span.sex(@click="my.sex=1")
                    img(src='../../assets/choose.png' v-if="my.sex === 1")
                    img(src='../../assets/nochoose.png' v-else)
                    span 女
                
        .each
            .fl 身高
            .fr
                input(v-model="my.height" placeholder="请输入学员身高(cm)")
        .each
            .fl 体重
            .fr
                input(v-model="my.weight" placeholder="请输入学员体重(kg)")
        .each
            .fl 生日
            .fr
                span#birth {{my.birth || '出生日期'}}
                // input(v-model="my.name" placeholder="请输入学员姓名")

    .block
        .each
            .fl 家长姓名
            .fr
                input(v-model="my.name" placeholder="请输入家长姓名")

        .each
            .fl 联系电话
            .fr
                input(v-model="my.phone" placeholder="请输入联系电话")

    .lbtn 保存

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
            chooseTimes: false,
            my: {
                img: '',
                name: '',
                sex: null,
                weight: '',
                height: '',
                birth: '',
                phone: ''
            }
        }
    },
    computed: {
        touxiang(){
            return this.my.img ? this.my.img : require('../../assets/touxiang.png')
        }
    },
    mounted(){
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
                that.my.birth = this.value.replace(/\-/g, "/")
            },
            /* 取消时触发事件*/
            'onClose': function () {}
        })
    },
    methods: {
        next(data){
            let choose = data.filter(element => element.check)
            if(choose.length == 0) return this.messageTip('请选择上课时间~')
            this.chooseTimes = false
        }
    }
}
</script>

<style scoped lang="sass">
.h100
    background: #eee
    position: relative
    .cover
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0

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
                img
                    width: 0.8rem
                    margin: 0 0.2rem 0 0.6rem
                    position: relative
                    top: 0.12rem
</style>
