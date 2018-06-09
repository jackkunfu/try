<template lang="pug">
.h100
    .top
        .half.border 成员姓名
        .half 状态

    .main
        .item(v-for="(item, i) in stuList" :key="i")
            .w50
                img.img(:src="item.img")
                span {{item.name}}
            .w50
                img.icon(src="../../assets/choose_btn_n@2x.png" v-if="item.type!=0" @click="dianming(0, item)")
                img.icon(src="../../assets/choose_btn_s@2x.png" v-else @click="dianming(0, item)")

                img.icon(src="../../assets/Sign_icon_l_n@2x.png" v-if="item.type!=1" @click="dianming(1, item)")
                img.icon(src="../../assets/Sign_icon_l_s@2x.png" v-else @click="dianming(1, item)")


                img.icon(src="../../assets/Sign_icon_w_n@2x.png" v-if="item.type!=2" @click="dianming(2, item)")
                img.icon(src="../../assets/Sign_icon_w_s@2x.png" v-else @click="dianming(2, item)")

    .submit 提交签到

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
        return {
            showText: false,
            text: '',
            stuList: [{name: '张三', type: 0},{name: '张三', type: 1},{name: '张三', type: 2},{name: '张三', type: 0},{name: '张三', type: 1},{name: '张三', type: 2},{name: '张三', type: 0},{name: '张三', type: 1},{name: '张三', type: 2},{name: '张三', type: 2},{name: '张三', type: 2},{name: '张三', type: 2},{name: '张三', type: 2},{name: '张三', type: 2}]
        }
    },
    methods: {
        dianming(type, item){
            item.type = type
            if(type == 1){
                this.showText = true
            }
            // if(item.type === type) item.type == null
            // else item.type = type
        },
        closeText(){
            this.showText = false
            this.text = ''
            this.goUrl('/dianmingOk')
        },
        async submitText(){
            if(this.text.trim() == '') return this.messageTip('请假原因不能为空~')
            var res = await this.ajax('/aa', {
                text: this.text.trim()
            })
            if(res && res.code == this.successCode){
                this.showText = false
            }else this.messageTip(res.msg || '请求失败~')
            
        },
    }
}
</script>

<style scoped lang="sass">
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
        height: 1rem
        margin: 0 0.5rem
        vertical-align: middle
</style>
