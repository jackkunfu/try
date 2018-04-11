<template lang="pug">

    el-col(style="height: 100%;overflow: auto;")

        //- el-menu(style="height: 100%;overflow: auto;" :default-active="defaultActive" unique-opened theme="dark" router)
        //- 不开启router模式就不用加index了
        el-menu(style="height: 100%;overflow: auto;" :default-active="defaultActive" unique-opened theme="dark")

            template(v-for="(nav, i) in navs")
                
                //- 无子集
                //- router-link(v-if="!nav.lists || nav.lists.length<=0" :to="{ path: nav.linkUrl, query:{id: nav.id} }" :key="i")
                    //- el-menu-item(:index="i+''") {{nav.permissionName}}
                el-menu-item(v-if="!nav.children || nav.children.length<=0" :index="nav.url" @click="navClick(nav)")
                    i.nav-icon(:class="nav.extra && nav.extra.icon ? nav.extra.icon : ''")
                    span {{nav.name}}
                    
                //- 有子集
                el-submenu(v-if="nav.children && nav.children.length > 0" :key="i" :index="i+''")
                    template(slot="title")
                        i.nav-icon(:class="nav.extra && nav.extra.icon ? nav.extra.icon : ''")
                        span {{nav.name}}
                        //- router-link(v-for="(item, j) in nav.lists" :to="{ path: item.linkUrl, query:{id: item.id} }" :key="i+'-'+j")
                            el-menu-item(:index="i+'-'+j") {{item.permissionName}}
                            el-menu-item(:index="item.linkUrl") {{item.permissionName}}

                    el-menu-item(v-for="(item, j) in nav.children" :key="i+''+j" :index="item.url" @click="navClick(item)")
                        i.nav-icon(:class="item.extra && item.extra.icon ? item.extra.icon : ''")
                        span {{item.name}}
                    //- el-menu-item(v-for="(item, j) in nav.lists" :key="i+''+j" :index="i+''+j")
                        a(:href="item.linkUrl" style="display:block") {{item.permissionName}}
                        
                

</template>

<script>
    var other = [{
        name: '药店管理',
        icon:'fa fa-plus-square',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/chainPharmacy',
            name: '连锁店'
        }, {
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/teminalUser',
            name: '店铺终端'
        }]
    }, {
        name: '警告管理',
        icon: 'fa fa-exclamation-triangle',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/warnType',
            name: '警告类型'
        }, {
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/alarmRecord',
            name: '警告记录'
        }]
    }, {
        name: '数据统计',
        icon: 'fa fa-line-chart',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/passegerCount',
            name: '人数统计'
        }]
    }, {
        name: '热区记录',
        icon: 'fa fa-pie-chart',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/requ',
            name: '热区记录'
        }]
    }, {
        name: '重点客户导购',
        icon: 'fa fa-shopping-basket',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/zhongdian',
            name: '重点客户导购'
        }]
    }, {
        name: '脱岗巡查通知',
        icon: 'fa fa-bell',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/tuoguan',
            name: '脱岗巡查通知'
        }]
    }, {
        name: '系统配置',
        icon: 'fa fa-cog',
        children: [{
            url: 'http://www.uwonders-my.com:8988/pharmacy/back/quyu',
            name: '货架比对设置'
        }]
    }]

    var copyOther = $.extend(true, [], other)
    copyOther.forEach( el => {
        el.url = '/other'
    });
    // var newNav = [{
    //     name: '智能监控',
    //     extra: {
    //         icon: 'fa fa-video-camera',
    //     },
    //     children: copyOther
    // }]

    export default {
        name: 'nav',
        props: ['leftNav'],
        data (){
            return {
                // navs: this.leftNav.concat(newNav).concat(other)
                navs: this.leftNav
            }
        },
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            navClick(item){
                console.log(item)
                // if(this.$route.path == '/other'){
                // if(item.linkUrl.indexOf('http') > -1){
                // if(item.linkUrl == '/other'){
                //     alert(location.host + '/#/other?')
                //     location.href = location.host + '/#/other?nav=' + JSON.stringify(item.lists)
                //     return;
                // }

                var query = item.children ? {
                        nav: JSON.stringify(item.children)
                    } : {};

                this.$router.push({
                    path: item.url,
                    query
                })
                if(this.$route.path == '/other' && item.url == '/other') location.reload();    //  不刷新貌似数据不能更新，暂时先刷新
            }
        },
        mounted () {
            this.$nextTick(() => {
                //-     this.api.menuList.then((d)=>{
                //-         /*console.log('nav列表')*/
                //-         /*console.log(d)*/
                //-         this.menus = d.map(function(v){
                //-             if(v.submenus && v.submenus.length > 0){
                //-                 v.noSub = false;x
                //-             }else{
                //-                 v.noSub = true;
                //-             }
                //-             return v;
                //-         });
                //-     })
            })
            // console.log(this.navs);
        },
        watch: {
            // 二级菜单放在watch里因为子组件获取到数据之后，却无变化，所以此处watch处理下
            async leftNav(v){
                // 目前只返了第一层，这里处理根据第一层的每个id获取每个的二级
                // async始终返回promise即使已经return具体的值，所以要用await处理下，因为是promise数组，这里用到 Promise.all
                // Promise.all前的await不能少
                // this.navs = await Promise.all(
                //     v.map(async (item)=>{
                //         var lists = (await tryAwait('get', '/permission/menu/' + item.id, {})).model || [];
                //         item.lists = lists;
                //         return item;
                //     })
                // )

                // this.navs = v.concat(newNav);
                
                this.navs = v;
                this.navs.forEach((v,i)=>{
                    if(v.name=='智能监控'){
                        v.children = copyOther;
                    }
                })
                console.log('this.navs');
                console.log(this.navs);
                
            }
        }
    }
</script>

<style lang="sass" scoped>
.el-submenu
    .el-menu-item
        padding: 0;
        min-width: 150px;
        padding-left: 20px!important;
.nav-icon
    margin-right: 5px;
    font-size: 10px;
</style>
