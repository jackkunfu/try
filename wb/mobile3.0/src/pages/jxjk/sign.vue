<template lang="pug">
.h100
    .each
        span 姓名：
        input(v-model="login.phone" placeholder="请输入姓名")
    .each
        span 性别：
        input.radio(type="radio" name="sex")
        | 男
        input.radio(type="radio" name="sex")
        | 女
    .each
        span 身份证号：
        input(v-model="login.phone" placeholder="请输入身份证号")
    .each
        span 联系电话：
        input(v-model="login.phone" placeholder="请输入联系电话")
    
    .btn(@click="submit") 提交

</template>

<script>
    export default {
        name: 'sign',
        data () {
            var query = this.$route.query
            return {
                login: {
                    phone: '', pwd: ''
                }
            }
        },
        mounted(){
        },
        methods: {
            async submit(){
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
    padding-top: 1rem

.each
    border: 1px solid #48C4F5
    padding: 0.4rem 0.8rem
    position: relative
    overflow: hidden
    margin: 0.8rem
    margin-bottom: 0.5rem
    position: relative
    background: #fff

    input
        float: right
        width: 10rem
        border: none
        outline: none
        color: #9b9b9b
        line-height: 1rem
        &.radio
            width: auto
            float: none
            margin-left: 3.3rem
.btn
    position: relative
    margin: 0.8rem
    line-height: 2.1rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    border-radius: 0.4rem
    background: #48C4F5

</style>

