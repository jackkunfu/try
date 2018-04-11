<template lang="pug">
    div(style="height:100%;")
        .table-main
            .table-ctn(v-if="!isInput")
                .page-title 优惠券分类-公共
                .search-ctn
                    //- el-form(:inline="true" :model="searchMsg" class="demo-form-inline")
                        //- el-form-item(label="分类名称")
                            el-input(type="text" v-model="searchMsg.name" placeholder="分类名称")
                            
                        //- el-form-item(label="分类名称")
                            el-select(placeholder="请选择" v-model="searchMsg.name")
                                el-option(v-for="(item, i) in couponCatelogoList" :label="item.categoryName" :value="item.categoryName" :key="i")

                        //- el-form-item(label="状态")
                            el-select(placeholder="请选择" v-model="searchMsg.status")
                                el-option(label="上架" value="1")
                                el-option(label="下架" value="0")

                        //- el-form-item( class="search-time" label="最后编辑于")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                    //- el-button(type="primary" icon="search" @click="searchList" ref="search") 按条件查询
                    //- a.reset-form(@click="clearSearch")  清空筛选条件
                    //- el-button(type="success" @click="add" ref="add") 添加分类(所有供应商可用)
                    //- el-button(type="success" @click="editThisAll" ref="add") 编辑当前供应商分类列表

                el-button(type="success" @click="add" ref="add" style="margin-bottom: 10px;") 添加分类(所有供应商可用)
                mtable(:keys="keysAll" :tableData="allCategoryList" :ops="operates" :tabOp="tabOp"
                    @edit="edit" @shelf="shelf" @pageChange="pageChange")

            .edit-ctn(v-show="isInput")
                .page-title {{curOperate}}优惠券分类
                .form-ctn
                    el-form(:model="editItem" label-width="90px" style="width: 450px")

                        el-form-item(label="分类名称")
                            el-input(type="text" v-model="editItem.name" placeholder="分类名称")

                        //- el-form-item(label="展示序号" v-if="!curEditing.id")
                            el-input(type="number" v-model="editItem.num" placeholder="展示序号")

                        el-form-item(label="分类图标")
                            div.upfile
                                input(type="file" ref="up1" )
                                button 点击上传
                                img(:src="editItem.icon" style="max-width: 100px;max-height: 100px;")

                        el-button(type="primary" @click="editOk") 完成
                        .goBack(@click="goBack") 返回

</template>

<script>
import upfile from '@/basic/mixins/upfile.js'
import upOss from '@/basic/mixins/upOss.js'

