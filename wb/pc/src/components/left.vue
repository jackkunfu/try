<template lang="pug">
    el-menu(:default-active="defaultActive+''" class="el-menu-vertical-demo" background-color="#48C4F5" text-color="#000" active-text-color="#fff" router unique-opened)
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
    name: 'left',
    data () {
        return {
            defaultActive: '',
            menus: [{
                name: '学员管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '学员信息', url: '/studentList' },
                    { name: '点到签名', url: '/checkIn' },
                    { name: '体能测试', url: '/bodyTest' },
                    { name: '学员等级', url: '/stuLevel' }
                ]
            },{
                name: '教练管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '教练评价', url: '/cocahJudge' }
                ]
            },{
                name: '课程管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '课程介绍', url: '/class/desc' },
                    { name: '训练营设置', url: '/trainTeam/set' },
                    { name: '卡种设置', url: '/card/type' }
                ]
            },{
                name: '排课管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '教练排课', url: '/class/set/coach' },
                    { name: '班主任排课', url: '/class/set/master' }
                ]
            },{
                name: '报名管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '正常报名', url: '/enroll/normal' },
                    { name: '体验课报名', url: '/enroll/once' }
                ]
            },{
                name: '权限管理',
                iconName: 'el-icon-menu',
                list: [
                    { name: '管理员设置', url: '/set/manage' },
                    { name: '教练设置', url: '/set/coach' },
                    { name: '班主任设置', url: '/set/class' },
                    { name: '销售顾问', url: '/set/sell' }
                ]
            }]
        }
    },
    watch: {
        $route(v){
            var path = v.path;
            if(path == '/') this.defaultActive = '/studentList'
            else this.defaultActive = path;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
</style>
