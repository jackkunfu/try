<template lang="pug">
.user-manage
    table
        thead
            tr
                th id
                th 手机
                th 密码

        tbody
            tr(v-for="(item, i) in lists")
                td {{item.phone}}
                td {{item.password}}
                td
                    .btn 编辑
                    .btn 删除

    .change-box
        .row {{editting ? '编辑' : '新增'}}
        .row
            label 手机
            input(v-model="cur.phone")
        .row
            label 密码
            input(v-model="cur.password")
        .row
            .btn {{editting ? '编辑' : '新增'}}
            .btn 取消

</template>
   

<script>
export default {
    name: 'm-index',
    data () {
        return {
            lists: [
                {phone: '111', password: '111'},
                {phone: '111', password: '111'},
                {phone: '111', password: '111'},
                {phone: '111', password: '111'}
            ],
            cur: {},
            editting: false
        }
    }
}
</script>

<style lang="sass" scoped>
.user-manage
    ul
        li
</style>
    