<template lang="pug">

    el-col(style="height: 100%;overflow: auto;padding-top:48px;")
        el-menu(style="height: 100%;overflow: auto;" :default-active="defaultActive" unique-opened theme="dark"
            @open="handleOpen" @close="handleClose" router)

            template(v-for="(nav, i) in navs")
                //- 无子集
                router-link(v-if="!nav.lists || nav.lists.length<=0" :to="{ path: nav.linkUrl, query:{id: nav.id} }" :key="i")
                    el-menu-item(:index="i+''") {{nav.permissionName}}
                //- 有子集
                el-submenu(v-if="nav.lists && nav.lists.length > 0" :key="i" :index="i+''")
                    template(slot="title") {{nav.permissionName}}
                    router-link(v-for="(item, j) in nav.lists" :to="{ path: item.linkUrl, query:{id: item.id} }" :key="i+'-'+j")
                        el-menu-item(:index="i+'-'+j") {{item.permissionName}}

                //- el-menu-item(:index="i+''" v-if="!item.lists || item.lists.length<=0" :key="i") {{item.name}}
                //-
                //- el-submenu(:index="i+''" v-if="item.lists && item.lists.length > 0" :key="i")
                //-     template(slot="title") {{item.name}}
                //-     template(v-for="(sub, j) in item.submenus")
                //-         el-menu-item(:index="sub.linkUrl" :key="j") {{sub.name}}

</template>

<script>
    export default {
        data (){
            return {
                navs: [],
                activeIndex: '0'
            }
        },
        props: ['leftNav'],
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            handleOpen () {
                console.log('open')
            },
            handleClose () {
                console.log('close')
            }
        },
        mounted () {
            //- this.$nextTick(() => {
            //-     this.api.menuList.then((d)=>{
            //-         /*console.log('nav列表')*/
            //-         /*console.log(d)*/
            //-         this.menus = d.map(function(v){
            //-             if(v.submenus && v.submenus.length > 0){
            //-                 v.noSub = false;
            //-             }else{
            //-                 v.noSub = true;
            //-             }
            //-             return v;
            //-         });
            //-     })
            //- })
        },
        watch: {
            // 二级菜单放在watch里因为子组件获取到数据之后，却无变化，所以此处watch处理下
            async leftNav(v){
                // 目前只返了第一层，这里处理根据第一层的每个id获取每个的二级
                // async始终返回promise即使已经return具体的值，所以要用await处理下，因为是promise数组，这里用到 Promise.all
                // Promise.all前的await不能少
                this.navs = await Promise.all(
                    v.map(async (item)=>{
                        var lists = (await tryAwait('get', '/permission/menu/' + item.id, {})).model || [];
                        item.lists = lists;
                        return item;
                    })
                )
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
</style>
