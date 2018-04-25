<template lang="pug">
#app
    
    template(v-if="!isNeedLogin")

        top.app-top
        //- 左边导航
        .app-main
            left.nav.app-left

            //- 中间导航
            //- center.main-center

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
                el-button(type="primary" @click="onSubmit") 登录

</template>

<script>
import './assets/base.sass'
import Top from './components/part/top'
import Left from './components/part/left'
export default {
    name: 'App',
    components: {
        Top, Left
    },
    data(){
            return {
                form: {
                    userCode: '',
                    userPwsd: ''
                }
            }
    },
    computed: {
        isNeedLogin(){
            return localStorage.zlOpUid === null || localStorage.zlOpUid === undefined || localStorage.zlOpUid === 'undefined'
        }
    },
    mounted(){}
}
</script>
