<template lang="pug">
.bg
    .login
        .box
            .label 手机号
            input(v-model="login.mobile" placeholder="请输入手机号")

        .box
            .label 联系姓名
            input(v-model="login.name" placeholder="请输入联系姓名")

        .btn(@click="loginFun") 提交咨询

    .btn-ctn
        .btn.btn1
            a(href="tel:114") 拨打电话
        .btn
            a(href="https://static.meiqia.com/dist/standalone.html?_=t&eid=107081") 立即咨询

</template>

<script>
    export default {
        name: 'marketing',
        data () {
            return {
                login: {
                    phone: '', name: ''
                }
            }
        },
        mounted(){},
        methods: {
            async loginFun(){
                var login = this.login;
                login.mobile = login.mobile.trim();
                login.name = login.name.trim();
                if(login.mobile == '') return this.messageTip('手机号不能为空~');
                if(login.name == '') return this.messageTip('姓名不能为空~');
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(login.mobile)) ) return this.messageTip('手机号格式有误~');

                var res = await this.ajax('/app/mls/user?name='+login.name+'&mobile='+login.mobile, {}, 'get');
                if(res && res.code == 1){
                    this.messageTip(res.msg || '提交成功~');
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.bg
    background-image: url('../assets/bg.jpg')
    background-size: 100% 100%
    width: 100%
    height: 100%
    padding: 2rem 0

.login
    width: 80%;
    margin: 0 auto;
    padding: 0.6rem 0.35rem;
    text-align: left;
    font-size: 0.45rem;
    
    .box
        width: 100%;
        display: inline-block;
        height: 1.28rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 0.2rem;
        color: #888;
        margin-bottom: 0.4rem;
        font-size: 0.4rem;
     
        .label
            width: 2.5rem;
            line-height: 0.88rem;
            float: left;
            color: #fff;

        input
            height: 0.88rem;
            background: none

.btn
    a
        color: #fff;
        text-decoration: none;

.btn-ctn
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 
    .btn
        width: 30%
        margin: 3% 10%
        float: left
        &.btn1
            background: #fff;
            a
                color: #666
            
</style>

