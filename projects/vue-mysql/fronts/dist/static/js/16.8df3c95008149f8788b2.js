webpackJsonp([16],{460:function(e,t,s){s(565);var i=s(165)(s(513),s(606),"data-v-13d75e67",null);e.exports=i.exports},468:function(e,t,s){"use strict";var i=s(76),a=s.n(i),r=s(75),o=s.n(r);t.a={methods:{scrollMore:function(e,t,s,i,r,n){var l=this;$(e).parents(".el-select-dropdown__wrap").scroll(o()(a.a.mark(function e(){var o,c,d,m,p,u,h;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=$(this),c=o.height(),d=o.get(0).scrollHeight,m=o.scrollTop(),!(d-c-m<=10)){e.next=12;break}if(l[s]++,!(l[i]<l[s])){e.next=5;break}return e.abrupt("return");case 5:return p={page:l[s]},n&&$.extend(!0,p,n),e.next=9,tryAwait("get",r,p);case 9:u=e.sent,u&&(h=u.model||[]),h.length>1&&(l[t]=l[t].concat(h));case 12:case"end":return e.stop()}},e,this)})))}}}},469:function(e,t,s){"use strict";var i=s(166),a={data:function(){return{fileList:[],upImgSize:.5,upImgUrl:i.a.upImgUrl,upImgData:{biz:"vendor"},imageUrl:"",isWithCookie:!0,isMultiple:!1}},methods:{beforeUpload:function(){var e="image/jpeg"===file.type,t=file.size/1024/1024<this.upImgSize;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),t||this.$message.error("上传头像图片大小不能超过"+this.this.upImgSize+"MB!"),e&&t},handleChange:function(){},upImgSuccess:function(){}}};t.a=a},513:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(76),a=s.n(i),r=s(75),o=s.n(r),n=s(166),l=s(469),c=s(468);t.default={name:"role",mixins:[mixTable,l.a,c.a],data:function(){return{isMapShow:!1,isLot:!1,zoneList:[],fileList:[],filename:"",longitude:"",latitude:"",keys:[{key:"storeName",str:"门店名称"},{key:"vendorName",str:"供应商"},{key:"areaName",str:"所属片区"},{key:"storePhone",str:"门店电话"},{key:"clerkName",str:"店长"},{key:"clerkMobile",str:"店长手机"},{key:"createdTime",str:"设店时间"}],oCtime:[],opTimeSet:{start:"08:30",step:"00:15",end:"22:30"},coTimeSet:{start:"08:30",step:"00:15",end:"22:30"},operates:[{f:"edit",str:"编辑"},{f:"self",str:"配置店长",fun:"editShopOwner",ref:"shop"}],selfApi:{list:{type:"get",url:"/store/index"},edit:{type:"post",url:"/store/editDo"},add:{type:"post",url:"/store/addDo"}},searchKeys:["storeName","storeNumber","province","city","startTime","endTime","childArea"],editKeys:["storeName","storeNumber","storeInformation","vendorAreaId","storePhone","storeInformation","openTime","closeTime","storeAddress","longitude","latitude","position","time"],zonePage:1,zoneTotal:0}},mounted:function(){var e=this;return o()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"add"==e.$route.query.op&&e.$route.query.areaId&&(e.isInput=!0,e.isLot=!1,e.editItem.vendorAreaId=e.$route.query.areaId),t.next=3,tryAwait("get","/vendor/allList");case 3:s=t.sent,s&&(e.zoneList=s.model||[],e.zoneTotal=s.totalPage),e.$nextTick(function(){e.scrollMore(".s2","zoneList","zonePage","zoneTotal","/zone/index")});case 6:case"end":return t.stop()}},t,e)}))()},methods:{openMap:function(){var e=this;if(this.isMapShow)return void(this.isMapShow=!1);this.isMapShow=!0,new AMap.Map("map-ctn",{resizeEnable:!0,zoom:10}).on("click",function(t){console.log(t);var s=t.lnglat.getLng(),i=t.lnglat.getLat();e.editItem.position=s+","+i,$.ajax({type:"GET",url:"https://restapi.amap.com/v3/geocode/regeo",dataType:"JSON",data:{output:"JSON",location:s+","+i,key:"5b384bd6b1c25c86a18cdef18c82c679",radius:10,extensions:"base"},success:function(t){console.log(t),e.editItem.storeAddress=t.regeocode.formatted_address;var s=e.editItem.position.split(",");e.editItem.longitude=s[0],e.editItem.latitude=s[1]}})})},upImgSuccess:function(e){e.success?(this.fileList=[{name:e.model[0].filename,url:e.model[0].url+e.model[0].filename}],this.filename=e.model[0].filename):(alert("上传失败"),this.fileList=[])},addMore:function(){var e=this;return o()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.filename){t.next=3;break}return e.$message({type:"error",message:"文件上传不正确~"}),t.abrupt("return");case 3:return t.next=5,tryAwait("post","/store/fileupDo",{filename:e.filename});case 5:s=t.sent,s.success&&"操作成功"==s.model?(e.$message({type:"success",message:"数据导入成功~"}),e.tableList(1)):e.$message({type:"error",message:s.model});case 7:case"end":return t.stop()}},t,e)}))()},province:function(e){this.searchMsg.province=e.code,this.searchMsg.city=""},city:function(e){this.searchMsg.city=e.code,this.searchMsg.zone=""},area:function(e){this.searchMsg.zone=e.code||e.value},province1:function(e){this.editItem.provinceCode=e.code,this.editItem.cityCode=""},city1:function(e){this.editItem.cityCode=e.code,this.editItem.districtCode=""},area1:function(e){this.editItem.districtCode=e.code||e.value},edit:function(e){var t=this;return o()(a.a.mark(function s(){var i,r,o;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,tryAwait("get","/store/edit",{storeId:e.row.storeId});case 2:i=s.sent,i&&i.store.success&&(r=i.store.model,t.editItem=r,t.curOperate="编辑",t.curEditing.id=t.editItem.storeId=r.id,t.editItem.longitude&&t.editItem.latitude?t.editItem.position=t.editItem.longitude+","+t.editItem.latitude:t.editItem.position="",r.openTime?(o=t.editItem.openTime,"Invalid Date"!=new Date(o)&&(t.editItem.openTime=new Date(o).getHours()+":"+new Date(o).getMinutes())):t.$set(t.editItem,"openTime",""),r.closeTime?(o=t.editItem.closeTime,"Invalid Date"!=new Date(o)&&(t.editItem.closeTime=new Date(o).getHours()+":"+new Date(o).getMinutes())):t.$set(t.editItem,"closeTime",""),r.openTime&&r.closeTime&&(t.oCtime=[r.openTime,r.closeTime]),t.isInput=!0,void 0!=t.isAdd&&(t.isAdd=!1),void 0!=t.isLot&&(t.isLot=!1));case 4:case"end":return s.stop()}},s,t)}))()},editShopOwner:function(e){var t=this;return o()(a.a.mark(function s(){var i,r,o,n;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return i=e.row.storeId,r=e.row.areaId,s.next=4,tryAwait("get","/smanager/edit",{storeId:i,childAreaId:r,userId:e.row.clerkUserId});case 4:o=s.sent,o.success&&(n=JSON.parse(o.model),console.log(n),t.$router.push({path:"/sa-shopowner",query:{storeId:i,op:"add",info:n}}));case 6:case"end":return s.stop()}},s,t)}))()},testRule:function(){if(!this.editItem.storeName||""==this.editItem.storeName.trim()||this.editItem.storeName.trim().length>20)return this.$message({type:"error",message:"名称须为1-20长度~"}),!1;if(""==this.editItem.vendorAreaId)return this.$message({type:"error",message:"未选片区~"}),!1;var e=/^1[34578]\d{9}$/,t=/^0\d{2,3}(-|)\d{7,8}(-\d{1,6})?$/,s=this.editItem.storePhone.trim();return""==s||!e.test(s)&&!t.test(s)?(this.$message({type:"error",message:"门店电话格式不对~"}),!1):this.editItem.storeNumber&&""!=this.editItem.storeNumber?this.editItem.provinceCode&&this.editItem.cityCode&&this.editItem.districtCode?this.editItem.storeAddress&&""!=this.editItem.storeAddress.trim()?this.editItem.position&&""!=this.editItem.position?this.editItem.openTime.replace(":","")-0>=this.editItem.closeTime.replace(":","")-0?(this.$message({type:"error",message:"营业结束时间不能小于开始时间~"}),!1):this.editItem.storeInformation&&""!=this.editItem.storeInformation.trim()?(this.editItem.storeName=this.editItem.storeName.trim(),!0):(this.$message({type:"error",message:"简介没填~"}),!1):(this.$message({type:"error",message:"坐标没填~"}),!1):(this.$message({type:"error",message:"详细地址没填~"}),!1):(this.$message({type:"error",message:"地址选择有误~"}),!1):(this.$message({type:"error",message:"门店编号没填~"}),!1)},setShopOwner:function(e){this.$router.push({path:"/sa-shopowner",query:{id:e.model.id,op:"add"}})},addLot:function(){$(this.$refs.upfile).click()},addLotChange:function(){var e=this;return o()(a.a.mark(function t(){var s,i,r,l;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:s=e.$refs.upfile.files[0],i=$(e.$refs.upfile).val().split("\\"),r=i[i.length-1],l=new FormData,l.append("upfile",s),l.append("biz","vendor"),n.a.upfile(l,function(){var t=o()(a.a.mark(function t(s){var i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,tryAwait("post","/store/fileupDo",{filename:r});case 2:i=t.sent,i.success&&e.tableList(1);case 4:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}());case 7:case"end":return t.stop()}},t,e)}))()},selfEditCancel:function(){Array.prototype.forEach.call($(".el-icon-close"),function(e){e.click()})}}}},526:function(e,t,s){t=e.exports=s(425)(!1),t.push([e.i,".search-address .el-select[data-v-13d75e67]{margin-right:15px}.notice[data-v-13d75e67]{position:absolute;left:400px;top:0;color:red}.map-address[data-v-13d75e67]{position:relative}.map-address .map[data-v-13d75e67]{background-color:#fff;position:absolute;top:-70px;right:-330px}#map-ctn[data-v-13d75e67]{width:300px;height:200px}.time input[data-v-13d75e67]{width:120px!important}",""])},565:function(e,t,s){var i=s(526);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);s(426)("3bbd734c",i,!0)},606:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{height:"100%"}},[s("div",{staticClass:"table-main no-nav"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isInput,expression:"!isInput"}],staticClass:"table-ctn"},[s("div",{staticClass:"page-title"},[e._v("门店配置")]),s("div",{staticClass:"search-ctn"},[s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchMsg}},[s("el-form-item",{attrs:{label:"门店名称"}},[s("el-input",{attrs:{placeholder:"输入门店关键字，请勿带符号"},model:{value:e.searchMsg.storeName,callback:function(t){e.searchMsg.storeName=t},expression:"searchMsg.storeName"}})],1),s("el-form-item",{attrs:{label:"门店编号"}},[s("el-input",{attrs:{placeholder:"输入门店编号"},model:{value:e.searchMsg.storeNumber,callback:function(t){e.searchMsg.storeNumber=t},expression:"searchMsg.storeNumber"}})],1),s("el-form-item",{staticClass:"edit-address",attrs:{label:"门店所在地"}},[s("v-distpicker",{ref:"distpicker",attrs:{"hide-area":"hide-area"},on:{province:e.province,city:e.city}})],1),s("br"),s("el-form-item",{staticClass:"search-time",attrs:{label:"设店时间"}},[s("el-col",{attrs:{span:11}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择开始日期"},model:{value:e.searchMsg.startTime,callback:function(t){e.searchMsg.startTime=t},expression:"searchMsg.startTime"}})],1),s("el-col",{attrs:{span:11}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择结束日期"},model:{value:e.searchMsg.endTime,callback:function(t){e.searchMsg.endTime=t},expression:"searchMsg.endTime"}})],1)],1),s("el-form-item",{attrs:{label:"所属片区"}},[s("el-input",{attrs:{placeholder:"输入片区关键字，请勿带符号"},model:{value:e.searchMsg.childArea,callback:function(t){e.searchMsg.childArea=t},expression:"searchMsg.childArea"}})],1)],1),s("el-button",{ref:"search",attrs:{type:"primary",icon:"search"},on:{click:e.searchList}},[e._v("按条件查询")]),s("a",{staticClass:"reset-form",on:{click:e.clearSearch}},[e._v(" 清空筛选条件")]),s("el-button",{ref:"add",attrs:{type:"success"},on:{click:e.add}},[e._v("添加门店")]),s("el-button",{ref:"import",attrs:{type:"success"},on:{click:function(t){e.isInput=!0,e.isLot=!0}}},[e._v("批量添加门店")])],1),s("mtable",{attrs:{keys:e.keys,tableData:e.tableData,ops:e.operates,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{edit:e.edit,pageChange:e.pageChange,editShopOwner:e.editShopOwner}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isInput&&!e.isLot,expression:"isInput && !isLot"}],staticClass:"edit-ctn"},[s("div",{staticClass:"page-title"},[e._v(e._s(e.curOperate)+"门店")]),s("div",{staticClass:"form-ctn"},[s("el-form",{attrs:{model:e.editItem,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"门店名称"}},[s("el-input",{attrs:{type:"text",placeholder:"20字以内"},model:{value:e.editItem.storeName,callback:function(t){e.editItem.storeName=t},expression:"editItem.storeName"}})],1),s("el-form-item",{attrs:{label:"所属片区"}},[s("el-select",{attrs:{placeholder:"请选择所属片区"},model:{value:e.editItem.vendorAreaId,callback:function(t){e.editItem.vendorAreaId=t},expression:"editItem.vendorAreaId"}},e._l(e.zoneList,function(e,t){return s("el-option",{key:t,staticClass:"s2",attrs:{label:e.areaName,value:e.id}})}))],1),s("div",{staticClass:"border-line"}),s("el-form-item",{attrs:{label:"门店电话"}},[s("el-input",{attrs:{type:"text"},model:{value:e.editItem.storePhone,callback:function(t){e.editItem.storePhone=t},expression:"editItem.storePhone"}})],1),s("el-form-item",{attrs:{label:"门店编号"}},[s("el-input",{attrs:{type:"text"},model:{value:e.editItem.storeNumber,callback:function(t){e.editItem.storeNumber=t},expression:"editItem.storeNumber"}})],1),s("el-form-item",{staticClass:"edit-address",attrs:{label:"门店地址"}},[s("v-distpicker",{attrs:{province:e.editItem.province,city:e.editItem.city,area:e.editItem.district},on:{province:e.province1,city:e.city1,area:e.area1}})],1),s("el-form-item",{staticClass:"map-address",attrs:{label:"详细地址"}},[s("el-input",{attrs:{type:"textarea",placeholder:"可从地图上获取"},model:{value:e.editItem.storeAddress,callback:function(t){e.editItem.storeAddress=t},expression:"editItem.storeAddress"}}),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isMapShow,expression:"isMapShow"}],staticClass:"map"},[s("div",{attrs:{id:"map-ctn"}})])],1),s("el-form-item",{staticClass:"edit-map",attrs:{label:"门店坐标"}},[s("el-input",{attrs:{type:"text",placeholder:"坐标，从地图选择自动填充"},model:{value:e.editItem.position,callback:function(t){e.editItem.position=t},expression:"editItem.position"}}),s("el-button",{staticClass:"right-btn",staticStyle:{padding:"10px 6px"},attrs:{type:"primary"},on:{click:e.openMap}},[e._v("从地图上获取")])],1),s("el-form-item",{staticClass:"business-time",attrs:{label:"营业时间"}},[s("el-time-select",{staticClass:"time",attrs:{placeholder:"开始时间","picker-options":{start:"05:30",step:"00:15",end:"22:30"}},model:{value:e.editItem.openTime,callback:function(t){e.editItem.openTime=t},expression:"editItem.openTime"}}),s("el-time-select",{staticClass:"time",attrs:{placeholder:"结束时间","picker-options":{start:"05:30",step:"00:15",end:"22:30"}},model:{value:e.editItem.closeTime,callback:function(t){e.editItem.closeTime=t},expression:"editItem.closeTime"}})],1),s("el-form-item",{attrs:{label:"门店简介"}},[s("el-input",{attrs:{type:"textarea",value:e.editItem.storeInformation},model:{value:e.editItem.storeInformation,callback:function(t){e.editItem.storeInformation=t},expression:"editItem.storeInformation"}})],1),s("div",{staticClass:"border-line"}),s("el-button",{staticClass:"left",attrs:{type:"primary"},on:{click:e.editOk}},[e._v("完成")]),s("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isLot,expression:"isLot"}],staticClass:"edit-ctn"},[s("div",{staticClass:"page-title"},[e._v("批量增加门店")]),s("div",{staticClass:"form-ctn"},[s("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"application/vnd.ms-excel",drag:"drag",action:e.upImgUrl,name:"upfile","file-list":e.fileList,"list-type":"picture","with-credentials":e.isWithCookie,multiple:e.isMultiple,data:e.upImgData,"on-success":e.upImgSuccess}},[s("i",{staticClass:"el-icon-upload"}),s("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),s("em",[e._v("点击上传")])]),s("div",{staticClass:"el-upload__tip",slot:"tip"},[e._v("只能上传excel文件，且不超过500kb")])]),s("el-button",{staticClass:"left",attrs:{type:"primary"},on:{click:e.addMore}},[e._v("完成")]),s("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)])])])},staticRenderFns:[]}}});