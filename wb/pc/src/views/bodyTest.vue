<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /体能测试

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="关键字")
                    el-input(v-model="searchInfo.name" placeholder="请输入学员姓名/手机号")

                el-form-item(label="城市")
                    el-select(v-model="searchInfo.city" placeholder="城市")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.id")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.train" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.train" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.city" placeholder="上课时间")
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.name" :value="item.value")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @see="see" @upImg="upImg")

        input(ref="up" type="file" style="width:0;height:0;")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            div(v-for="(item, i) in imgList")
                img(:sc="item.img")
                i.el-icon-delete
    
</template>

<script>
export default {
    name: 'bodyTest',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'appCode' },
                { str: '姓名', key: 'name' },
                { str: '性别', key: 'sex' },
                { str: '生日', key: 'birth' },
                // { str: '身高', key: 'height' },
                // { str: '体重', key: 'weight' },
                { str: '家长姓名', key: 'pname' },
                { str: '联系电话', key: 'mobile' },
                { str: '训练营', key: 'trainName' },
                { str: '历史成绩', key: '', fun: 'see' }
                // { str: '卡种', key: 'remark' },
                // { str: '训练频次', key: 'remark' },
                // { str: '开卡时间', key: 'remark' },
                // { str: '到期时间', key: 'remark' },
                // { str: '学员作业', key: 'remark' },
                // { str: '体能测试', key: 'remark' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/power_test/list' },
                add: { url: '/power_test/add' },
                edit: { url: '/power_test/edit' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '上传', fun: 'upImg'}
            ],
            imgList: []
        }
    },
    mounted(){
        var that = this
        $(this.$refs.up).change(()=>{
            that.file('', function(data){
                console.log(data.data)
            }, that.$refs.up)
        })

    },
    methods: {
        upImg(scope){
            $(this.$refs.up).click()
        },
        see(scope){     // 查看
            this.showEditCtn = true
            this.getImgList(scope.row.id)
        },
        async getImgList(id){
            var req = await this.ajax('', { id }, 'get')
            if(req && req.code == this.successCode){
                this.imgList = req.data.rows
            }
        },
        changeSearchValue(info){     //  处理搜索请求传参
            return info;
        },
        changeEditValue(info){   // 处理新增编辑请求传参
            return info;
        },
        testInput(){
            return true
        },
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
