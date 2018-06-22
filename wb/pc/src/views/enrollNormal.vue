<template lang="pug">
div
    .table-ctn
        .page-title 报名管理
            span /正常报名

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(placeholder="姓名/手机号" v-model="searchInfo.name")
                
                el-form-item(label="时间范围")
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")
                    el-col(:span="2" style="text-align: center") -
                    el-col(:span="11")
                        el-date-picker(type="date" placeholder="选择开始日期" v-model="searchInfo.startTime" style="width: 100%;" value-format="yyyy-MM-dd")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.city" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.city" placeholder="上课时间")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")

                el-form-item(label="出生日期")
                    el-date-picker(type="date" placeholder="出生日期" v-model="searchInfo.birth" style="width: 100%;" value-format="yyyy-MM-dd")

                el-form-item(label="销售渠道")
                    el-select(v-model="searchInfo.city" placeholder="销售渠道")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
            
        s-table(:keys="keys" :tableData="tableData" :page="page" :operates="operates" :scopeOperates="scopeOperates"
            @changePage="changePage" @openCard="openCard" @add="add" @editScope="editScope" @delScope="delScope")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            .x(@click="closeEditBox")
                i.el-icon-close
            el-form(:model="editInfo" label-width="80px" size="mini")
                .item 个人信息
                el-form-item(label="头像")
                    .up-ctn
                        input#up1(type="file")
                        span + 上传
                        img(:src="config.imgPath+editInfo.avatar" v-if="editInfo.avatar")
                el-form-item(label="姓名")
                    el-input(v-model="editInfo.appName")
                el-form-item(label="性别")
                    el-radio-group(v-model="editInfo.sex")
                        el-radio(label="1") 男
                        el-radio(label="0") 女
                el-form-item(label="身高")
                    el-input(v-model="editInfo.remark")
                el-form-item(label="体重")
                    el-input(v-model="editInfo.dorder")
                el-form-item(label="家长姓名")
                    el-input(v-model="editInfo.dorder")
                el-form-item(label="联系电话")
                    el-input(v-model="editInfo.dorder")
                
                .item 课程信息
                el-form-item(label="地区")
                    el-select(v-model="editInfo.area")
                        el-options(v-for="(item, i) in areaList" :label="item" placeholder="选择地区" :value="item" :key="i")
                el-form-item(label="训练营")
                    el-select(v-model="editInfo.train")
                        el-options(v-for="(item, i) in areaList" :label="item" placeholder="选择训练营" :value="item" :key="i")
                el-form-item(label="卡种")
                    el-select(v-model="editInfo.cardType")
                        el-options(v-for="(item, i) in areaList" :label="item" placeholder="选择卡种" :value="item" :key="i")
                el-form-item(label="训练频次")
                    el-select(v-model="editInfo.times")
                        el-options(v-for="(item, i) in areaList" :label="item" placeholder="选择训练频次" :value="item" :key="i")
                el-form-item(label="价格")
                    el-input(v-model="editInfo.price")
                el-form-item(label="支付日期")
                    el-date-picker(v-model="editInfo.payDate" type="date" placeholder="选择支付日期" value-format="yyyy-MM-dd")
                el-form-item(label="上课时间")
                    div(v-for="(item, i) in classTimes" :key="i")
                        span {{item.time}}
                        el-switch(v-model="item.delivery")
                el-form-item(label="销售渠道")
                    el-select(v-model="editInfo.times")
                        el-options(v-for="(item, i) in areaList" :label="item" :value="item" :key="i")

                el-form-item
                    el-button(type="primary" @click="addOrUpdate" size="small") 保存
                    el-button(type="primary" @click="editCancel" size="small") 取消
      
</template>

<script>
export default {
    name: 'enrollNormal',
    mixins: [ tableManage ],
    data () {
        return {
            areaList: [],
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '性别', key: 'sex' },
                { str: '家长姓名', key: 'sex' },
                { str: '联系电话', key: 'sex' },
                { str: '地区', key: 'sex' },
                { str: '训练营', key: 'sex' },
                { str: '卡种', key: 'sex' },
                { str: '训练频次', key: 'sex' },
                { str: '费用', key: 'birth' },
                { str: '支付时间', key: 'height' },
                { str: '销售', key: 'height' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/order/list' },
                add: { url: '/order/add' },
                edit: { url: '/order/edit' },
                del: { url: '/order/delete' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '开卡', fun: 'openCard'},
                { str: '编辑', fun: 'editScope'},
                { str: '删除', fun: 'delScope'}
            ],
            operates: [    // 顶部的操作
                { str: '新增', fun: 'add'},
                { str: '导出excel', fun: 'export'}
            ],
            classTimes: []
        }
    },
    methods: {
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        testInput(){
            return true
        },
        openCard(scope){
            var row = scope.row;
            console.log(row)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.up-ctn
    width: 100px
    height: 100px
    line-height: 100px

</style>
