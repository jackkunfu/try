<template lang="pug">

    .enroll
        .login(v-show="!isFogt && !isZhuce")
            .box
                .label 手机号
                input(v-model="login.phone" placeholder="请输入手机号")

            .box
                .label 密码
                input(v-model="login.pwd" type="password" placeholder="请输入密码")

            .btn(@click="loginFun") 登陆

            .left(@click="isFogt=true;isZhuce=false;") 找回密码
            .right.theme-color(@click="isZhuce=true;isFogt=false;") 免费注册

        .sign-in(v-show="isZhuce")
            .box
                .label 手机号
                input(v-model="zhuce.phone" placeholder="请输入手机号")
            .box.short
                .label 验证码
                input(v-model="zhuce.code" placeholder="请输入验证码")
            .box.code-box
                img(:src="codeImage")
                img.get-code(src="../img/change@3x.png" @click="getCode")
            .box
                .label 设置密码
                input(v-model="zhuce.password" type="password" placeholder="请输入密码")
            .box
                .label 昵称
                input(v-model="zhuce.nikeName" placeholder="请输入昵称")
            .box
                .label 邮箱
                input(v-model="zhuce.email" placeholder="请输入邮箱")
            .box
                .label 推荐人ID
                input(v-model="zhuce.refereeId" type="number" placeholder="请输入推荐人ID（数字）" ref="rfid")

            .btn(@click="zhuceFun") 注册

            .left(@click="isFogt=true;isZhuce=false;getCode()") 找回密码
            .right.theme-color(@click="isZhuce=isFogt=false;") 已有账号登陆


        .foft(v-show="isFogt")
            div(v-if="getEmail")
                .box
                    .label 手机号
                    input(v-model="fogt.phone" placeholder="请输入手机号")
                .box.short
                    .label 验证码
                    input(v-model="fogt.code" placeholder="请输入验证码")
                .box.code-box
                    img(:src="codeImage" @click="getCode")
                    img.get-code(src="../img/change@3x.png" @click="getCode")
                .btn(@click="fogtFun") 提交

            div(v-if="!getEmail")
                .box
                    .label 设置密码
                    input(v-model="fogt.password" type="password" placeholder="请输入密码")
                .box
                    .label 确认密码
                    input(v-model="fogt.password1" type="password" placeholder="请再次输入密码")

                .btn(@click="changePws") 提交

            .left(@click="isZhuce=true;isFogt=false;getCode()") 免费注册
            .right.theme-color(@click="isZhuce=isFogt=false;") 已有账号登陆

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
                getEmail: true,
                isZhuce,
                isFogt,
                fogtUid,
                login: {
                    phone: '', pwd: ''
                },
                zhuce: {
                    phone: '', code: '', password: '', password1: '', nikeName: '', email: '', refereeId: ''
                },
                fogt: {
                    phone: '', code: '', password: '', password1: '',userId: ''
                },
                codeImage: '/api/defaultKaptcha?t=' + new Date().getTime()
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
            },
            async zhuceFun(){
                var zhuce = this.zhuce;
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(zhuce.phone.trim())) ) return this.messageTip('手机号格式有误~');
                if( zhuce.code.trim() == '' ) return this.messageTip('验证码不能为空~');
                if( zhuce.password.trim() == '') return this.messageTip('密码不能为空~');
                if( zhuce.password.trim().length < 6 ) return this.messageTip('密码须6位及以上~');
                // if(zhuce.password.trim() != zhuce.password1.trim()) return this.messageTip('两次输入密码不一致~');
                if( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(zhuce.email) == false ) return this.messageTip('邮箱格式不正确~');
                var opt = Object.assign({}, this.zhuce)
                delete opt.password1;
                // if(opt.refereeId.trim() == '') opt.refereeId = -1;
                var res = await this.ajax('/api/user/register', opt);
                if(res && res.status == 200){
                    this.messageTip('注册成功，请登陆~', 1);
                    this.isZhuce = false;
                    this.isFogt = false;
                }
            },
            async fogtFun(){
                var code = this.fogt.code.trim();
                var phone = this.fogt.phone.trim();
                if( !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone)) ) return this.messageTip('手机号格式有误~');
                // if( code == '' ) return this.messageTip('密码不能为空~');
                // if( code.length < 6 ) return this.messageTip('密码须6位及以上~');
                var res = await this.ajax('/api/user/findPwd', { code, phone });
                
                if(res && res.status == 200){
                    this.messageTip(res.msg || '请查收邮件~', true);
                    // this.isFogt = false;
                }else{
                    this.messageTip(res.msg || '请求失败，请稍后重试~');
                }

            },
            async changePws(){
                var userId = this.fogt.userId;
                var pwd = this.fogt.password.trim();
                var pwd2 = this.fogt.password1.trim();
                if( pwd == '' ) return this.messageTip('密码不能为空~');
                if( pwd.length < 6 ) return this.messageTip('密码须6位及以上~');
                if(pwd!=pwd2) return this.messageTip('两次密码不一致~');
                var res = await this.ajax('/api/user/changePwd/'+ userId,{userId,pwd,pwd2})
                if(res&&res.status==200){
                    this.messageTip(res.msg || '密码修改成功~', true);
                    this.isFogt = false;
                }else{
                    this.messageTip(res.msg || '请求失败，请稍后重试~');
                }
            },
            async getCode(){
                var t = new Date().getTime();
                this.codeImage =  '/api/defaultKaptcha?t='+t;
            }
        }
    }
</script>

<style lang="sass" scoped>
.enroll
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
 
        &.short
            width: 6rem;
            input
                width: 3rem;
        
        &.code-box
            position: relative;
            width: 3rem;
            float: right;
            padding: 0;
            margin-right: 1rem;
            img
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 4px;
            .get-code
                width: 0.6rem;
                position: relative;
                height: 0.5rem;
                left: 3.3rem;
                top: -0.9rem;
        .label
            width: 2.5rem;
            line-height: 0.88rem;
            float: left;

        input
            height: 0.88rem;
            

    .sign

    
</style>

