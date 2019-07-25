<template lang="pug">
.h100
    .top
        span 用户登陆
        span.fr 免费注册
    .each
        input(placeholder="请输入注册手机号")
    .each
        input(placeholder="请输入密码")
    
    .btn(@click="loginFun") 登陆

    .fr.fgt 忘记密码
    .clear

</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                login: {
                    phone: '', pwd: ''
                }
            }
        },
        mounted(){
           
        },
        methods: {
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
    background: #f3f3f3

.top
    text-align: center
    background: #48C4F5
    font-size: 0.9rem
    line-height: 2.3rem
    margin-bottom: 1rem
    color: #fff
    .fr
        position: absolute
        // top: 0.3rem
        right: 0.5rem
        font-size: 0.7rem
        color: yellow
    
.each
    margin: 0.8rem
    margin-bottom: 1rem
    position: relative
    background: #fff
    input
        width: 100%
        border: 1px solid #eee
        font-size: 0.7rem
        height: 1.8rem
        padding-left: 0.5rem

.btn
    margin: 0.8rem
    line-height: 2rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    background: #48C4F5
    border-radius: 0.2rem

.fgt
    margin-right: 0.8rem
    font-size: 0.7rem
    color: #888

</style>

