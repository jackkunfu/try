<template lang="pug">
    div(style="height:100%;")
        .table-main.no-nav
            div.table-ctn(v-show="!isInput")
                .page-title 门店配置
                .search-ctn
                    el-form(:inline="true" :model="searchMsg"  class="demo-form-inline")
                        el-form-item(label="门店名称")
                            el-input(placeholder="输入门店关键字，请勿带符号" v-model="searchMsg.storeName")

                        el-form-item(label="门店编号")
                            el-input(placeholder="输入门店编号" v-model="searchMsg.storeNum")



                        //- el-form-item(class="edit-address" label="门店所在地")
                            v-distpicker(hide-area @province="province" @city="city" ref="distpicker")

                        //- br
                        //- el-form-item( class="search-time" label="设店时间")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择开始日期" v-model="searchMsg.startTime" style="width: 100%;")
                            el-col(:span="11")
                                el-date-picker(type="date" placeholder="选择结束日期" v-model="searchMsg.endTime" style="width: 100%;")

                        el-form-item(label="所属片区")
                            el-select(placeholder="请选择所属片区" v-model="searchMsg.areaId")
                                el-option(v-for="(item, i) in zoneList" :label="item.areaName" :value="item.id" :key="i" class="s2")

                        br
                        el-form-item(label="店长姓名")
                            el-input(placeholder="输入店长姓名，请勿带符号" v-model="searchMsg.cName")
                        el-form-item(label="店长电话")
                            el-input(placeholder="输入店长电话" v-model="searchMsg.cMobile")

                    el-button( type="primary" icon="search" @click="tableList" ref="search") 按条件查询
                    a.reset-form(@click="clearSearch")  清空筛选条件
                    el-button( type="success" @click="add" ref="add" v-if="!notOp") 添加门店

                    //- el-button( type="success" @click="addLot") 批量添加门店
                    //- el-button( type="success" @click="isInput=true;isLot=true;" ref="import") 批量添加门店
                    //- input(type="file" ref="upfile" @change="addLotChange" style="display:none;")

                mtable(:keys="keys" :tableData="tableData" :ops="operates" :selfApi="selfApi" :totalPage="totalPage" :currentPage="currentPage" 
                    @edit="edit" @unbund="unbund" @goClerk="goClerk"
                     @pageChange="pageChange" @editShopOwner="editShopOwner" :tabOp="tabOp" :canOp="notOp")

            div.edit-ctn(v-show="isInput && !isLot")
                .page-title {{curOperate}}门店
                .form-ctn
                    el-form(:model="editItem" label-width="80px")
                        el-form-item(label="门店名称")
                            el-input(type="text" v-model="editItem.storeName" placeholder="20字以内")
                        el-form-item(v-if="curOperate == '添加'" label="所属片区")
                            el-select(placeholder="请选择所属片区" v-model="editItem.areaId")
                                el-option(v-for="(item, i) in zoneList" :label="item.areaName" :value="item.id" :key="i" class="s2")
                        el-form-item(v-if="curOperate == '配置'" label="所属片区")
                            el-select(placeholder="请选择所属片区" v-model="editItem.areaId" disabled)
                                el-option(v-for="(item, i) in zoneList" :label="item.areaName" :value="item.id" :key="i")
                        
                        .border-line
                        el-form-item(label="门店电话")
                            el-input(placeholder="请输入固话" type="text" v-model="editItem.storePhone")
                        el-form-item(label="门店编号")
                            el-input(type="text" v-model="editItem.storeNumber")

                        el-form-item(v-if="curOperate == '添加' || curOperate == '配置'" class="edit-address" label="门店地址")
                            v-distpicker(@province="province1" @city="city1" @area="area1"
                                :province="editItem.province" :city="editItem.city" :area="editItem.district")

                        el-form-item(v-if="curOperate == '添加' || curOperate == '配置'" label="详细地址" class="map-address")
                            el-input(type="textarea" placeholder="请输入详细地址" v-model="editItem.address")
                            .map(v-show="isMapShow")
                                #map-ctn

                        //- el-form-item(v-if="curOperate == '添加' || curOperate == '配置'" class="edit-map" label="门店坐标")
                            el-input(type="text" placeholder="坐标，从地图选择自动填充" v-model="editItem.position")
                            el-button(class="right-btn" style="padding:10px 6px" type="primary" @click="openMap") 从地图上获取

                        //- el-form-item(class="business-time" label="营业时间")
                            //- el-time-picker(is-range placeholder="选择时间范围" v-model='oCtime')
                            el-time-select(placeholder="开始时间" v-model="editItem.openTime" class="time"
                                :picker-options="{ start: '05:30', step: '00:15', end: '22:30'}")
                            el-time-select(placeholder="结束时间" v-model="editItem.closeTime" class="time"
                                :picker-options="{ start: '05:30', step: '00:15', end: '22:30'}")

                        el-form-item(v-if="curOperate == '添加' || curOperate == '配置'" label="门店简介")
                            el-input(type="textarea" v-model="editItem.storeDescription" :value="editItem.storeInformation")

                        .border-line(v-if="curOperate == '添加' || curOperate == '配置'")

                        el-button.left(type="primary" @click="editOk") 完成
                        //- el-button(type="success" @click="editOk(setShopOwner)") 完成去配置对应店长
                        .goBack(@click="goBack") 返回

            .edit-ctn(v-show="isLot")
                .page-title 批量增加门店
                .form-ctn
                    el-upload(class="avatar-uploader" show-file-list=false accept="application/vnd.ms-excel"
                        drag :action="upImgUrl" name="upfile" :file-list="fileList" list-type="picture" :with-credentials="isWithCookie" :multiple="isMultiple"
                        :data="upImgData" :on-success="upImgSuccess")
                        i( class="el-icon-upload")
                        div( class="el-upload__text") 将文件拖到此处，或
                            em 点击上传
                        div( class="el-upload__tip" slot="tip") 只能上传excel文件，且不超过500kb
                    //- el-upload(class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple)
                        i(class="el-icon-upload")
                        div(class="el-upload__text") 将文件拖到此处，或
                            em 点击上传
                    el-button.left(type="primary" @click="addMore") 完成
                    .goBack(@click="goBack") 返回

