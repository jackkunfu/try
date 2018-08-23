<template lang="pug">
div.class-desc
    .table-ctn
        .page-title 课程管理
            span /课程介绍

        .box.lunbotu
            .title
                i.el-icon-document
                | 轮播图管理
                span(style="color:#888;") (375*140或等比例两倍三倍图)
                //- .up-ctn.add
                    input#up1(type="file" ref="up1")
                    span 新增轮播图
                el-button.add(@click="showaAddPoster=true" size="mini" style="color:#fff;") 新增轮播图

            .ctn
                div(v-for="(item, i) in lunbotuList" :key="i")
                    img.fl(:src="config.imgPath+item.img")
                    .fr
                        .up-ctn
                            input(type="file" @change="changeLunBo($event, item.id)")
                            span 替换
                        el-button(type="danger" @click="delLunbotu(item.id)" size="mini") 删除

            el-pagination(layout="prev, pager, next" :total="lunboTotal")

        .box.area
            .title
                i.el-icon-document
                | 课程介绍缩略图、地区及图文链接
                span(style="color:#888;") (140*120或等比例两倍三倍图)
                el-button.fr(type="success" @click="showEditCtn=true" size="mini") 新增地区

            .ctn
                div(v-for="(item, i) in areaList" :key="i")
                    .fl
                        img(:src="config.imgPath+item.img")
                        .name.els {{item.city}}
                        .url.els 图文连接：
                            a(:href="item.url") {{item.url}}

                    .fr
                        div
                            el-button.fr(type="success" @click="editArea(item)" size="mini") 编辑
                        el-button(type="danger" @click="delArea(item.id)" size="mini") 删除

            el-pagination(layout="prev, pager, next" :total="areaTotal")

            
    .edit-ctn.fix-cover(v-show="showEditCtn")
        //- .x(@click="closeEditBox")
            i.el-icon-close
        .box
            .x
                i.el-icon-close(@click="closeEditBox")
            .scroll-box
                el-form(:model="editInfo" label-width="80px")
                    el-form-item(label="缩略图")
                        .up-ctn.area
                            input#up1(type="file" @change="upAreaImg($event)")
                            span + 上传
                            img(:src="config.imgPath+editInfo.img" v-if="editInfo.img")

                    el-form-item(label="地区名称")
                        el-input(v-model="editInfo.city")
                    el-form-item(label="图文链接")
                        el-input(v-model="editInfo.url" placeholder="http://或https://开头的正常存在网址")
                    
                    el-form-item
                        el-button(type="primary" @click="addOrUpdate") 保存
                        el-button(type="primary" @click="editCancel") 取消

    .edit-ctn.fix-cover(v-show="showaAddPoster")
        .box
            .x
                i.el-icon-close(@click="posterObj.img='';posterObj.url='';showaAddPoster=false;")
            .scroll-box
                el-form(:model="posterObj" label-width="80px")
                    el-form-item(label="缩略图")
                        .up-ctn.area
                            input#up1(type="file" @change="upImg($event, 'posterObj')")
                            span + 上传
                            img(:src="config.imgPath+posterObj.img" v-if="posterObj.img")

                    el-form-item(label="轮播图链接")
                        el-input(v-model="posterObj.url" placeholder="http://或https://开头的正常存在网址")
                    
                    el-form-item
                        el-button(type="primary" @click="addLunbotu") 保存
                        el-button(type="primary" @click="posterObj.img='';posterObj.url='';showaAddPoster=false;") 取消
    
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
            areaList: [],
            isEdit: false,
            areaTotal: 0,
            lunboTotal: 0,
            curEditId: null,

            showaAddPoster: false,
            posterObj: {
                img: '',
                url: ''
            }
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
        closeEditBox(){
            this.editCancel()
        },
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
            // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
            var reg=/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
            if(!reg.test(this.editInfo.url.trim()))  return this.messageTip('图文链接格式不正确')
            var url = this.isEdit ? '/course/edit' : '/course/add'
            var data = Object.assign({}, this.editInfo)
            if(this.isEdit) data.id = this.curEditId
            var req = await this.ajax(url, data)
            if(req && req.code == this.successCode){
                this.getAreaList()
                this.editCancel()
            }else this.messageTip(req.message || '操作失败')
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
                this.lunboTotal = req.data.total - 0
            }
        },
        async getAreaList(){
            var req = await this.ajax('/course/list', {
                limit: 10,
                offset: 0
            }, 'get')
            if(req && req.code == this.successCode){
                this.areaList = req.data.rows || []
                this.areaTotal = req.data.total - 0
            }
        },
        upAreaImg(e){
            this.file('', async res => {
                this.editInfo.img = res.data
            }, e.target)
        },
        upImg(e, key){
            this.file('', async res => {
                this[key].img = res.data
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
        async addLunbotu(){
            if(!this.posterObj.img) return this.messageTip('请上传图片')
            if(!this.posterObj.url || this.posterObj.url.trim() == '') return this.messageTip('请上传图片')
            var reg=/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
            if(!reg.test(this.posterObj.url.trim()))  return this.messageTip('图片链接格式不正确')
            var req = await this.ajax('/carousel/add', { 
                img: this.posterObj.img,
                url: this.posterObj.url
             })
            if(req && req.code == this.successCode){
                this.showaAddPoster = false
                this.posterObj.img = ''
                this.posterObj.url = ''
                this.getLunboList()
            }
        },
        async delLunbotu(id){
            var req = await this.ajax('/carousel/delete', { id })
            if(req && req.code == this.successCode){
                this.messageTip(req.message || '成功', 1)
                this.getLunboList()
            }else this.messageTip(req && req.message ? req.message : '失败')
        },
        async delArea(id){
            var req = await this.ajax('/course/delete', { id })
            if(req && req.code == this.successCode){
                this.messageTip(req.message || '成功', 1)
                this.getAreaList()
            }else this.messageTip(req && req.message ? req.message : '失败')
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
    font-size: 16px
    line-height: 40px
    overflow: hidden
    i
        margin-right: 5px
    .add
        padding: 0 16px
        float: right
        line-height: 28px
        font-size: 12px
        border-radius: 3px

.class-desc
    background: #eee

.box
    background: #fff
    border-radius: 5px
    // margin: 10px auto
    margin-bottom: 30px
    // padding: 20px
    width: 700px
    .ctn
        > div
            overflow: hidden
            margin: 10px
            border-bottom: 1px solid #eee
            padding: 10px
            .el-button
                margin-top: 10px

.lunbotu
    img
        max-width: 200px

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
