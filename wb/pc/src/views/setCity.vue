<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /城市设置
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @delScope="delScope" ref="table")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x
                i.el-icon-close(@click="closeEditBox")
            .scroll-box
                el-form(:model="editInfo" label-width="140px" size="mini")
                    
                    el-form-item(label="城市名称")
                        el-input(v-model="editInfo.name")

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
                { str: '城市名称', key: 'name' },
            ],
            editKeys: ['name'],
            api: {
                // list: { url: '/city/list' },
                add: { url: '/city/add' },
                add: { url: '/city/edit' },
                del: { url: '/city/delete' }
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
        this.tableList()
    },
    methods: {
        async tableList(){
            var res = await this.ajax('/city/list', {}, 'get')
            this.tableData = res.data
            // this.page.total = result.total;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        changeTable(info, res){   // 处理新增编辑请求传参
        console.log(res)
            return res;
        },
        testInput(){
            var data = this.trimObj(this.editInfo)
            if(data.name == '') return this.messageTip('姓名不能为空~')
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
