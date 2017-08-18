<template lang="pug">
.main-ctn
    h3 用户管理
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
                    .btn.edit 编辑
                    .btn.del 删除
            tr(v-if="lists.length == 0")
                td(colspan="3") 
                    span(style="line-height: 50px;") 暂无数据

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
            lists: [],
            cur: {},
            editting: false,
            curPage: 1,
            rows: 20
        }
    },
    mounted(){
        this.$nextTick(() => {
            this._fetchData('get', '/manage/user/developer', {
                page: this.curPage,
                rows: this.rows
            }, (res) => {
                if(!res.success) return

                this.lists = res.data;
            })
        })
    }
}
</script>

<style lang="sass" scoped>
td,th
    width: 30%;
</style>
    