<template lang="pug">
.h100
    .top
        .half.border 成员姓名
        .half 状态

    .main
        .item(v-for="(item, i) in stuList" :key="i")
            .w50
                // img.img(:src="item.img")
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
            text: '',
            stuList: [],
            curReasonItem: null,
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
                if(res && res.code == this.successCode) this.stuList = res.data.rows || []
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
                this.goUrl('/dianmingOk')
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
.h100
    overflow: hidden

.item
    margin-bottom: 0
    padding: 0.5rem 0
    &:nth-of-type(2n-1)
        background: #fafafa

.top
    position: absolute
    top: 0
    left: 0
    width: 100%

.main
    height: 100%
    overflow: auto
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
    background: #48C4F5
    
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

.w50
    text-align: center
    .img
        width: 1.7rem
        height: 1.7rem
        border-radius: 50%
        vertical-align: middle
        margin-right: 0.35rem
    .icon
        wdth: 1.4rem
        margin: 0 0.6rem
        vertical-align: middle
</style>
