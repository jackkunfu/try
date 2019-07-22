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
        input#birth(v-model="item.time" placeholder="请选择服务时间" readonly)
    
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
                    that.item.time = this.value.replace(/\-/g, "/")
                },
                /* 取消时触发事件*/
                'onClose': function () {}
            })
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