</template>

<script>
import config from '@/basic/config.js'

import upfile from '@/basic/mixins/upfile.js'

// scrollMore
import scrollMore from '@/basic/mixins/scrollMore.js'

var venId = JSON.parse(localStorage.saasUser || '{}').vendor_id;
var roleLevel = localStorage.roleLevel;

export default {
    name: 'role',
    mixins: [mixTable, upfile, scrollMore],
    data(){
        return {
            notOp: localStorage.roleLevel == 'STORE' || localStorage.roleLevel == 'MIME' || localStorage.roleLevel == 'NONE',  // 没权限是true
            isMapShow: false,
            isLot: false,
            zoneList: [],
            fileList: [],
            filename: '',   // 批量配置文件名
            longitude: '',
            latitude: '',
            keys: [
                {key: 'store.storeName', str: '门店名称'},
                // {key: 'vendorName', str: '供应商'},
                {key: 'areaName', str: '所属片区'},
                {key: 'store.storeNumber', str: '门店编号'},
                {key: 'store.storePhone', str: '门店电话'},
                {key: 'name', str: '店长'},
                {key: 'mobile', str: '店长手机'},
                // {key: 'createdTime', str: '设店时间'}
            ],
            oCtime: [],
            opTimeSet: {
              start: '08:30',
              step: '00:15',
              end: '22:30'
            },
            coTimeSet: {
              start: '08:30',
              step: '00:15',
              end: '22:30',
            //-   minTime: editItem.openTime
            },
            operates: [
                {f: 'edit', str: '编辑'},
                {f: 'unbund', str: '配店长'},
                {f: 'self', str: '查职员', fun: 'goClerk', ref:'shop',type:"success"},
            ],
            searchKeys: ['storeName', 'storeNum','areaId','cName','cMobile'],
            editKeys: ['storeName', 'vendorId', 'areaId', 'storePhone','storeNumber',  'address', 'storeDescription',],
            zonePage: 1,
            zoneTotal: 0
        }
    },
    async mounted(){
        if(this.$route.query.op && this.$route.query.op == "add"){
            if(this.$route.query.info){
                if(this.$route.query.areaId){
                    this.editItem.areaId = this.$route.query.info.areaName;
                    // this.editItem.storeId = this.$route.query.info.store.storeName;
                }
            }
            if(this.$route.query.info.clerk){
                this.curOperate = '编辑'
            }else{
                this.curOperate = '配置'
            }
            this.curEditing.id = this.$route.query.areaId;
            this.isInput = true;
        }
        // this.tableList();
        this.areaListReq();
    },
    methods: {
        
         async selfEdit(item){
            var model = item.row.store;
            this.editItem.storeName = model.storeName;
            this.editItem.storePhone = model.storePhone;
            this.editItem.storeNumber = model.storeNumber;
            this.editItem.storeId = model.id;
            this.editItem.vendorId = venId;
            if(this.editItem.store) delete this.editItem.store;
            if(this.editItem.areaName) delete this.editItem.areaName;
            if(this.editItem.mobile) delete this.editItem.mobile;
            if(this.editItem.name) delete this.editItem.name;
            if(this.editItem.class) delete this.editItem.class;
            if(this.editItem.vendorName) delete this.editItem.vendorName;
        },
        async tableList(){
            this.searchMsg.vendorId = venId;
            var opts1 = $.extend(true,{
                _api: 'pd.store.list',
                _v: '3.0',
                limit: 10,
                offset: (this.currentPage - 1)*10
            },this.searchMsg);
            var list = await tryAwait('get','',opts1,true);
            if(list && list.success){
                this.tableData = list.model;
            }else{
                this.$message({
                    type: 'error',
                    message: list.msgInfo,
                    offset: 100
                });
            }
        },

        async editOk(){
            if(this.curOperate == '添加' || this.curOperate == '配置'){
                this.editItem.vendorId = venId;
                this.editItem.province = this.editItem.provinceCode;
                this.editItem.city = this.editItem.cityCode;
                this.editItem.district = this.editItem.districtCode;
                if(this.$route.query.areaId) this.editItem.areaId = this.$route.query.areaId; 
                // console.log(this.editItem)
                if(!this.testRule()) return
                var opts1 = $.extend(true, {
                    _api: 'pd.store.add',
                }, this.editItem)
                var addStore = await tryAwait('get', '', opts1, true);
                if(addStore && addStore.success){
                    this.$message({
                        type: 'success',
                        message: '门店添加成功~',
                        offset: 100
                    });
                    if(this.$route.query.areaId){
                        this.$router.push({path:'/sa-area'});
                        this.tableList();
                    }else{
                        this.isInput = false;
                        this.tableList();
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: addStore.msgInfo,
                        offset: 100
                    });
                }
            }else{
                if((this.editItem.storeName+'').trim()==''
                ||(this.editItem.storePhone+'').trim()==''
                ||(this.editItem.storeNumber+'').trim()=='')
                {
                    this.$message({
                        type: 'warning',
                        message: '请将信息填写完整~',
                        offset: 100
                    })
                }else{
                    var opts1 = $.extend(true,{
                        _api: 'pd.store.update',
                    },this.editItem);
                    var editStore = await tryAwait('get','',opts1,true);
                    if(editStore && editStore.success){
                        this.isInput = false;
                        this.$message({
                            type: 'success',
                            message: '门店信息修改成功~~',
                            offset: 100
                        });
                        this.tableList();
                    }else{
                        if(editStore.msgInfo == '固定电话格式不正确'){
                            this.$message({
                                type: 'error',
                                message: '请在门店电话前将区号补充完整~',
                                offset: 100
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: editStore.msgInfo,
                                offset: 100
                            });
                        }
                        
                    }
                }
            }
            
        },

        async unbund(scope, type){
            console.log(scope);
            if(type == 0){
                var name = scope.row.name;
                var mobile = scope.row.mobile;
                var res = await tryAwait('get','',{
                    _api: 'pd.user.create',
                    _v: '2.0',
                    name: name,
                    mobile_ex: mobile,
                },true);
                if(res && res.success){
                    var userId = res.model.uid;
                    var unbund = await tryAwait('get','',{
                        _api: 'pd.employee.undesignate',
                        vendorId: venId,
                        userId: userId
                    },true);
                    if(unbund && unbund.success){
                        this.$message({
                            type: 'success',
                            message: '解绑成功~'
                        });
                        this.tableList()
                    }else{
                        this.$message({
                            type: 'error',
                            message: unbund.msgInfo
                        })
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msgInfo
                    })
                }
            }else{   // 配置店长
                var data = scope.row
                console.log(data);
                var storeId = data.store.id;
                var storeName = data.store.storeName;
                this.$router.push({
                    path:'/sa-shopowner', 
                    query:{
                        storeId,
                        storeName,
                        op: 'add',
                        info: JSON.stringify(data)
                    }
                })
            }
        },

        async goClerk(scope){
            console.log(scope);
            var data = scope.row;
            var storeId = data.store.id || '';
            var storeName = data.store.storeName || '';
            var host = location.href.split('/#')[0];
            var url = host +'/#/sa-clerk?storeId='+storeId+'&storeName='+storeId;
            window.open(url, '_blank')

            // this.$router.push({
            //     path: '/sa-clerk',
            //     query: {
            //         storeId,
            //         storeName
            //     }
            // })
        },

       

        async areaListReq(){
            var opts1 = {
                _api: 'pd.area.search',
                _v: '2.0',
                vendorId: venId,
                type: 2,  // 1:大区，2:片区，-1:虚拟大区，-2:虚拟片区
                status: 1, // 0: 下架   1：上架
                limit: 50,
                // offset: (this.currentPage - 1)*10
                offset: 0
            }
            var area = await tryAwait('get', '', opts1, true)
            if(area.success){
                this.zoneList = area.model;
            }else{
            }
        },

        openMap(){
            var _this = this;
            if(this.isMapShow){
                this.isMapShow = false;
                return;
            }
            this.isMapShow = true;
            var map = new AMap.Map('map-ctn',{
                resizeEnable: true,
                zoom: 10
            });
            map.on('click', function(e) {
                console.log(e)
                var lng = e.lnglat.getLng();
                var lat = e.lnglat.getLat();
                _this.editItem.position = lng + ',' + lat;
                $.ajax({
                    type: 'GET',
                    url: 'https://restapi.amap.com/v3/geocode/regeo',
                    dataType:'JSON',
                    data: {
                        "output": "JSON",
                        "location": lng + "," + lat,
                        "key": "5b384bd6b1c25c86a18cdef18c82c679",
                        "radius": 10,
                        "extensions": "base"
                    },
                    success:function(data){
                        console.log(data);
                        _this.editItem.address = data.regeocode.formatted_address;
                        // var positionArr = _this.editItem.position.split(',');
                        // _this.editItem.longitude = positionArr[0];
                        // _this.editItem.latitude = positionArr[1];


                    }
                })
            });
        },


