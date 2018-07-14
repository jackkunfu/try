<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /销售顾问设置

        //- search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-position="right")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @delScope="delScope" ref="table")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="140px" size="mini")
                
                el-form-item(label="姓名")
                    el-input(v-model="editInfo.name")
                el-form-item(label="手机号")
                    el-input(v-model="editInfo.phone")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'setManage',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '姓名', key: 'name' },
                { str: '手机号', key: 'phone' }
                // { str: '创建时间', key: 'createtime' }
            ],
            // searchKeys: ['name', 'roleid'],
            editKeys: ['name', 'phone'],
            api: {
                list: { url: '/sales/list' },
                add: { url: '/sales/add' },
                del: { url: '/sales/delete' }
            },
            scopeOperates: [    // 每一行中的操作
                { str: '删除', fun: 'delScope', type: 'danger'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ]
        }
    },
    mounted(){
        
    },
    methods: {
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        testInput(){
            var data = this.trimObj(this.editInfo)
            if(data.name == '') return this.messageTip('姓名不能为空~')
            // if(data.phone == '') return this.messageTip('手机不能为空~')
            if(data.phone != '' && !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(data.phone.trim())) ) return this.messageTip('手机号格式有误~');
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
