<template lang="pug">
.header
    .left
        img.left(:src='vendorLogo'  alt="")

    .center
        el-menu(theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect")
            template(v-for="(nav, i) in navs")
                //- 无子集
                router-link(v-if="!nav.lists || nav.lists.length<=0" :to="{ path: nav.linkUrl, query:{id: nav.id} }" :key="i")
                    el-menu-item(:index="i+''") {{nav.permissionName}}

                //- 有子集
                el-submenu(v-if="nav.lists && nav.lists.length > 0" :key="i" :index="i+''")
                    template(slot="title") {{nav.permissionName}}
                    router-link(v-for="(item, j) in nav.lists" :to="{ path: item.linkUrl, query:{id: item.id} }" :key="i+'-'+j")
                        el-menu-item(:index="i+'-'+j") {{item.permissionName}}


    .right
        .user 账户：{{user.mobile | mobile}}
            span {{user.userRole}}
        a(@click="logOut") 注销

</template>

<script>
// var userArr = ['店员','店长','区域经理','品牌负责人','管理员','超级管理员','医院'];
export default {
    name: 'head',
    props: ['topNav', 'userInfo'],
    filters: {
        mobile(v){
            var v = '' + v;
            return v.substring(0,3) + '****' + v.substring(v.length-3, v.length)
        },
        // userRole(v){
        //     return userArr[v-1];
        // }
    },
    data() {
        return {
            vendorLogo: localStorage.pdSaasVendorLogo,
            user: {
                mobile: localStorage.pdSaasUserMobile,
                userRole: localStorage.pdSaasUserRole
            },
            activeIndex: '6',
            navs: []
        }
    },
    methods: {
        async logOut(){
            var logout = await tryAwait('get', '/logout', {});
			if(logout.success){
                localStorage.removeItem('pdSaasUserId'); // /user/loginUserInfo
                localStorage.removeItem('pdSaasUserMobile'); // /user/loginUserInfo
                localStorage.removeItem('pdSaasUserRole'); // /user/loginUserInfo
                localStorage.removeItem('pdSaasVendorId');
                this.$router.push('/login');
                this.$message({
					message: '退出成功',
					type: 'success'
				});
			}else{
				this.$message({
					message: logout.msgInfo || '失败',
					type: 'error'
				});
			}
        },
        handleSelect(key, keyPath){
            console.log(key)
            console.log(keyPath)
        }
    },
    watch: {
        // 二级菜单放在watch里因为子组件获取到数据之后，却无变化，所以此处watch处理下
        async topNav(v){
            // 目前只返了第一层，这里处理根据第一层的每个id获取每个的二级
            // async始终返回promise即使已经return具体的值，所以要用await处理下，因为是promise数组，这里用到 Promise.all
            // Promise.all前的await不能少
            this.navs = await Promise.all(
                v.map(async (item)=>{
                    if(item.linkUrl){    // 如果存在linkUrl,说明是顶级目录，不请求子目录了
                        item.lists = [];
                        return item;
                    }
                    var lists = await tryAwait('post', '/permission/itemList', {
                        parentId: item.id
                    })
                    if(lists) item.lists = lists.model || [];;
                    return item;
                })
            )
        }
    }
}
</script>

<style lang='sass' scoped>
    .el-menu--horizontal
        .el-submenu
            .el-submenu__title
                height: 48px!important;
                line-height: 48px!important;

    .header
        min-width: 1100px;
        background-color: #fff;
        height: 48px;
        line-height: 48px;
        background: #1f2d3d;
        color: #fff;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        padding: 0 20px;
        .left
            float: left;
            margin-top: 6px;
            img
                height: 24px;


        .center
            text-align: center;
            display: inline-block;
            //- margin-left: 10%;
            margin-left: 50px;
            // line-height: 30px;
            .el-dropdown
                border-left: 1px solid #2a384c;
                border-right: 1px solid #2a384c;
                display: inline-block;
                margin: 0 20px;
                padding: 0 10px;
                color: #fff;

        .right
            float: right;
            .user
                display: inline-block;
                margin-right: 20px;
                padding-right: 15px;
                border-right: 1px solid #2a384c;
                span
                    display: inline-block;
                    line-height: 1;
                    padding: 3px 5px;
                    border-radius: 4px;
                    background: #00aaee;
                    color: #fff;
                    margin-left: 5px;



</style>
