<template lang="pug">
.h100
    .top
        .half.border 成员姓名
        .half 状态

    .main
        .item(v-for="(item, i) in stuList" :key="i")
            .w50(style="text-align:left;padding-left:2rem;")
                span(@click="seeInfo(item)")
                    img.img(:src="config.imgPath+item.avatar")
                    span {{item.name}}
            .w50
                img.icon(src="../../assets/choose_btn_n@2x.png" v-if="item.type!=0" @click="dianming(0, item)")
                img.icon(src="../../assets/choose_btn_s@2x.png" v-else @click="dianming(0, item)")

                img.icon(src="../../assets/Sign_icon_l_n@2x.png" v-if="item.type!=1" @click="dianming(1, item)")
                img.icon(src="../../assets/Sign_icon_l_s@2x.png" v-else @click="dianming(1, item)")


                img.icon(src="../../assets/Sign_icon_w_n@2x.png" v-if="item.type!=2" @click="dianming(2, item)")
                img.icon(src="../../assets/Sign_icon_w_s@2x.png" v-else @click="dianming(2, item)")

    .submit(v-if="isDone===true" style="background:#ccc;") 已签到
    .submit(@click="submit" v-if="isDone===false") 提交签到
    
    fixCover(:str="showText" titleName="请假条")
        textarea(v-model="text")
        div
            .btn.no(@click="closeText") 取消
            .btn(@click="submitText") 提交

    fixCover.info(:str="showInfo" :titleName="curInfo.name" v-if="curInfo")
        span(style="width:100%;font-size:0.8rem;color:#000;") 姓名：{{curInfo.name}}
        // span 性别：{{curInfo.sex | sex}}
        span 身高：{{curInfo.height}} cm
        span 体重：{{curInfo.weight}} kg
        span(style="width:100%;") 生日：{{curInfo.birthday | split}}
        span 家长：{{curInfo.parentName}}
        span(style="width:100%;") 电话：{{curInfo.parentPhone}}
        span 学员等级：{{curInfo.lv ? '等级'+curInfo.lv : '入门级'}}
        div(style="clear:both;")
            .btn(@click="closeInFo") 确定

</template>

<script>
import fixCover from '../part/fix-cover'
export default {
    name: 'course',
    components: { fixCover },
    data () {
        var query = this.$route.query
        return {
            query,
            showText: false,
            showInfo: false,
            text: '',
            stuList: [],
            curReasonItem: null,
            curInfo: null,
            isDone: null     // 是否已经提交签到了
        }
    },
    async mounted(){
        var detail = await this.ajax('/sign/detail', {
            planId: this.query.id
        })
        if(detail && detail.code == this.successCode){
            if(detail.data.length == 0){
                this.isDone = false

                var res = await this.ajax('/user/list', {
                    trainId: this.query.trainId,
                    week: this.query.week,
                    begin: this.query.begin,
                    end: this.query.end,
                    limit: 10000,
                    offset: 0
                }, 'get')
                if(res && res.code == this.successCode){
                    if(res.data.rows){
                        this.stuList = res.data.rows.map(el => {
                            if(!el.avatar) el.avatar = require('../../assets/touxiang.png')
                            else el.avatar = this.config.imgPath + el.avatar
                            return el
                        })
                    }
                }
                this.stuList.forEach(el => {
                    this.$set(el, 'type', 0)
                })
            }else{
                this.isDone = true
                this.stuList = detail.data.map(v => {
                    v.user.type = v.type
                    v.user.remarks = v.remarks
                    return v.user
                })
            }
        }
    },
    methods: {
        seeInfo(item){
            console.log(item)
            this.curInfo = item
            this.showInfo = true
        },
        async submit(){
            var res = await this.ajax('/sign/add', {
                userId: this.query.userId,
                type: 0,
                planId: this.query.id,
                sign: JSON.stringify( this.stuList.map(v => {
                    return {
                        userId: v.id,
                        type: v.type,
                        remarks: v.remark || ''
                    }
                }) )
            })
            if(res && res.code == this.successCode){
                this.goUrl('/dianmingOk', { userId: this.query.userId })
            }else this.messageTip(res.message || '请求失败~')
        },
        dianming(type, item){
            item.type = type

            if(type === 1){
                this.curReasonItem = item
                this.showText = true
                this.text = item.remark || ''
            }else{
                delete item.remark
            }

            // this.changeType(item, type);
        },
        async changeType(item, type){
            var res = await this.ajax('/aa', {
                id: item.id,
                type
            })
            if(res && res.code == this.successCode){}
            else this.messageTip(res.message || '请求失败~')
        },
        closeText(){
            this.showText = false
            this.text = ''
        },
        closeInFo(){
            this.showInfo = false
            this.text = ''
        },
        async submitText(){
            if(this.text.trim() == '') return this.messageTip('请假原因不能为空~')

            this.curReasonItem.remark = this.text.trim()

            this.text = ''
            this.showText = false

            // var res = await this.ajax('/aa', {
            //     text: this.text.trim()
            // })
            // if(res && res.code == this.successCode){
            //     this.text = ''
            //     this.showText = false
            // }else this.messageTip(res.message || '请求失败~')
            
        },
    }
}
</script>

<style scoped lang="sass">
.info
    overflow: hidden
    span
        font-size: 0.7rem
        margin: 0.2rem 0
        display: block
        float: left
        width: 50%
        text-align: left

.h100
    overflow: hidden

.item
    margin-bottom: 0
    padding: 0.4rem 0
    &:nth-of-type(2n-1)
        background: #fafafa

.top
    position: absolute
    top: 0
    left: 0
    width: 100%

.main
    height: 100%
    overflow: scroll
    padding: 2.9rem 0 2.9rem

.submit
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 2.4rem
    line-height: 2.4rem
    text-align: center
    font-size: 0.9rem
    color: #fff
    background: #81B7E9
    
.half
    width: 50%
    display: inline-block
    text-align: center
    line-height: 1.3rem
    padding: 0.6rem 0
    color: #646464
    background: #fff
    &.border
        border-right: 1px solid #e3e3e3

.item
    .w50
        text-align: center
        .img
            width: 2.2rem
            height: 2.2rem
            border-radius: 50%
            vertical-align: middle
            margin-right: 0.35rem
        .icon
            width: 1.5rem
            height: auto
            margin: 0 0.6rem
            vertical-align: middle
</style>
