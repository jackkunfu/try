<template lang="pug">
.header
    .left
        img.left(:src='vendorLogo'  alt="")

    .center

        el-menu(theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect" router)
            template(v-for="(nav, i) in navs")

                el-menu-item(v-if="!nav.children || nav.children.length<=0" :index="nav.url") {{nav.name}}

                //- 有子集
                el-submenu(v-if="nav.children && nav.children.length > 0" :index="i+''")
                    template(slot="title") 
                        i.nav-icon(v-if="nav.extra!=null" :class="nav.extra.icon")
                        span {{nav.name}}

                    el-menu-item(v-for="(item, j) in nav.children" :key="i+'-'+j" :index="item.url") {{item.name}}

                    //- el-menu-item(v-for="(item, j) in nav.lists" :key="i+''+j" :index="i+''+j")
                        a(:href="item.linkUrl" style="display:block") {{item.permissionName}}

    .right
        .user 账户：{{user.mobile | mobile}}
            span {{user.userRole}}
        a(@click="logOut") 注销

</template>

<script>
// var userArr = ['店员','店长','区域经理','品牌负责人','管理员','超级管理员','医院'];
var saasUser = localStorage.saasUser ? JSON.parse(localStorage.saasUser) : {};
export default {
    name: 'head',
    props: ['topNav'],
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
            // vendorLogo: localStorage.pdSaasVendorId == '2'?  'http://prd-static-image-files.oss-cn-hangzhou.aliyuncs.com/Saas2/pudong.png' : 'http://prd-static-image-files.oss-cn-hangzhou.aliyuncs.com/Saas2/yishu.png' ,
            vendorLogo: saasUser.vendor_logo_url || '',
            user: {
                // mobile: localStorage.pdSaasUserMobile,
                // userRole: localStorage.pdSaasUserRole
                mobile: saasUser.mobile,
                userRole: saasUser.perm_role_name
            },
            activeIndex: '1',
            navs: this.topNav
        }
    },
    mounted () {
        var vId = saasUser.vendor_id;
        if(vId == '12'){
            this.vendorLogo = localStorage.pdSaasVendorLogo;
        }else{
            this.vendorLogo = vId == '2' ? 'http://prd-static-image-files.oss-cn-hangzhou.aliyuncs.com/Saas2/pudong.png' : 'http://prd-static-image-files.oss-cn-hangzhou.aliyuncs.com/Saas2/yishu.png' ;
        }
    },
    methods: {
        async logOut(){
            this.$router.push('/login');
            localStorage.removeItem('saas_loginId'); 
            localStorage.removeItem('saas_se'); 
            localStorage.removeItem('saas_mobile'); 
            localStorage.removeItem('saasUser'); 
            // var logout = await tryAwait('get', '/logout', {});
			// if(logout.success){
            //     // localStorage.removeItem('pdSaasUserId'); // /user/loginUserInfo
            //     // localStorage.removeItem('pdSaasUserMobile'); // /user/loginUserInfo
            //     // localStorage.removeItem('pdSaasUserRole'); // /user/loginUserInfo
            //     // localStorage.removeItem('pdSaasVendorId');
            //     localStorage.removeItem('saas_loginId');
            //     localStorage.removeItem('saas_mobile');
            //     localStorage.removeItem('saas_se');
            //     this.$router.push('/login');
            //     this.$message({
			// 		message: '退出成功',
			// 		type: 'success'
			// 	});
			// }else{
			// 	this.$message({
			// 		message: logout.msgInfo || '失败',
			// 		type: 'error'
			// 	});
			// }
        },
        handleSelect(key, keyPath){
            console.log(key)
            console.log(keyPath)
        }
    },
    watch: {
        // 二级菜单放在watch里因为子组件获取到数据之后，却无变化，所以此处watch处理下
        async topNav(v){
            this.navs = v || [];
            // 目前只返了第一层，这里处理根据第一层的每个id获取每个的二级
            // async始终返回promise即使已经return具体的值，所以要用await处理下，因为是promise数组，这里用到 Promise.all
            // Promise.all前的await不能少
            // this.navs = await Promise.all(
            //     v.map(async (item)=>{
            //         if(item.linkUrl){    // 如果存在linkUrl,说明是顶级目录，不请求子目录了
            //             item.lists = [];
            //             return item;
            //         }
            //         var lists = await tryAwait('post', '/permission/itemList', {
            //             parentId: item.id
            //         })
            //         if(lists) item.lists = lists.model || [];;
            //         return item;
            //     })
            // )

            // 片区完成去配置门店时需要用到门店页面对应的id，这里保存在locastorage里
            // this.navs.forEach( v =>{
            //     if(v.permissionName == '店铺中心'){
            //         v.lists.forEach((d)=>{
            //             if(d.permissionName == '门店配置'){
            //                 localStorage.storePageId = d.id
            //             }
            //         })
            //     }
            // })
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
            margin-top: 4px;
            img
                height: 30px;


        .center
            text-align: center;
            display: inline-block;
            //- margin-left: 10%;
            margin-left: 40px;
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
