<template lang="pug">
.h100
    .bg
        img(src="../../assets/login_bg@2x.png")

    .top
        img(src="../../assets/activity_logo@2x.png")

    .enroll
        .banzhuren-login(v-if="isBz")
            .each
                img(src="../../assets/login_icon_zhanghao@2x.png")
                input(v-model="bzr.phone" placeholder="请输入账号")
            .each
                img(src="../../assets/login_icon_mima@2x.png")
                input(v-model="bzr.password" type="password" placeholder="请输入密码")
            
            
            .btn(@click="banzhurenLogin") 班主任登陆

        .login(v-if="isLogin")
            .each
                img(src="../../assets/login_icon_zhanghao@2x.png")
                input(v-model="denglu.phone" placeholder="请输入账号")
            .each.with-code
                img(src="../../assets/login_icon_mima@2x.png")
                input(v-model="denglu.code" placeholder="请输入验证码")
                .code(@click="(e)=>{getCode('denglu', e)}") 获取验证码
            .login-tip 若账号未激活，请联系机构
                img(src="../../assets/login_icon_tishi@2x.png")
            
            .btn(@click="goMy") 个人中心登陆

        .baoming(v-if="isBm")
            .each
                img(src="../../assets/login_icon_zhanghao@2x.png")
                input(v-model="login.phone" placeholder="请输入手机号")
            .each.with-code
                img(src="../../assets/login_icon_mima@2x.png")
                input(v-model="login.code" placeholder="请输入验证码")
                .code(@click="(e)=>{getCode('login', e)}") 获取验证码
            
            .btn(@click="baoming") 报名登陆

</template>

<script>
    export default {
        name: 'Login',
        data () {
            var query = this.$route.query;
            var isZhuce = false, isFogt = false, fogtUid = '';
            if(query.type=="isZhuce") isZhuce = true;
            else if(query.type=="isFogt"){
                isFogt = true;
                fogtUid = query.userId;
            }
            return {
                isBz: this.$route.query.type == 0,
                isBm: this.$route.query.type == 1,
                isLogin: this.$route.query.type == 2,
                getEmail: true,
                isZhuce,
                isFogt,
                fogtUid,
                login: {
                    phone: '', code: ''
                },
                bzr: {
                    phone: '',  password: ''
                },
                denglu: {
                    phone: '', code: ''
                },
                codeImage: '/api/defaultKaptcha?t=' + new Date().getTime(),
            }
        },
        mounted(){
            console.log(this.$route.query)
            var query = this.$route.query
            if(query.type && query.type =='isFogt' && query.userId) {
                this.getEmail = false;
                this.fogt.userId = query.userId;
            }
            if(query.type && query.type =='isZhuce'){
                this.zhuce.refereeId = query.userId || '';
                this.$nextTick(()=>{
                    if(this.zhuce.refereeId != ''){
                        this.$refs.rfid.disabled = true;
                    }
                })
            }
        },
        methods: {
            async banzhurenLogin(){
                this.bzr.account = this.bzr.phone.trim()
                this.bzr.password = this.bzr.password.trim()
                var bzr = this.bzr
                if(bzr.account == '' ) return this.messageTip('账户名不能为空~');
                if(bzr.password == '') return this.messageTip('密码不能为空~');
                var res = await this.ajax('/mgr/login', {
                    userName: bzr.account,
                    password: bzr.password,
                    isAdmin: 2
                });
                if(res && res.code == this.successCode){
                    var data = res.data;
                    localStorage.zwgzhUid = data.id;
                    this.goUrl('/banzhuren', { userId: data.id });
                }
            },
            async goMy(){
                this.denglu.phone = this.denglu.phone.trim()
                this.denglu.code = this.denglu.code.trim()
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.denglu.phone)) ) return this.messageTip('手机号格式有误~');
                if(this.denglu.phone == '' ) return this.messageTip('手机号不能为空~');
                if(this.denglu.code == '') return this.messageTip('验证码有误~');
                var res = await this.ajax('/user/login', this.denglu);
                if(res && res.code == this.successCode){
                    var data = res.data;
                    localStorage.zwgzhUid = data.id;
                    this.goUrl('/my', { userId: data.id });
                }
            },
            async baoming(){
                this.login.phone = this.login.phone.trim()
                this.login.code = this.login.code.trim()
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.login.phone)) ) return this.messageTip('手机号格式有误~');
                if(this.login.phone == '' ) return this.messageTip('手机号不能为空~');
                if(this.login.code == '') return this.messageTip('验证码有误~');
                var res = await this.ajax('/user/login', this.login);
                if(res && res.code == this.successCode){
                    var data = res.data;
                    localStorage.zwgzhUid = data.id;
                    this.goUrl('/baoming', { userId: data.id, data: this.login });
                }
            },
            async getCode(key, e){
                if(e.target.innerHTML.indexOf('s') > -1) return

                if(this[key].phone.trim() == '') return this.messageTip('手机号不能为空')
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test( this[key].phone.trim() )) ) return this.messageTip('手机号格式有误~');

                var res = await this.ajax('/index/sms', {
                    mobile: this[key].phone
                }, 'get')

                if(res && res.code == this.successCode){
                    this.messageTip('短信发送成功', 1)
                    let t = 60
                    let a = setInterval(()=>{
                        t = t-1
                        e.target.innerHTML = t + ' s'
                        if(t == 0){
                            clearInterval(a)
                            e.target.innerHTML = '获取验证码'
                        }
                    }, 1000)
                }else this.messageTip(res.message)
            }
            // async loginFun(){
            //     var login = this.login;
            //     login.phone = login.phone.trim();
            //     login.pwd = login.pwd.trim();
            //     if(login.phone == '') return this.messageTip('手机号不能为空~');
            //     if(login.pwd == '') return this.messageTip('密码不能为空~');

            //     var res = await this.ajax('/api/user/login', this.login);
            //     if(res && res.status == 200){
            //         var data = res.data;
            //         localStorage.tb_tk = data.token;
            //         localStorage.tb_userInfo = JSON.stringify(data.tbUser);
            //         this.goUrl('/vipCenter', { tb_tk: data.token, tb_userInfo: JSON.stringify(data.tbUser) });
            //     }
            // },
            // async zhuceFun(){
            //     var zhuce = this.zhuce;
            //     if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(zhuce.phone.trim())) ) return this.messageTip('手机号格式有误~');
            //     if( zhuce.code.trim() == '' ) return this.messageTip('验证码不能为空~');
            //     if( zhuce.password.trim() == '') return this.messageTip('密码不能为空~');
            //     if( zhuce.password.trim().length < 6 ) return this.messageTip('密码须6位及以上~');
            //     // if(zhuce.password.trim() != zhuce.password1.trim()) return this.messageTip('两次输入密码不一致~');
            //     if( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(zhuce.email) == false ) return this.messageTip('邮箱格式不正确~');
            //     var opt = Object.assign({}, this.zhuce)
            //     delete opt.password1;
            //     // if(opt.refereeId.trim() == '') opt.refereeId = -1;
            //     var res = await this.ajax('/api/user/register', opt);
            //     if(res && res.status == 200){
            //         this.messageTip('注册成功，请登陆~', 1);
            //         this.isZhuce = false;
            //         this.isFogt = false;
            //     }
            // },
            // async fogtFun(){
            //     var code = this.fogt.code.trim();
            //     var phone = this.fogt.phone.trim();
            //     if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone)) ) return this.messageTip('手机号格式有误~');
            //     // if( code == '' ) return this.messageTip('密码不能为空~');
            //     // if( code.length < 6 ) return this.messageTip('密码须6位及以上~');
            //     var res = await this.ajax('/api/user/findPwd', { code, phone });
                
            //     if(res && res.status == 200){
            //         this.messageTip(res.msg || '请查收邮件~', true);
            //         // this.isFogt = false;
            //     }else{
            //         this.messageTip(res.msg || '请求失败，请稍后重试~');
            //     }

            // },
            // async changePws(){
            //     var userId = this.fogt.userId;
            //     var pwd = this.fogt.password.trim();
            //     var pwd2 = this.fogt.password1.trim();
            //     if( pwd == '' ) return this.messageTip('密码不能为空~');
            //     if( pwd.length < 6 ) return this.messageTip('密码须6位及以上~');
            //     if(pwd!=pwd2) return this.messageTip('两次密码不一致~');
            //     var res = await this.ajax('/api/user/changePwd/'+ userId,{userId,pwd,pwd2})
            //     if(res&&res.status==200){
            //         this.messageTip(res.msg || '密码修改成功~', true);
            //         this.isFogt = false;
            //     }else{
            //         this.messageTip(res.msg || '请求失败，请稍后重试~');
            //     }
            // },
        }
    }
