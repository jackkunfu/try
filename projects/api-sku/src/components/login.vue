<template lang="pug">
    .login.box
        .row
            .title 用户登录
        .row
            input(type="text", placeholder="手机/用户名" v-model="phone" name="phone")
        .row
            input(type="text", placeholder="密码" v-model="password" name="password")
        .row
            .login-btn(@click="login") 登录
</template>
   

<script>
function getUserInfo(d){
    var userDate = d

    return function(){
        return userDate
    }
}
export default {
    name: 'login',
    data () {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        login(){

            // var xhr = new XMLHttpRequest()
            // xhr.open('get', 'http://172.16.8.86:9999/login')
            // xhr.onload = function () {
            //     console.log('load:', xhr.getAllResponseHeaders())
            //     console.log('=================================')
            // }
            // xhr.send({
            //     phone: 18297389525,
            //     password: 18297389525
            // })


            var _this = this;
            this._fentchData('post', '/login', {
                phone: this.phone,
                password: this.password
            }, function(d, status, xhr){
                
                document.cookie = "acToken=" + d.model.token + ";path=/;domain=127.0.0.1:8080";
                window.localStorage.pdApiUserId = d.model.id
                window.localStorage.token = d.model.token

                d.success && _this.$router.push('/')
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
body{
    background: #669999;
    .login{
        width: 300px;
        margin: 200px auto;
        .row{
            margin: 20px 0;
            .title{
                font-size: 20px;
                line-height: 1;
                color: #669999;
            }
            input{
                width: 100%;
                border: none;
                border-bottom: 1px solid #339999;
                border-radius: 8px;
                height: 30px;
                padding: 5px 10px;
            }
            .login-btn{
                text-align: center;
                font-size: 14px;
                line-height: 35px;
                background: #669999;
                color: #FFF;
                border-radius: 8px;
                cursor: pointer;
            }
        }
        
    }
}


</style>
    