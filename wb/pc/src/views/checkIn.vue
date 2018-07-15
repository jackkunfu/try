<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /点名签到

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")

                el-form-item(label="上课日期")
                    el-date-picker(type="date" placeholder="上课日期" v-model="searchInfo.date" style="width: 100%;" value-format="yyyy-MM-dd")
            
        s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage"  @delScope="delScope")

</template>

<script>
export default {
    name: 'studentList',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'img', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '生日', key: 'birth' },
                { str: '手机', key: 'user.phone' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '训练营', key: 'train.name' },
                { str: '当天出席状况', key: 'curStatu' },
                { str: '累计出席', key: 'attend' },
                { str: '累计请假', key: 'leave' },
                { str: '累计缺席', key: 'absent' }
            ],
            searchKeys: ['city', 'trainId', 'week', 'date'],
            editKeys: [],
            api: {
                list: { url: '/sign/listBg' },
                del: { url: '/sign/delete' }
            },
            operates: [    // 顶部的操作
                // { str: '新增', fun: 'add'},
            ],
            scopeOperates: [    // 每一行种的操作
                { str: '删除', fun: 'delScope'}
            ]
        }
    },
    methods: {
        changeTableData(data){
            data.forEach(element => {
                element.birth = element.user.birthday ? element.user.birthday.split(' ')[0] : ''
                element.sexStr = element.sex ? '女' : '男'
                element.img = element.user.avatar
                element.curStatu = element.type === 0 ? '出席' : element.type === 1 ? '请假' : element.type === 2 ? '出席' : '未知'
            });
            return data
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
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
