<template lang="pug">
div
    .table-ctn
        .page-title 学员管理
            span /体能测试

        search(@search="search" @reset="reset")
            el-form(:inline="true" :model="searchInfo" size="mini" label-width="70px")
                el-form-item(label="时间")
                    el-date-picker(v-model="searchInfo.time" placeholder="请选择时间" type="date" value-format="yyyy-MM-dd")

        //- s-table(:keys="keys" :tableData="tableData" :page="page" :scopeOperates="scopeOperates"
            @changePage="changePage" @chooseRow="chooseRow" @see="see" @upImg="upImg")

        .list
            .each(v-for="(item, i) in tableData")
                div
                    span 体能测试
                    span {{item.testDate}}
                    .fr
                        i.el-icon-delete(@click="del(item.id)") 删除

                div
                    img(:src="config.imagePath+item.content")

        el-pagination(layout="total, prev, pager, next, jumper" :total="page.total"
            @current-change="(v)=>{changePage(v)}" ref="page")

        //- input(ref="up" type="file" style="width:0;height:0;")

    //- .edit-ctn.fix-cover(v-show="showEditCtn")
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

    //- .fix-cover(v-show="isChooseDate")
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
    name: 'bodyTestSee',
    mixins: [ tableManage ],
    data () {
        return {
            uid: this.$route.query.id,
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
            searchKeys: ['time']
        }
    },
    mounted(){
        this.getImgList()
    },
    methods: {
        changeTableData(data){
            data.forEach(element => {
                element.img = element.user.avatar
            });
            return data
        },
        search(){
            this.getImgList()
        },
        async getImgList(id){
            var data = {
                userId: this.uid,
                limit: this.page.limit,
                offset: this.page.offset
            }
            if(this.searchInfo.time) data.testDate = new Date(this.searchInfo.time)
            var req = await this.ajax('/power_test/list', data, 'get')
            if(req && req.code == this.successCode){
                this.tableData = req.data.rows
                this.page.total = req.data.total - 0
            }
        },
        async del(id){
            var req = await this.ajax('/power_test/delete', { id })
            if(req && req.code == this.successCode){
                this.messageTip(req.message, 1)
                this.getImgList()
            }else this.messageTip(req.message)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.list
    .each
        width: 520px
        margin: 20px auto
        border: 1px solid #eee
        padding: 10px 20px
        &:after
            clear: both
        img
            display: block
            margin-top: 10px
            width: 100%
            min-height: 50px

        span + span
            margin-left: 20px


// .img
//     width: 500px
//     margin: 0 auto
//     position: relative
//     margin-bottom: 10px
//     background: #eee
//     img
//         width: 100%
//     i
//         position: absolute
//         top: 0
//         right: 0
//         cursor: pointer
</style>
