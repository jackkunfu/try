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
                el-input(v-model="form.userCode")
            el-form-item(label="密码")
                el-input(v-model="form.userPwsd")
            el-form-item
                el-button(type="primary" @click="lgn") 登录

</template>

<script>
import './assets/base.sass'
import Top from './components/top'
import Left from './components/left'
export default {
    name: 'app',
    components: {
        Top, Left
    },
    data(){
        var isNeedLogin = !localStorage.zwMageId || localStorage.zwMageId == 'null' || localStorage.zwMageId == 'undefined'
        return {
            isNeedLogin,
            form: {
                userCode: '',
                userPwsd: ''
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
            localStorage.zwMageId = 1
            location.reload()
            var form = this.form;
            form.userCode = form.userCode.trim();
            form.userPwsd = form.userPwsd.trim();
            if(form.userCode == '') return this.messageTip('用户名不能为空~');
            if(form.userPwsd == '') return this.messageTip('密码不能为空~');
            var res = await this.ajax('', this.form)
        }
    }
}
</script>
