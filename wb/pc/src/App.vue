<template lang="pug">
#app
    
    template(v-if="!isNeedLogin")

        top.app-top
        //- 左边导航
        .app-main
            left.nav.app-left

            router-view.main
            
    //- 登录页
    .login(v-if="isNeedLogin")
        .name 郑武体育管理后台
        //- img(src="../assets/logo.png")
        el-form(:model="form" label-width="80px")
            el-form-item(label="用户名")
                el-input(v-model="form.userName")
            el-form-item(label="密码")
                el-input(v-model="form.password")
            el-form-item
                el-button(type="primary" @click="lgn") 登录

</template>

<script>
import md5 from 'md5'
import './assets/base.sass'
import Top from './components/top'
import Left from './components/left'
export default {
    name: 'app',
    components: {
        Top, Left
    },
    data(){
        var isNeedLogin = !localStorage.zwManageUid || localStorage.zwManageUid == 'null' || localStorage.zwManageUid == 'undefined'
        return {
            isNeedLogin: isNeedLogin,
            form: {
                userName: '',
                password: ''
            }
        }
    },
    mounted(){
        if(!this.isNeedLogin){
            setTimeout(()=>{     //  延迟跳转到默认得studentList页面  不延迟得话  this.$route.path 最初一直是 '/'  再别得页面时也总会跳转到studentList页面
                console.log(this.$route.path);
                if(this.$route.path === '/') this.goUrl('/studentList')
            }, 500)
        }
    },
    methods: {
        async lgn(){
            // localStorage.zwMageId = 1
            // location.reload()
            var form = this.form;
            form.userName = form.userName.trim();
            form.password = form.password.trim();
            if(form.userName == '') return this.messageTip('用户名不能为空~');
            if(form.password == '') return this.messageTip('密码不能为空~');
            var loading = this.$loading()
            var res = await this.ajax('/mgr/login', {
                userName: this.form.userName.trim(),
                // password: md5(this.form.password.trim())
                password: this.form.password.trim()
            })
            loading.close()
            if(res && res.code == this.successCode){
                localStorage.zwManageUid = res.data.id
                location.reload()
                // localStorage.zwManageMd5 = res.randomKey
            }else this.messageTip(res.message || '请求失败，请稍后重试')
        }
    }
}
</script>
