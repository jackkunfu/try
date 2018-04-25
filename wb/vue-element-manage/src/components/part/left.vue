<template lang="pug">
    el-menu(default-active="2" class="el-menu-vertical-demo" background-color="#336666" text-color="#ccc" active-text-color="#ffd04b" router)
        //- @open="handleOpen" @close="handleClose"

        template(v-for="(nav, i) in menus")
            //- 无子集
            //- el-menu-item(v-if="!nav.list || nav.list.length==0" :index="nav.url") {{nav.name}}
            el-menu-item(v-if="!nav.list || nav.list.length==0" :index="nav.url")
                template(slot="title") 
                    i.nav-icon(v-if="nav.iconName" :class="nav.iconName")
                    span {{nav.name}} 
            //- 有子集
            el-submenu(v-else="" :index="i+''")
                template(slot="title") 
                    i.nav-icon(v-if="nav.iconName" :class="nav.iconName")
                    span {{nav.name}}
                el-menu-item(v-for="(item, j) in nav.list" :key="i+'-'+j" :index="item.url") 
                    template(slot="title") 
                        i.nav-icon(v-if="item.iconName" :class="item.iconName")
                        span {{item.name}}

</template>

<script>
export default {
    name: 'top',
    data () {
        return {
            menus: [{
                name: '基础管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '应用管理', url: 'application', iconName: 'el-icon-menu' },
                    { name: '角色管理', url: '' },
                    { name: '用户管理', url: 'user' },
                    { name: '小区管理', url: 'place' },
                    { name: '应用管理', url: '' },
                    { name: '应用管理', url: '' },
                    { name: '应用管理', url: '' },
                ]
            }, {
                name: '其他',
                url: 'application',
                iconName: 'el-icon-menu'
            }]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
</style>