export default {
    name: 'role',
    mixins: [mixTable, upfile, upOss],
    data(){
        return {
            allCategoryList: [],     // 所有分类
            couponCatelogoList: [],   // 当前供应商分类
            fileList: [],   // 分类图片数组
            searchMsg: {
                name: '',
                startTime: '',
                endTime: ''
            },

            keys: [
                {key: 'imgUrl', str: '图标'},
                {key: 'categoryName', str: '分类名称'},
                {key: 'status', str: '状态'},
                // {key: 'updatedTime', str: '添加时间'}
            ],
            keysAll: [
                {key: 'imgUrl', str: '图标'},
                {key: 'categoryName', str: '分类名称'},
                {key: 'statusStr', str: '状态'},
            ],
            operates: [
                {f:'edit', str: '编辑'},
                {f:'shelf', str: '上下架删除'}
            ],
            // 搜索的各个字段配置
            searchKeys: ['status', 'name'],    //  'startTime', 'endTime',
            // 编辑的各个字段配置
            editKeys: ['name', 'icon'],   // serialNum
        }
    },
    async mounted(){
        // var sort = await tryAwait('get', '/couponCategory/categorylist');
        // this.couponCatelogoList = sort ? (sort.model ? sort.model : []) : [];

        this.$nextTick(()=>{
            this.$refs.up1.addEventListener('change', () =>{
                this.upOss(this.$refs.up1.files[0]).then( res =>{
                    this.editItem.icon = 'http://files.iputong.com/Saas2/' + res;
                });
            })
        })

    },
    methods: {

        async tableList(){
            var allCategoryData = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.search',
                offset: (this.currentPage-1)*10,
                limit: 10
            }, true)).model || []

            this.allCategoryList = allCategoryData.map( v =>{
                v.imgUrl = v.categoryIcon
                v.statusStr = v.status == 1 ? '上架' : '下架'
                return v
            })

        },

        async searchList(){
            var data = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.fetch',
                // status: this.searchMsg.status,
                // name: (this.searchMsg.name+'').trim()
            }, true))
            
            if(data && data.success && data.model){
                this.tableData = this.changeTableData(data.model)
            }
        },

        changeTableData(v){
            return v.map( el => this.changeItem(el) )
        },

        changeItem(item){
            return item
        },

        async shelf(scope, status){    // 上下架删除
            // console.log(scope)
            var sta = !!status ? -1 : scope.row.status==1 ? 0 : 1;
            var res = (await tryAwait('post', '', {
                _api: 'pd.coupon.category.shelf',
                // id: scope.row.categoryId,
                id: scope.row.id,
                status: sta    //0=上架，1=下架，-1=删除
            }, true))
            var thisData = JSON.parse(JSON.stringify(scope.row))
            if(res.success){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.tableList();
            }
        },

        async editOk(){
            if( (this.editItem.name+'').trim() == '' ){
                this.$message({
                    type: 'error',
                    message: '分类名称不能为空'
                })
                return
            }
            if( (this.editItem.icon+'').trim() == '' ){
                this.$message({
                    type: 'error',
                    message: '分类图标没有上传'
                })
                return
            }
            var opt = {
                _api: this.curOperate == '编辑' ? 'pd.coupon.category.update' : 'pd.coupon.category.create'
            }
            if(this.curOperate == '编辑') opt.id = this.curEditing.id
            var opts1 = $.extend(true, opt, this.editItem)
            var d1 = await tryAwait('get', '', opts1, true);
            this.$message({
                type: d1 && d1.success ? 'success' : 'error',
                message: d1.msgInfo || (d1 && d1.success ? this.curOperate+'成功' : this.curOperate+'失败')
            })
            if(d1 && d1.success){
                this.isInput = false;
                this.tableList();
                // var id = d1.mod
                // var data = (await tryAwait('post', '', {
                //     _api: 'pd.coupon.category.fetch',
                //     // status: this.searchMsg.status,
                //     // name: (this.searchMsg.name+'').trim()
                // }, true)).model || []

                // data.reduce( v =>{

                // }, '')
            }
        },
        selfEdit(item){
            var data = item.row
            this.editItem = {
                name: data.categoryName,
                icon: data.categoryIcon
            }
            // alert(data.id)
            this.curEditing.id = data.id;
        },

        // async edit(scope){
        //     var id = scope.row.id;
        //     var data = await tryAwait('get', '/couponCategory/couponEdit', {couponId: id});
        //     // data.success &&
        // },
        
        changeTableData(d){    // 直接请求到的数据不能直接使用，这里继续处理下
            return d.map((v)=>{
                v.statusKey = v.status;
                v.imgUrl = v.categoryIcon;
                v.status = v.status == 1 ? '上架' : '下架';
                return v;
            });
        },
        
        upImgSuccess(v){
            if(!v.success){
                this.fileList = [];
                this.$message({
                    type: 'error',
                    message: v.msgInfo
                })
                return
            }
            var img0 = v.model[0]
            this.fileList = [{
                name: img0.filename,
                url: img0.url
            }]
            this.editItem.categoryIcon = img0.url + img0.filename;
        },
        testRule() {
            if(this.editItem.serialNum == undefined || isNaN((this.editItem.serialNum+'').trim()-0) || ((this.editItem.serialNum+'').trim()-0) < 0){
                this.$message({
                    type: 'error',
                    message: '序号未填或有误：大于0'
                })
                return false
            }
            if(!this.editItem.categoryName || this.editItem.categoryName.trim() == '' || this.editItem.categoryName.trim().length>4){
                this.$message({
                    type: 'error',
                    message: '分类未填或有误，1-4位字符'
                })
                return false
            }
            if(!this.editItem.categoryIcon || this.editItem.categoryIcon == ''){
                this.$message({
                    type: 'error',
                    message: '图标未传'
                })
                return false
            }
            if(this.editItem.id){  // 如果是编辑状态
                this.editItem.shelves = this.editItem.statusKey;
                delete this.editItem.status;
            }
            return true;
        }
    }
}
</script>

<style lang="sass" scoped>
.edit-ctn .form-ctn .transfer-item
    width: 550px;

.el-upload__tip
    margin-top: -35px;
    text-align: center;

.edit-address
    .address
        select
            width: 115px!important;
            height: 36px!important;
            border-radius: 5px!important;
            border: 1px solid #8391a5!important;

.avatar-uploader
    .el-upload
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

.avatar-uploader
    .el-upload
        &:hover
            border-color: #20a0ff;

.avatar-uploader-icon
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

.avatar
    width: 178px;
    height: 178px;
    display: block;

</style>
