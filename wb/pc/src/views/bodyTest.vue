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
                        el-option(v-for="(item, i) in citys" :key="i" :label="item.city" :value="item.city")

                el-form-item(label="训练营")
                    el-select(v-model="searchInfo.trainId" placeholder="训练营")
                        el-option(v-for="(item, i) in trains" :key="i" :label="item.name" :value="item.id")

                el-form-item(label="上课时间")
                    el-select(v-model="searchInfo.week" placeholder="上课时间")
                        el-option(v-for="(item, i) in week" :key="i" :label="'周'+item" :value="i")
        
        s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @see="see" @upImg="upImg")

        input(ref="up" type="file" style="width:0;height:0;")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .x(@click="closeEditBox")
            i.el-icon-close
        .box
            search(@search="search" @reset="reset")
                el-form(:inline="true" :model="imgInfo" size="mini" label-width="70px")
                    el-form-item(label="时间")
                        el-date-picker(v-model="imgInfo.time" placeholder="请选择时间" type="month" value-format="yyyy-MM-dd")

            .img(v-for="(item, i) in imgList")
                img(:sc="item.img")
                i.el-icon-delete(@click="delImg(item.id)")

    .fix-cover(v-show="isChooseDate")
        .x(@click="isChooseDate=false;curAddTime=''")
            i.el-icon-close
        .box(style="min-height:0;")
            el-form(:inline="true" :model="imgInfo" size="mini" label-width="70px")
                el-form-item(label="时间")
                    el-date-picker(v-model="curAddTime" placeholder="请选择时间" type="date" value-format="yyyy-MM-dd")

            el-button(@click="upImgSubmit" size="mini") 上传
    
</template>

<script>
export default {
    name: 'bodyTest',
    mixins: [ tableManage ],
    data () {
        return {
            keys: [
                { str: '头像', key: 'img', type: 'img' },
                { str: '姓名', key: 'user.name' },
                { str: '性别', key: 'sexStr' },
                { str: '家长姓名', key: 'user.parentName' },
                { str: '联系电话', key: 'user.parentPhone' },
                { str: '地区', key: 'city' },
                { str: '训练营', key: 'train.name' },
                { str: '历史成绩', text: '查看', type: 'fun', fun: 'see' }
            ],
            searchKeys: [],
            editKeys: [],
            api: {
                list: { url: '/order/list' },
                add: { url: '/power_test/add' },
                edit: { url: '/power_test/edit' }
            },
            scopeOperates: [    // 每一行种的操作
                { str: '上传', fun: 'upImg'}
            ],
            imgInfo: {
                time: ''
            },
            imgList: [],
            curItem: {},
            isChooseDate: false,
            curAddTime: null
        }
    },
    mounted(){
        var that = this
        $(this.$refs.up).change(()=>{
            that.file('', async data => {
                console.log(data.data)
                var res = await this.ajax('/power_test/add', {
                    userId: this.curItem.userId,
                    content: data.data,
                    testDate: new Date(this.curAddTime)
                })
                if(res && res.code == this.successCode){

                    this.curItem = null
                    this.curAddTime = null
                    this.isChooseDate = false

                    this.messageTip(res.message || '上传添加成功', 1)
                    this.tableList()
                }else this.messageTip(res.message)
                
            }, that.$refs.up)
        })
    },
    methods: {
        upImgSubmit(){
            if(!this.curAddTime) return this.messageTip('请选择时间')
            $(this.$refs.up).click()
        },
        upImg(scope){
            this.isChooseDate = true
            this.curItem = scope.row
        },
        delImg(id){},
        see(scope){     // 查看
            // this.showEditCtn = true
            // this.getImgList(scope.row.id)
            this.goUrl('/bodyTestSee', { id: scope.row.userId })
        },
        async getImgList(id){
            var req = await this.ajax('', { id, time: this.imgInfo.time }, 'get')
            if(req && req.code == this.successCode){
                this.imgList = req.data.rows
            }
        },
        changeTableData(data){
            data.forEach(element => {
                element.sexStr = element.user.sex ? '女' : '男'
                element.img = element.user.avatar
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
.img
    width: 500px
    margin: 0 auto
    position: relative
    margin-bottom: 10px
    background: #eee
    img
        width: 100%
    i
        position: absolute
        top: 0
        right: 0
        cursor: pointer
</style>
