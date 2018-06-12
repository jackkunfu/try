<template lang="pug">
.h100
    .top
        span 志愿者招募报名表

    .each
        span 姓名：
        input(v-model="item.phone" placeholder="请输入手机号")

    .each
        span 性别：
        select(v-model="item.sex")
            option(checked="checked") 男
            option 女
    .each
        span 年龄：
        input(v-model="item.phone" placeholder="请输入年龄")
    .each
        span 电话：
        input(v-model="item.phone" placeholder="请输入联系电话")
    .each
        span 服务岗位
        select(v-model="item.people")
            option 门诊导引

    .each
        span 服务时间
        input(v-model="item.phone" placeholder="请选择服务时间")
    
    .btn(@click="submit") 提交

</template>

<script>
    export default {
        name: 'sign',
        data () {
            var query = this.$route.query
            return {
                item: {
                    phone: '', pwd: '', sex: ''
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

.top
    text-align: center
    background: #48C4F5
    font-size: 0.9rem
    line-height: 2.3rem
    margin-bottom: 1rem
    color: #fff

.each
    border: 1px solid #48C4F5
    padding: 0.4rem 0.8rem
    position: relative
    overflow: hidden
    margin: 0.8rem
    margin-bottom: 0.5rem
    position: relative
    background: #fff

    input, select
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

