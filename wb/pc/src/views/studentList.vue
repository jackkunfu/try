<template lang="pug">
div
    .table-ctn(v-show="!showEditCtn")
        .page-title 学员管理
            span /学员信息

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="出生日期")
                    el-date-picker(type="date" placeholder="出生日期" v-model="searchInfo.birth" style="width: 100%;" value-format="yyyy-MM-dd")

        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="应用编号")
                    el-input(v-model="editInfo.appCode")
                el-form-item(label="应用名称")
                    el-input(v-model="editInfo.appName")
                el-form-item(label="对接URL")
                    el-input(v-model="editInfo.appUrl")
                el-form-item(label="描述")
                    el-input(v-model="editInfo.remark")
                el-form-item(label="dorder")
                    el-input(v-model="editInfo.dorder")
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'studentList',
    mixins: [ tableManage ],
    data () {
        return {
            // keys: [
            //     { str: '头像', key: 'avatar', type: 'img' },
            //     { str: '姓名', key: 'name' },
            //     { str: '性别', key: 'sex' },
            //     { str: '生日', key: 'birth' },
            //     { str: '身高', key: 'height' },
            //     { str: '体重', key: 'weight' },
            //     { str: '家长姓名', key: 'parentName' },
            //     { str: '联系电话', key: 'parentPhone' },
            //     { str: '训练营', key: 'trainName' },
            //     { str: '卡种', key: 'remark' },
            //     { str: '训练频次', key: 'remark' },
            //     { str: '开卡时间', key: 'remark' },
            //     { str: '到期时间', key: 'remark' },
            //     { str: '学员作业', key: 'remark' },
            //     { str: '体能测试', key: 'remark' }
            // ],
            keys: [
                { str: '头像', key: 'user.avatar', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '地区', key: 'city' },
                { str: '训练营', key: 'train.name' },
                { str: '卡种', key: 'card.card' },
                { str: '训练频次', key: 'frequency' },
                { str: '费用', key: 'fee' },
                // { str: '支付时间', key: 'height' },
                { str: '创建时间', key: 'createDate' },
                { str: '销售', key: 'sales.name' }
            ],
            searchKeys: ['trainId'],
            editKeys: [],
            api: {
                list: { url: '/order/list' },
                add: { url: '/user/add' },
                edit: { url: '/user/edit' },
                del: { url: '/user/delete' }
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
    methods: {
        changeTableData(data){
            data.forEach(element => {
                element.birth = element.birthday ? element.birthday.split(' ')[0] : ''
            });
            return data
        },
        handleDelRow(data){
            return { userId: data.id }
        },
        changeSearchValue(info){     //  处理搜索请求传参
            info.status = 3
            return info
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info
        },
        testInput(){
            return true
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
