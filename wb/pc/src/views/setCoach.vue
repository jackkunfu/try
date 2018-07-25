<template lang="pug">
div
    .table-ctn
        .page-title 设置
            span /教练设置

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-position="right")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/账号/手机号" v-model="searchInfo.name")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope" ref="table")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        //- .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            .scroll-box
                el-form(:model="editInfo" label-width="140px" size="mini")
                    .item 教练信息
                    el-form-item(label="头像")
                        .up-ctn
                            input#up1(type="file")
                            span + 上传
                            img(:src="config.imgPath+editInfo.avatar" v-if="editInfo.avatar")
                    el-form-item(label="姓名")
                        el-input(v-model="editInfo.name" placeholder="请输入姓名~")

                    .item 联系方式
                    el-form-item(label="手机号")
                        el-input(v-model="editInfo.phone" placeholder="请输入手机号~")

                    el-form-item
                        el-button(type="primary" @click="addOrUpdate" size="small") 保存
                        el-button(type="primary" @click="editCancel" size="small") 取消
    
</template>

<script>
export default {
    name: 'setCoach',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'avatar', type: 'img' },
                { str: '姓名', key: 'name' },
                { str: '手机号', key: 'phone' },
                { str: '创建时间', key: 'createtime' }
            ],
            searchKeys: ['name'],
            editKeys: ['avatar', 'name', 'phone'],
            api: {
                list: { url: '/mgr/list' },
                add: { url: '/mgr/add' },
                edit: { url: '/mgr/edit' },
                del: { url: '/mgr/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'}
            ]
        }
    },
    mounted(){
        $('#up1').change(()=>{
            this.file('up1', res => {
                if(res && res.code == 200) this.editInfo.avatar = res.data
                else this.messageTip(res.message)
            })
        })
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            info.roleid = 4
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            info.roleid = 4
            return info;
        },
        handleDelRow(data){
            return {
                userId: data.id
            }
        },
        testInput(){
            var editInfo = this.editInfo
            editInfo.name = editInfo.name.trim()
            editInfo.phone = editInfo.phone.trim()
            if(editInfo.name == '') return this.messageTip('姓名不能为空~')
            if(editInfo.phone != '' && !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(editInfo.phone)) ) return this.messageTip('手机号格式有误~');
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.up-ctn
    line-height: 150px
</style>
