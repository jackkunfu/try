webpackJsonp([4],{432:function(e,t,a){a(596);var s=a(165)(a(486),a(637),"data-v-a59d0386",null);e.exports=s.exports},463:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"nav2",data:function(){return{navs:[{name:"nav111",lists:["用户管理","权限管理","角色管理"]},{name:"nav2 木有子集"},{lists:["用户管理","权限管理","角色管理"]}]}}}},464:function(e,t,a){t=e.exports=a(425)(!1),t.push([e.i,".nav2[data-v-558dadbe]{width:120px;background-image:linear-gradient(90deg,#e5e9f2,#e2e4eb);float:left;height:100%}.nav2 .nav-box[data-v-558dadbe]{border-bottom:1px solid #ccd5de;color:#475669;line-height:36px;font-size:12px;margin:0 18px}.nav2 .nav-box .title[data-v-558dadbe]{font-weight:700}.nav2 .nav-box ul[data-v-558dadbe]{margin:0 -18px}.nav2 .nav-box ul li[data-v-558dadbe]{padding-left:24px;cursor:pointer}.nav2 .nav-box ul li[data-v-558dadbe]:hover{background:#fff}",""])},465:function(e,t,a){var s=a(464);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(426)("0f211614",s,!0)},466:function(e,t,a){a(465);var s=a(165)(a(463),a(467),"data-v-558dadbe",null);e.exports=s.exports},467:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nav2"},e._l(e.navs,function(t){return a("div",{staticClass:"nav-box"},[t.name?a("div",{staticClass:"title"},[e._v(e._s(t.name))]):e._e(),t.lists?a("ul",e._l(t.lists,function(t){return a("li",[e._v(e._s(t))])})):e._e()])}))},staticRenderFns:[]}},469:function(e,t,a){"use strict";var s=a(166),i={data:function(){return{fileList:[],upImgSize:.5,upImgUrl:s.a.upImgUrl,upImgData:{biz:"vendor"},imageUrl:"",isWithCookie:!0,isMultiple:!1}},methods:{beforeUpload:function(){var e="image/jpeg"===file.type,t=file.size/1024/1024<this.upImgSize;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),t||this.$message.error("上传头像图片大小不能超过"+this.this.upImgSize+"MB!"),e&&t},handleChange:function(){},upImgSuccess:function(){}}};t.a=i},470:function(e,t,a){"use strict";var s=a(167),i=a.n(s),r=a(76),l=a.n(r),o=a(75),n=a.n(o),d={data:function(){return{curEditing1:{},editItem1:{},tableData1:[],totalPage1:null,currentPage1:1,isInput1:!1,curOperate1:"新增",searchMsg1:{}}},mounted:function(){var e=this;this.searchKeys1&&this.searchKeys1.map(function(t){e.$set(e.searchMsg1,t,"")}),this.editKeys1&&this.editKeys1.map(function(t){e.$set(e.editItem1,t,"")}),this.tableList1(1)},methods:{del1:function(e){var t=this;alert(e.row.id),this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(n()(l.a.mark(function a(){var s;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.request1("del",{id:e.row.id},!0);case 2:s=a.sent,s.success&&t.tableList1(t.currentPage),s.success&&t.$message({type:"success",message:"删除成功"});case 5:case"end":return a.stop()}},a,t)})))},freeze1:function(e,t){var a=this;alert("idKey"),alert(t),console.log(e.row),this.$confirm("确定冻结?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(n()(l.a.mark(function s(){var i,r;return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return i=t?e.row[t]:e.row.id,s.next=3,a.request1("freeze",{id:i});case 3:r=s.sent,r.success&&a.tableList1(a.currentPage),r.success&&a.$message({type:"success",message:"删除成功"});case 6:case"end":return s.stop()}},s,a)})))},add1:function(){this.isInput1=!0,void 0!=this.isAdd1&&(this.isAdd1=!1),void 0!=this.isLot1&&(this.isLot1=!1),this.curEditing1={},this.curOperate1="添加",this.editCancel1(),this.selfAdd1&&this.selfAdd1()},edit1:function(e){console.log("cur item"),console.log(e),this.curEditing1={index:e.$index,id:e.row.id},this.editItem1=$.extend(!0,{},e.row),this.curOperate1="编辑",this.isInput1=!0,void 0!=this.isAdd1&&(this.isAdd1=!1),void 0!=this.isLot1&&(this.isLot1=!1),this.selfEdit1&&this.selfEdit1(e)},editOk1:function(e){var t=this;return n()(l.a.mark(function a(){var s,i,r;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(alert("验证"),t.testRule1()){a.next=3;break}return a.abrupt("return");case 3:return alert("请求"),s=t.curEditing1.id?"edit":"add",a.next=7,t.request1(s,t.editItem,!0);case 7:if(i=a.sent,!i.success){a.next=19;break}if("[object MouseEvent]"===Object.prototype.toString.call(e)){a.next=12;break}return e(i),a.abrupt("return");case 12:t.isInput1=!1,t.isEdit1=!1,r="add"==s?1:t.currentPage,t.tableList1(r),t.editCancel1(),a.next=20;break;case 19:t.$message({type:"error",message:i.msgInfo});case 20:case"end":return a.stop()}},a,t)}))()},editCancel1:function(){var e=this;i()(this.editItem).map(function(t){e.editItem1[t]=""}),this.curEditing1={}},tableList1:function(e){var t=this;return n()(l.a.mark(function a(){var s,i,r,o;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.searchMsg1.page=e,a.next=3,t.request1("list",t.searchMsg,!0);case 3:if(s=a.sent,t.selfApi1.list.listkey){for(i=s,r=t.selfApi1.list.listkey.split("."),o=0,console.log("result"),console.log(i);o<r.length;)console.log(r[o]),i=i[r[o]],o++;console.log("result"),console.log(i),t.tableData1=i.model?t.changeTableData?t.changeTableData(i.model):i.model:[],t.totalPage1=i.count||0,t.currentPage1=s.page||0}else t.tableData1=s.model||[],t.totalPage1=s.count||0,t.currentPage1=s.currentPage||0;case 5:case"end":return a.stop()}},a,t)}))()},searchList1:function(){var e=this;return n()(l.a.mark(function t(){var a,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.changeSearchOption1&&e.changeSearchOption1(),e.searchMsg1.startTime&&(a=e.searchMsg1.startTime,s=new Date(a),e.searchMsg1.startTime=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate()),e.searchMsg1.endTime&&(a=e.searchMsg1.endTime,s=new Date(a),e.searchMsg1.endTime=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate()),e.currentPage1=1,e.tableList1(1);case 5:case"end":return t.stop()}},t,e)}))()},clearSearch1:function(){var e=this;i()(this.searchMsg1).map(function(t){e.searchMsg1[t]=""})},pageChange1:function(e){this.tableList1(e)},request1:function(e,t,a){var s=this;return n()(l.a.mark(function i(){var r;return l.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return"list"==e?(r=s.selfApi1[e].options||{},a&&t?$.extend(r,t):t&&(r=t)):r=t,i.next=3,tryAwait(s.selfApi1[e].type,s.selfApi1[e].url,r);case 3:return i.abrupt("return",i.sent);case 4:case"end":return i.stop()}},i,s)}))()}}};t.a=d},486:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(76),i=a.n(s),r=a(75),l=a.n(r),o=a(470),n=a(469),d=a(466),c=a.n(d);t.default={name:"role",mixins:[mixTable,o.a,n.a],components:{navCenter:c.a},data:function(){return{couponTypeList:[{name:"满减",value:"1"},{name:"直减",value:"2"},{name:"折扣",value:"3"},{name:"买送",value:"4"},{name:"原价-现价",value:"5"},{name:"满折",value:"6"},{name:"组合原价-现价",value:"7"},{name:"满购加钱换",value:"8"},{name:"满商品第几件打折",value:"9"},{name:"满送",value:"10"}],couponCatelogoList:[],areaList:[],fileListGood:[],fileListGoodDetail:[],fileListShare:[],videoList:[],activeTab:0,searchMsg1:{name:"",startTime:"",endTime:""},operates:[{f:"edit",str:"编辑"},{f:"onShelf",str:"上架"},{f:"offShelf",str:"下架"},{f:"preheat",str:"预热"}],keys:[{key:"serialNum",str:"序号"},{key:"appName",str:"渠道"},{key:"type",str:"优惠券类型"},{key:"title",str:"类型标题"},{key:"detail",str:"类型细则"},{key:"className",str:"对应分类"},{key:"products",str:"对应商品"},{key:"startTime",str:"开始时间"},{key:"endTime",str:"过期时间"},{key:"ruleStr",str:"详细规则"},{key:"useType",str:"优惠券分类"},{key:"statusKeys",str:"状态"}],keys1:[{key:"name",str:"所属专辑"},{key:"startTime",str:"详情名称"},{key:"startTime",str:"现价/原价"},{key:"startTime",str:"现期数/总期数"},{key:"startTime",str:"状态"},{key:"startTime",str:"编辑时间"}],operates1:[{f:"edit",str:"编辑"}],selfApi:{list:{type:"get",url:"/coupon/list"},edit:{type:"post",url:"/vendor/updateDo"},add:{type:"post",url:"/vendor/addDoAction"}},selfApi1:{list:{type:"get",url:"/vendor/searchList"},edit:{type:"post",url:"/vendor/updateDo"},add:{type:"post",url:"/vendor/addDoAction"}},searchKeys:["sortType","app","statu","startTime","endTime","isRecom","type"],searchKeys1:["name","startTime","endTime"],editKeys:["app","sortType","statu","startTime","endTime","type"],editKeys1:["name","vendorCode","address","logo"]}},mounted:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,tryAwait("get","/couponCategory/couponList");case 2:if(t.t0=t.sent.model,t.t0){t.next=5;break}t.t0=[];case 5:e.couponCatelogoList=t.t0;case 6:case"end":return t.stop()}},t,e)}))()},methods:{onShelf:function(e){e.row.id},offShelf:function(e){e.row.id},changeTableData:function(e){return e.map(function(e){var t="";return 1==e.status?t+="上架中 ":0==e.status?t+="下架中 ":-1==e.status&&(t+="已删除 "),t+=1==e.preheat?"预热券":"非预热劵",e.statusKeys=t,e.ruleStr=JSON.parse(e.rule).reduce(function(e,t){return e+=t.text+"\n"},""),e})},upImgSuccess:function(e){if(!e.success)return this.fileList=[],void this.$message({type:"error",message:e.msgInfo});var t=e.model[0];this.fileList=[{name:t.filename,url:t.url}],this.editItem.categoryIcon=t.url+t.filename},testRule:function(){return""==this.editItem.vendorName.trim()?(this.$message({type:"error",message:"填写名称~"}),!1):""==this.editItem.vendorCode.trim()?(this.$message({type:"error",message:"输入编码~"}),!1):this.editItem.province&&this.editItem.city&&this.editItem.zone?""==this.editItem.address.trim()?(this.$message({type:"error",message:"详细地址选择有误"}),!1):!(!this.editItem.logo||""==this.editItem.logo)||(this.$message({type:"error",message:"还没上传图片~"}),!1):(this.$message({type:"error",message:"地址选择有误"}),!1)}}}},557:function(e,t,a){t=e.exports=a(425)(!1),t.push([e.i,".tabs[data-v-a59d0386]{margin-bottom:24px;margin-top:-20px;border-bottom:1px solid #d3dce6}.tabs[data-v-a59d0386],.tabs li[data-v-a59d0386]:hover{background-color:#f9fafc}.tabs .is-active[data-v-a59d0386]{border-bottom:5px solid #20a0ff}.title[data-v-a59d0386]{font-size:14px;line-height:1.8;color:#20a0ff;border-bottom:1px solid #20a0ff;margin-bottom:10px}.el-radio-group.block .el-radio[data-v-a59d0386]{width:360px;display:block;height:36px;line-height:36px;margin-bottom:5px}.el-radio-group.block .el-radio .radio-input[data-v-a59d0386]{float:right;width:200px!important}.el-radio-group.block .el-radio .radio-input input[data-v-a59d0386]{width:100px!important}.el-radio-group.block .el-radio+.el-radio[data-v-a59d0386]{margin-left:0}.el-upload__tip[data-v-a59d0386]{margin-top:-35px;text-align:center}.edit-address .address select[data-v-a59d0386]{width:115px!important;height:36px!important;border-radius:5px!important;border:1px solid #8391a5!important}.avatar-uploader .el-upload[data-v-a59d0386]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-a59d0386]:hover{border-color:#20a0ff}.avatar-uploader-icon[data-v-a59d0386]{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.avatar[data-v-a59d0386]{width:178px;height:178px;display:block}",""])},596:function(e,t,a){var s=a(557);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(426)("7596bb0a",s,!0)},637:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"nav2-ctn"},[a("nav-center")],1),a("div",{staticClass:"table-main"},[e.isInput||e.isInput1?e._e():a("div",{staticClass:"table-ctn"},[a("div",{staticClass:"page-title"},[e._v("优惠券配置")]),a("el-menu",{staticClass:"tabs el-menu-demo",attrs:{theme:"","default-active":e.activeTab+"",mode:"horizontal"}},[a("el-menu-item",{attrs:{index:"0"},on:{click:function(t){e.activeTab=0}}},[e._v("总览")]),a("el-menu-item",{attrs:{index:"1"},on:{click:function(t){e.activeTab=1}}},[e._v("分享")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.activeTab,expression:"activeTab==0"}]},[a("div",{staticClass:"search-ctn"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchMsg}},[a("el-form-item",{attrs:{label:"序号"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.searchMsg.sortType,callback:function(t){e.searchMsg.sortType=t},expression:"searchMsg.sortType"}},[a("el-option",{attrs:{label:"从小到大",value:"ASC"}}),a("el-option",{attrs:{label:"从大到小",value:"DESC"}})],1)],1),a("el-form-item",{attrs:{label:"展现形式"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.searchMsg.APP,callback:function(t){e.searchMsg.APP=t},expression:"searchMsg.APP"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),a("el-option",{attrs:{label:"微信",value:"1"}}),a("el-option",{attrs:{label:"C端",value:"2"}})],1)],1),a("el-form-item",{attrs:{label:"优惠券类型"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.searchMsg.type,callback:function(t){e.searchMsg.type=t},expression:"searchMsg.type"}},e._l(e.couponTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})}))],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.searchMsg.statu,callback:function(t){e.searchMsg.statu=t},expression:"searchMsg.statu"}},[a("el-option",{attrs:{label:"上架",value:"1"}}),a("el-option",{attrs:{label:"下架",value:"0"}})],1)],1),a("el-form-item",{attrs:{label:"是否推荐系统"}},[a("el-radio-group",{model:{value:e.searchMsg.isRecom,callback:function(t){e.searchMsg.isRecom=t},expression:"searchMsg.isRecom"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),a("el-radio",{attrs:{label:"2"}},[e._v("否")])],1)],1),a("el-form-item",{staticClass:"search-time",attrs:{label:"活动有效期"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择开始日期"},model:{value:e.searchMsg.startTime,callback:function(t){e.searchMsg.startTime=t},expression:"searchMsg.startTime"}})],1),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择结束日期"},model:{value:e.searchMsg.endTime,callback:function(t){e.searchMsg.endTime=t},expression:"searchMsg.endTime"}})],1)],1)],1),a("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.searchList}},[e._v("按条件查询")]),a("a",{staticClass:"reset-form",on:{click:e.clearSearch}},[e._v(" 清空筛选条件")]),a("el-button",{attrs:{type:"success"},on:{click:e.add}},[e._v("添加优惠券")])],1),a("mtable",{attrs:{keys:e.keys,tableData:e.tableData,ops:e.operates,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{pageChange:e.pageChange,edit:e.edit,onShelf:e.onShelf,offShelf:e.offShelf}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.activeTab,expression:"activeTab==1"}]},[a("div",{staticClass:"search-ctn"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchMsg1}},[a("el-form-item",{attrs:{label:"详情标题"}},[a("el-input",{attrs:{placeholder:"详情标题"},model:{value:e.searchMsg1.name,callback:function(t){e.searchMsg1.name=t},expression:"searchMsg1.name"}})],1),a("el-form-item",{staticClass:"search-time",attrs:{label:"编辑时间"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择开始日期"},model:{value:e.searchMsg1.startTime,callback:function(t){e.searchMsg1.startTime=t},expression:"searchMsg1.startTime"}})],1),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择结束日期"},model:{value:e.searchMsg1.endTime,callback:function(t){e.searchMsg1.endTime=t},expression:"searchMsg1.endTime"}})],1)],1)],1),a("el-button",{ref:"search",attrs:{type:"primary",icon:"search"},on:{click:e.searchList1}},[e._v("按条件查询")]),a("a",{staticClass:"reset-form",on:{click:e.clearSearch1}},[e._v(" 清空筛选条件")]),a("el-button",{ref:"add",attrs:{type:"success"},on:{click:e.add1}},[e._v("添加详情")])],1),a("mtable",{attrs:{keys:e.keys1,tableData:e.tableData1,ops:e.operates1,selfApi:e.selfApi1,totalPage:e.totalPage1,currentPage:e.currentPage1},on:{edit:e.edit1,pageChange:e.pageChange1}})],1)],1),e.isInput?a("div",{staticClass:"edit-ctn"},[a("div",{staticClass:"page-title"},[e._v(e._s(e.curOperate)+"优惠券")]),a("div",{staticClass:"form-ctn"},[a("el-form",{staticStyle:{width:"450px"},attrs:{model:e.editItem,"label-width":"90px"}},[a("div",{staticClass:"title"},[e._v("步骤一")]),a("el-form-item",{attrs:{label:"所属区域"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editItem.areaId,callback:function(t){e.editItem.areaId=t},expression:"editItem.areaId"}},e._l(e.areaList,function(e,t){return a("el-option",{key:t,attrs:{label:e.areaName,value:e.id}})}))],1),a("div",{staticClass:"title"},[e._v("步骤二")]),a("el-form-item",{attrs:{label:"优惠券类型"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editItem.type,callback:function(t){e.editItem.type=t},expression:"editItem.type"}},e._l(e.couponTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})}))],1),a("el-form-item",{attrs:{label:"优惠券细则"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{attrs:{label:"商品分类"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{type:"text",placeholder:"30位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{attrs:{label:"详细条款"}},[a("el-input",{attrs:{type:"textarea",placeholder:"500位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{attrs:{label:"优惠券分类"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editItem.classId,callback:function(t){e.editItem.classId=t},expression:"editItem.classId"}},e._l(e.couponCatelogoList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})}))],1),a("el-form-item",{attrs:{label:"推荐系统"}},[a("el-radio-group",{model:{value:e.editItem.isValidStr,callback:function(t){e.editItem.isValidStr=t},expression:"editItem.isValidStr"}},[a("el-radio",{attrs:{label:"0"}},[e._v("图片")]),a("el-radio",{attrs:{label:"1"}},[e._v("URL")]),a("el-radio",{attrs:{label:"2"}},[e._v("视频")]),a("el-radio",{attrs:{label:"3"}},[e._v("图文")])],1)],1),a("el-form-item",{attrs:{label:"兑换方式"}},[a("el-radio-group",{staticClass:"block",model:{value:e.editItem.isValidStr,callback:function(t){e.editItem.isValidStr=t},expression:"editItem.isValidStr"}},[a("el-radio",{attrs:{label:"免费领取"}}),a("el-radio",{attrs:{label:"收费购买"}},[e._v("收费购买"),a("el-input",{staticClass:"radio-input",attrs:{type:"text",placeholder:"5位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-radio",{attrs:{label:"积分兑换"}},[e._v("积分兑换"),a("el-input",{staticClass:"radio-input",attrs:{type:"text",placeholder:"5位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-radio",{attrs:{label:"收费+积分"}},[e._v("收费+积分"),a("el-input",{staticClass:"radio-input",attrs:{type:"text",placeholder:"5位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}}),a("span",{staticStyle:{position:"absolute",right:"-10px",top:"0"}},[e._v("+")]),a("br"),a("el-input",{staticClass:"radio-input",attrs:{type:"text",placeholder:"5位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1)],1)],1),a("div",{staticClass:"title"},[e._v("步骤三")]),a("el-form-item",{attrs:{label:"序号"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.sortType,callback:function(t){e.editItem.sortType=t},expression:"editItem.sortType"}})],1),a("el-form-item",{attrs:{label:"展现形式"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editItem.app,callback:function(t){e.editItem.app=t},expression:"editItem.app"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),a("el-option",{attrs:{label:"微信",value:"1"}}),a("el-option",{attrs:{label:"C端",value:"2"}})],1)],1),a("el-form-item",{attrs:{label:"渠道"},model:{value:e.editItem.aaaa,callback:function(t){e.editItem.aaaa=t},expression:"editItem.aaaa"}},[a("el-radio",{attrs:{label:"一树药业"}}),a("el-radio",{attrs:{label:"退休好生活"}})],1),a("el-form-item",{attrs:{label:"限购次数"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{attrs:{label:"发券数量"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1),a("el-form-item",{staticClass:"search-time",attrs:{label:"活动期限"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择开始日期"},model:{value:e.searchMsg1.startTime,callback:function(t){e.searchMsg1.startTime=t},expression:"searchMsg1.startTime"}})],1),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择结束日期"},model:{value:e.searchMsg1.endTime,callback:function(t){e.searchMsg1.endTime=t},expression:"searchMsg1.endTime"}})],1)],1),a("el-form-item",{attrs:{label:"订单形式"}},[a("el-radio",{attrs:{label:"二维码"}}),a("el-radio",{attrs:{label:"订单号"}})],1),a("div",{staticClass:"title"},[e._v("步骤四")]),a("el-form-item",{attrs:{label:"商品图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",drag:"drag",action:e.upImgUrl,name:"upfile","file-list":e.fileListGood,"list-type":"picture","with-credentials":e.isWithCookie,multiple:e.isMultiple,data:e.upImgData,"on-success":e.upImgSuccess}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__tip",slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])])],1),a("el-form-item",{attrs:{label:"商品详情"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",drag:"drag",action:e.upImgUrl,name:"upfile","file-list":e.fileListGoodDetail,"list-type":"picture","with-credentials":e.isWithCookie,multiple:e.isMultiple,data:e.upImgData,"on-success":e.upImgSuccess}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__tip",slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])])],1),a("div",{staticClass:"title"},[e._v("步骤五")]),a("el-form-item",{attrs:{label:"分享标题"}},[a("el-form-item",{attrs:{label:"发券数量"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1)],1),a("el-form-item",{attrs:{label:"分享详情"}},[a("el-form-item",{attrs:{label:"发券数量"}},[a("el-input",{attrs:{type:"text",placeholder:"10位以内数字"},model:{value:e.editItem.vendorCode,callback:function(t){e.editItem.vendorCode=t},expression:"editItem.vendorCode"}})],1)],1),a("el-form-item",{attrs:{label:"分享图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",drag:"drag",action:e.upImgUrl,name:"upfile","file-list":e.fileListShare,"list-type":"picture","with-credentials":e.isWithCookie,multiple:e.isMultiple,data:e.upImgData,"on-success":e.upImgSuccess}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__tip",slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])])],1),a("el-button",{attrs:{type:"primary"},on:{click:e.editOk}},[e._v("完成")]),a("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)],1)]):e._e()])])},staticRenderFns:[]}}});