// =============================================================================
        upImgSuccess(d){
            if(d.success){
                this.fileList = [
                    {name: d.model[0].filename, url: d.model[0].url + d.model[0].filename}
                ]
                this.filename = d.model[0].filename;
            }else{
                alert('上传失败');
                this.fileList = [];
            }
        },
        async addMore(){
            if(!this.filename){
                this.$message({
                    type: 'error',
                    message: '文件上传不正确~'
                })
                return
            }
            var res = await tryAwait('post', '/store/fileupDo', {filename: this.filename});
            if(res.success && res.model == '操作成功'){
                this.$message({
                    type: 'success',
                    message: '数据导入成功~'
                })
                this.tableList(1);
            }else{
                this.$message({
                    type: 'error',
                    message: res.model
                })
            }
        },
        province(v){
            this.searchMsg.province = v.code;
            this.searchMsg.city = '';
        },
        city(v){
            this.searchMsg.city = v.code;
            this.searchMsg.zone = '';
        },
        area(v){
            this.searchMsg.zone = v.code || v.value;
        },
        province1(v){
            this.editItem.provinceCode = v.code;
            this.editItem.cityCode = '';
        },
        city1(v){
            this.editItem.cityCode = v.code;
            this.editItem.districtCode = '';
        },
        area1(v){
            this.editItem.districtCode = v.code || v.value;
        },
        
        // async editShopOwner(scope){
        //     alert(1)
        //     var storeId = scope.row.storeId;
        //     var childAreaId = scope.row.areaId;
        //     var request = await tryAwait('get', '/smanager/edit', {
        //         storeId: storeId,
        //         childAreaId: childAreaId,
        //         userId: scope.row.clerkUserId
        //         // userId: localStorage.pdSaasUserId
        //     })
        //     if(request.success){
        //         var data = JSON.parse(request.model);
        //         console.log(data)
        //         this.$router.push({path:'/sa-shopowner', query:{storeId: storeId, op: 'add', info: data }});
        //     }
        // },
        testRule(){
            if(!this.editItem.storeName || this.editItem.storeName.trim()=='' || this.editItem.storeName.trim().length>20) {
                this.$message({
                    type: 'error',
                    message: '名称须为1-20长度~'
                })
                return false;
            }
            if(this.editItem.areaId == '') {
                this.$message({
                    type: 'error',
                    message: '未选片区~'
                })
                return false;
            }
            var reg1 = /^1[34578]\d{9}$/;
            var reg2 = /^0\d{2,3}(-|)\d{7,8}(-\d{1,6})?$/;
            var storePhone = this.editItem.storePhone.trim()
            if(storePhone == '' || !(reg1.test(storePhone) || reg2.test(storePhone))  ) {
                this.$message({
                    type: 'error',
                    message: '门店电话格式不对~'
                })
                return false;
            }
            if(!this.editItem.storeNumber || this.editItem.storeNumber == '') {
                this.$message({
                    type: 'error',
                    message: '门店编号没填~'
                })
                return false;
            }
            if(!this.editItem.province || !this.editItem.city || !this.editItem.district) {
                this.$message({
                    type: 'error',
                    message: '地址选择有误~'
                })
                return false;
            }
            if(!this.editItem.address || this.editItem.address.trim() == '') {
                this.$message({
                    type: 'error',
                    message: '详细地址没填~'
                })
                return false;
            }
            // if( !this.editItem.position || this.editItem.position == '' ) {
            //     this.$message({
            //         type: 'error',
            //         message: '坐标没填~'
            //     })
            //     return false;
            // }
            // 非比选，先注释
            //- if(this.editItem.openTime == '' || this.editItem.closeTime == ''){
            //-     this.$message({
            //-         type: 'error',
            //-         message: "营业时间没选~"
            //-     })
            //-     return false
            //- }
            // if( (this.editItem.openTime.replace(':', '') - 0) >= (this.editItem.closeTime.replace(':', '') - 0) ){
            //     this.$message({
            //         type: 'error',
            //         message: "营业结束时间不能小于开始时间~"
            //     })
            //     return false
            // }
            // if(!this.editItem.storeInformation || this.editItem.storeInformation.trim() == '') {
            //     this.$message({
            //         type: 'error',
            //         message: '简介没填~'
            //     })
            //     return false;
            // }
            //- this.editItem.openTime = this.oCtime[0]
            //- this.editItem.closeTime = this.oCtime[1]
            this.editItem.storeName = this.editItem.storeName.trim();
            return true;
        },
        setShopOwner(d){
            this.$router.push({path:'/sa-shopowner', query: {id: d.model.id, op: 'add'}})
        },
        addLot(){  // 触发上传图片
            $(this.$refs.upfile).click();
        },
        async addLotChange(){   // 批量上传
            var file = this.$refs.upfile.files[0];
            var arr = $(this.$refs.upfile).val().split('\\');
            var name = arr[arr.length-1];
            var formData = new FormData();
            formData.append('upfile', file);
            formData.append('biz', 'vendor');
            //- formData.append('filename', name);

            config.upfile(formData, async (d) => {
                var res = await tryAwait('post', '/store/fileupDo', {filename: name})
                res.success && this.tableList(1);
            });
        },
        selfEditCancel(){
            //- 清空上传的文件列表
            Array.prototype.forEach.call($('.el-icon-close'), function(v){
                v.click();
            })
        }
    }
}
</script>

<style lang="sass" scoped>

.search-address
    .el-select
        margin-right: 15px;

.notice
    position: absolute;
    left: 400px;
    top: 0;
    color: red;
.map-address
    position: relative;
    .map
        background-color: #fff;
        position: absolute;
        top: -70px;
        right: -330px;
#map-ctn
    width: 300px;
    height: 200px;

.time
    input
        width: 120px!important;

</style>
