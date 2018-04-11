<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            .table-ctn(v-show="!isInput&&!isRole")
                .page-title 客户端配置
                .search-ctn
                    el-button(type="success" @click="add" ref="add") 新增
                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" 
                :totalPage="totalPage" :currentPage="currentPage" @download="download" @pageChange="pageChange" 
                :tabOp="tabOp")

            .edit-ctn(v-show="isInput")
                .page-title 上传客户端

                .form-ctn.long
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="apk文件")
                            div.upfile
                                input(type="file" ref="upfile" )
                                button 点击上传

                        el-form-item(label="包类型")
                            el-input(placeholder="安装包类型" v-model="editItem.tag" disabled)
                        el-form-item(label="版本号")
                            el-input(placeholder="安装包版本号" v-model="editItem.buildVersion" disabled)
                        el-form-item(label="build")
                            el-input(placeholder="安装包build号" v-model="editItem.buildNo" disabled)
                        
                        el-form-item(label="标题")
                            el-input(placeholder="请输入安装包标题~" v-model="editItem.title")
                        el-form-item(label="描述")
                            el-input(placeholder="请输入100字以内的描述~" v-model="editItem.content")
                        el-form-item(label="平台")
                            el-select(placeholder="请输入100字以内的描述~" v-model="editItem.platform")
                                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.label")
                        el-form-item(label="更新类型")
                            el-radio-group(v-model="editItem.isForceUpdate")
                                el-radio(:label="1") 强制更新
                                el-radio(:label="0") 提示更新
                                //- el-radio(:label="3") 不更新

                .sure.left(@click="editOk") 提交
                .goBack(@click="goBack") 返回

            .edit-ctn(v-if="isDown")
                .download
                    .er-img
                        img.download-img(:src="'http://qr.topscan.com/api.php?text='+downloadUrl")
                        i.close(class="fa fa-times" @click="closeDown")

</template>

<script>
import config from '@/basic/config.js'

import upfile from '@/basic/mixins/upfile.js'

import upOss from '@/basic/mixins/upOss.js'

// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'
var venId = localStorage.saasUser ? JSON.parse(localStorage.saasUser).vendor_id : '';
export default {
    name: 'role',
    mixins: [mixTable, upfile, scrollMore, upOss],
    data(){
        return {
            upfile: true,
            isDown: false,
            downloadUrl: '',
            keys: [
                {key: 'tag', str: '安装包类型'},
                {key: 'buildVersion', str: '版本号'},
                {key: 'buildNum', str: 'build号'},
                {key: 'createdTime', str: '上传时间'},
                {key: 'content', str: '描述'},
                {key: 'updateType', str: '是否强制更新'},
                
            ], 
            options: [
                {label: 'android',value:'1'},
                {label: 'ios',value:'2'},
            ],
            operates: [
                {f: 'self', str: '下载', fun: 'download', type:'primary'},
            ],
            // 编辑的各个字段配置
            editKeys: ['title', 'content', 'tag', 'platform', 'downloadUrl', 'buildNo', 'buildVersion', 'isForceUpdate'],
         
        }
    },
    async mounted(){
        
        this.$nextTick(()=>{
            
            // 上传文件
            this.$refs.upfile.addEventListener('change', () =>{
                this.upOss(this.$refs.upfile.files[0]).then( res =>{
                    this.$set(this.editItem, 'downloadUrl', 'http://files.iputong.com/Saas2/' + res);
                    console.log(this.editItem.downloadUrl);
                    var fileMsg = res.split('-');
                    this.editItem.tag = fileMsg[0].split('.')[2][0];
                    this.editItem.buildVersion = fileMsg[3];
                    this.editItem.buildNo = fileMsg[4].split('(')[0];
                    this.editItem.downloadUrl = encodeURIComponent(this.editItem.downloadUrl);
                    this.$message({
                        type: 'success',
                        message: '安装包上传成功，请继续填写信息~'
                    });
                });
            })
            
            
        })
    },
    methods: {
        async tableList(){
            var roleList = (await tryAwait('get', '', {
                _api: 'pd.app.store.get',
                limit: 10,
                offset: (this.currentPage - 1)*10
            }, true)).model || [];
            roleList.forEach((v,i)=>{
                v.updateType = v.isForceUpdate === false ? '否' : '是';
            })
            this.tableData = roleList;
            console.log('this.tableData')
            console.log(this.tableData)
        },
        async editOk(){
            console.log(this.editItem)
            if(this.editItem.tag==''){
                this.$message({
                    type: 'warning',
                    message: '请将安装包上传~'
                });
                return
            }
            if(this.editItem.title=='' || this.editItem.content=='' || this.editItem.isForceUpdate===''){
                this.$message({
                    type: 'warning',
                    message: '请将信息填写完整~'
                });
                return
            }
            this.editItem.isForceUpdate = this.editItem.isForceUpdate == 0 ? false : true;
            this.editItem.buildNo = Number(this.editItem.buildNo);
            var opts1 = $.extend(true,{
                _api: 'pd.app.store.add',
            },this.editItem);
            var list = await tryAwait('get','',opts1,true);
            if(list && list.success){
                this.$message({
                    type: 'success',
                    message: '上传成功~'
                })
                this.isInput = false;
                this.tableList();
            }else{
                this.$message({
                    type: 'error',
                    message: list.msgInfo,
                    offset: 100
                });
            }
        },

        async download(scoped){
            this.isDown = true;
            this.downloadUrl = '';
            this.downloadUrl = scoped.row.downloadUrl;

        },
        closeDown(){
            this.isDown = false;
        }
        
    },
    
    
}
</script>

<style lang="sass" scoped>
.el-menu-item.is-active
    border-bottom: 5px solid #20a0ff;
ul.choose-ctn
    margin-top: 20px;
    li
        display: none;
        &.show
            display: block;
.goBack
    top: 10px;
.page-title
    a
        font-size: 14px;
        font-weight: 500;
        margin-right: 100px;
.download
    position: relative;
    z-index: 100;
    .er-img
        width: 300px;
        height: 300px;
        background: #fff;
        border: 1px solid #000;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        .close
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
        img
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto;
            margin-top: 50px;




</style>
