<template lang="pug">
.h100

    class-times(v-if="chooseTimes" @next="next" @close="chooseTimes=false")

    .fix(v-if="ok")
        .box 
            span 恭喜您体验课报名成功
            .ensure
                span(@click="goUrl('/myset')") 确定

    .bg
        img(src="../../assets/activity_bg@2x.png")

    .top
        img(src="../../assets/activity_logo@2x.png")

    .enroll
        .each
            span 姓名：
            input(v-model="login.phone" placeholder="请输入手机号")
        .each
            span 联系方式：
            input(v-model="login.phone" placeholder="请输入手机号")
        .each
            span 城市：
            input(v-model="login.phone" placeholder="请输入手机号")
        .each
            span 训练营：
            select(v-model="login.phone" placeholder="请输入手机号")
                option 1
        .each
            span 上课时间：
            .fr(@click="chooseTimes=true") 请选择上课时间
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
        data () {
            var query = this.$route.query
            return {
                ok: false,
                chooseTimes: false,
                getEmail: true,
                login: {
                    phone: '', pwd: ''
                }
            }
        },
        mounted(){
            var query = this.$route.query
            if(query.type && query.type =='isFogt' && query.userId) {
                this.getEmail = false;
                this.fogt.userId = query.userId;
            }
        },
        methods: {
            baoming(){
                this.ok = true
                // this.goUrl('/banzhuren')
            },
            next(data){
                console.log(data)
                this.chooseTimes = false
            },
            async loginFun(){
                var login = this.login;
                login.phone = login.phone.trim();
                login.pwd = login.pwd.trim();
                if(login.phone == '') return this.messageTip('手机号不能为空~');
                if(login.pwd == '') return this.messageTip('密码不能为空~');

                var res = await this.ajax('/api/user/login', this.login);
                if(res && res.status == 200){
                    var data = res.data;
                    localStorage.tb_tk = data.token;
                    localStorage.tb_userInfo = JSON.stringify(data.tbUser);
                    this.goUrl('/vipCenter', { tb_tk: data.token, tb_userInfo: JSON.stringify(data.tbUser) });
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.h100
    background: #fff
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

