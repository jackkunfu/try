<template lang="pug">
    .login.box
        .row
            .title 用户登录
        .row
            input(type="text", placeholder="手机/用户名" v-model="phone")
        .row
            input(type="text", placeholder="密码" v-model="password")
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
            var _this = this;
            this._fentchData('post', '/login', {
                phone: this.phone,
                password: this.password
            }, function(d){
                
                window.localStorage.pdApiUserId = d.id
                console.log(d)
                d.success && _this.$router.push('/manage')
            })
            
        }
    }
}
</script>

<style lang="less" scope>
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
    