</script>

<style lang="sass" scoped>
.bg
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: -1
    img
        width: 100%
        height: auto

.top
    text-align: center
    img
        width: 70%
        margin: 2rem auto

.enroll
    margin: 4rem auto 0
    width: 15rem

.each
    border-bottom: 1px solid #e3e3e3
    padding: 0.4rem 0
    // width: 15rem
    // margin: 1.5rem auto
    margin-bottom: 1.5rem
    position: relative
    &.with-code
        width: 10rem
    img
        width: 0.9rem
        margin-right: 0.9rem
        float: left
    input
        border: none
        color: #9b9b9b
        line-height: 1rem
        width: 6rem

    .code
        position: absolute
        right: -5rem
        top: 0.2rem
        width: 4.4rem
        height: 1.5rem
        line-height: 1.4rem
        text-align: center
        font-size: 0.6rem
        color: #48C4F5
        float: right
        border: 1px solid #48C4F5
        border-radius: 1.5rem


.login-tip
    width: 15rem
    margin: 0 auto
    color: #48C4F5
    img
        width: 0.88rem
        float: left
        margin-right: 0.3rem

.btn
    width: 15rem
    margin: 2rem auto
    background-image: linear-gradient(-45deg, #76D5FA 0%, #0BACEE 100%)
    box-shadow: 0 2px 6px 0 rgba(64,190,246,0.50)
    line-height: 2.1rem
    text-align: center
    color: #fff
    font-size: 0.8rem
    border-radius: 2.1rem

// .enroll
//     padding: 0.6rem 0.35rem;
//     text-align: left;
//     font-size: 0.45rem;

//     .box
//         width: 100%;
//         display: inline-block;
//         height: 1.28rem;
//         border-radius: 4px;
//         border: 1px solid #ccc;
//         padding: 0.2rem;
//         color: #888;
//         margin-bottom: 0.4rem;
//         font-size: 0.4rem;
 
//         &.short
//             width: 6rem;
//             input
//                 width: 3rem;
        
//         &.code-box
//             position: relative;
//             width: 3rem;
//             float: right;
//             padding: 0;
//             margin-right: 1rem;
//             img
//                 display: inline-block;
//                 width: 100%;
//                 height: 100%;
//                 border-radius: 4px;
//             .get-code
//                 width: 0.6rem;
//                 position: relative;
//                 height: 0.5rem;
//                 left: 3.3rem;
//                 top: -0.9rem;
//         .label
//             width: 2.5rem;
//             line-height: 0.88rem;
//             float: left;

//         input
//             height: 0.88rem;
            

//     .sign

    
</style>

