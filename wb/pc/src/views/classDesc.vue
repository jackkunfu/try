<template lang="pug">
div
    .table-ctn
        .page-title 课程管理
            span /课程介绍

        .box.lunbotu
            .title
                i.el-icon-document
                | 轮播图管理
                .up-ctn.add
                    input#up1(type="file" ref="up1")
                    span 新增轮播图

            .ctn
                div(v-for="(item, i) in lunbotuList" :key="i")
                    img.fl(:src="config.imgPath+item.img")
                    .fr
                        .up-ctn
                            input(type="file" @change="changeLunBo($event, item.id)")
                            span 替换
                        el-button(type="danger" @click="delLunbotu(item.id)") 删除

        .box.area
            .title
                i.el-icon-document
                | 课程介绍缩略图、地区及图文链接
                el-button.fr(type="success" @click="showEditCtn=true") 新增地区

            .ctn
                div(v-for="(item, i) in areaList" :key="i")
                    .fl
                        img(:src="config.imgPath+item.img")
                        .name.els {{item.city}}
                        .url.els 图文连接：
                            a(:href="item.url") {{item.url}}

                    .fr
                        div
                            el-button.fr(type="success" @click="editArea(item)") 编辑
                        el-button(type="danger" @click="delLunbotu(item.id)") 删除

            
    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="缩略图")
                    .up-ctn.area
                        input#up1(type="file" @change="upAreaImg($event)")
                        span + 上传
                        img(:src="config.imgPath+editInfo.img" v-if="editInfo.img")

                el-form-item(label="地区名称")
                    el-input(v-model="editInfo.city")
                el-form-item(label="图文链接")
                    el-input(v-model="editInfo.url")
                
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'classDesc',
    data () {
        return {
            editInfo: {
                img: '',
                city: '',
                url: ''
            },
            showEditCtn: false,
            lunbotuList: [],
            areaList: [
                {img: '', name: '杭州', url: 'http://www.baidu.com'},
                {img: '', name: '杭州', url: 'http://www.baidu.com'},
                {img: '', name: '杭州', url: 'http://www.baidu.com'}
            ],
            isEdit: false,
            curEditId: null
        }
    },
    mounted(){
        this.getLunboList()
        this.getAreaList()
        // 新增轮播图
        $(this.$refs.up1).change(()=>{
            this.file('up1', async res =>{
                if(res && res.code == this.successCode){
                    let img = res.data
                    var req = await this.ajax('/carousel/add', { img })
                    if(req && req.code == this.successCode){
                        this.getLunboList()
                    }
                }
            })
        })
    },
    methods: {
        editArea(item){
            this.isEdit = true
            this.showEditCtn = true
            this.curEditId = item.id
            this.editInfo.img = item.img
            this.editInfo.url = item.url
            this.editInfo.city = item.city
        },
        async addOrUpdate(){
            if(this.editInfo.img == '') return this.messageTip('图片未上传')
            if(this.editInfo.city.trim() == '') return this.messageTip('城市不能为空')
            if(this.editInfo.url.trim() == '') return this.messageTip('图文链接不能为空')
            var url = this.isEdit ? '/course/edit' : '/course/add'
            var data = Object.assign({}, this.editInfo)
            if(this.isEdit) data.id = this.curEditId
            var req = await this.ajax(url, data)
            if(req && req.code == this.successCode){
                this.getAreaList()
                this.editCancel()
            }else this.messageTip(req.msg || '操作失败')
        },
        editCancel(){
            Object.keys(this.editInfo).forEach(key => {
                this.editInfo[key] = ''
            })
            this.showEditCtn = false
            this.isEdit = false
            this.curEditId = null
        },
        async getLunboList(){
            var req = await this.ajax('/carousel/list', {
                limit: 10,
                offset: 0
            }, 'get')
            if(req && req.code == this.successCode){
                this.lunbotuList = req.data.rows || []
            }
        },
        async getAreaList(){
            var req = await this.ajax('/course/list', {
                limit: 10,
                offset: 0
            }, 'get')
            if(req && req.code == this.successCode){
                this.areaList = req.data.rows || []
            }
        },
        upAreaImg(e){
            this.file('', async res => {
                this.editInfo.img = res.data
            }, e.target)
        },
        changeLunBo(e, id){
            this.file('', async res => {
                let img = res.data
                var req = await this.ajax('/carousel/edit', { img, id })
                if(req && req.code == this.successCode){
                    this.getLunboList()
                }
            }, e.target)
        },
        addLunbotu(){},
        async delLunbotu(id){
            var req = await this.ajax('/carousel/delete', { id })
            if(req && req.code == this.successCode){
                this.messageTip(res.msg || '成功', 1)
                this.getLunboList()
            }else this.messageTip(req && req.msg ? req.msg : '失败')
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.up-ctn
    line-height: 30px
    padding: 0 10px
    &.area
        line-height: 100px

.title
    font-size: 20px
    line-height: 40px
    overflow: hidden
    i
        margin-right: 5px
    .add
        width: 150px
        float: right

.box
    background: #fff
    border-radius: 5px
    // margin: 10px auto
    margin-bottom: 30px
    width: 600px
    .ctn
        > div
            overflow: hidden
            margin: 10px
            
            .el-button
                margin-top: 10px

.lunbotu
    img
        width: 200px

.area
    .fl
        width: 400px
    .name, .url
        width: 250px

    .name
        font-size: 18px
        margin-bottom: 10px
    img
        float: left
        width: 120px
        height: 50px
        margin-right: 20px
</style>
