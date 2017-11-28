webpackJsonp([25],{459:function(e,t,r){r(571);var a=r(165)(r(512),r(612),"data-v-34245bfa",null);e.exports=a.exports},512:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(76),s=r.n(a),i=r(75),l=r.n(i);t.default={name:"role",mixins:[mixTable],data:function(){return{isInput:!1,zoneList:[],shopList:[],origin:{},keys:[{key:"realname",str:"名字"},{key:"mobile",str:"手机"},{key:"clerkNum",str:"员工编号"},{key:"vendorName",str:"供应商"},{key:"areaName",str:"所属片区"},{key:"storeName",str:"所属门店"},{key:"createdTime",str:"添加时间"}],operates:[{f:"edit",str:"编辑"},{f:"unbund",str:"解绑"}],selfApi:{list:{type:"get",url:"/smanager/index"},edit:{type:"post",url:"/smanager/editDo"},unbund:{type:"post",url:"/smanager/delete"}},searchKeys:["clerkName","clerkMobile"],editKeys:["realname","idCard","mobile","clerkNum","areaId","storeId"]}},mounted:function(){var e=this;return l()(s.a.mark(function t(){var r,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$route.query.op&&"add"==e.$route.query.op&&(e.$route.query.info&&(e.$route.query.info.clerk&&(e.editItem=e.$route.query.info.clerk),e.$route.query.info.store&&(e.editItem.areaId=e.$route.query.info.store.vendorAreaId,e.editItem.storeId=e.$route.query.info.store.id)),e.$route.query.info.clerk?e.curOperate="编辑":e.curOperate="新增",e.curEditing.id=e.$route.query.storeId,e.isInput=!0),t.next=3,tryAwait("get","/zone/index");case 3:return r=t.sent,r&&r.success&&(e.zoneList=r.model),t.next=7,tryAwait("get","/store/index");case 7:a=t.sent,a&&a.success&&(e.shopList=a.model);case 9:case"end":return t.stop()}},t,e)}))()},methods:{getShop:function(){var e=this.editItem.areaId;alert(e)},selfEdit:function(e){this.curEditing={index:e.$index,id:e.row.userId}},resetForm:function(e){this.$refs[e].resetFields()},unbund:function(e){var t=this;this.$confirm("确定解绑?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(l()(s.a.mark(function r(){var a,i;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.row.userId,r.next=3,tryAwait("post","/smanager/delete",{clerkId:a});case 3:i=r.sent,i.success&&t.tableList(t.currentPage);case 5:case"end":return r.stop()}},r,t)})))},testRule:function(){return this.editItem.realname&&""!=this.editItem.realname.trim()?this.editItem.idCard&&/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.editItem.idCard)?this.editItem.mobile&&/^1(3|4|5|7|8)\d{9}$/.test(this.editItem.mobile.trim())?this.editItem.clerkNum&&""!=this.editItem.clerkNum.trim()?this.editItem.areaId&&""!=this.editItem.areaId?!(!this.editItem.storeId||""==this.editItem.storeId)||(this.$message({type:"error",message:"没选片区"}),!1):(this.$message({type:"error",message:"没选片区"}),!1):(this.$message({type:"error",message:"编号没填"}),!1):(this.$message({type:"error",message:"手机号不正确"}),!1):(this.$message({type:"error",message:"身份证号不正确"}),!1):(this.$message({type:"error",message:"姓名不能为空"}),!1)}}}},532:function(e,t,r){t=e.exports=r(424)(!1),t.push([e.i,"",""])},571:function(e,t,r){var a=r(532);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(425)("78b37e2a",a,!0)},612:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{height:"100%"}},[r("div",{staticClass:"table-main no-nav"},[e.isInput?e._e():r("div",{staticClass:"table-ctn"},[r("div",{staticClass:"page-title"},[e._v("店长配置")]),r("div",{staticClass:"search-ctn"},[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0},model:{value:e.searchMsg,callback:function(t){e.searchMsg=t},expression:"searchMsg"}},[r("el-form-item",{attrs:{label:"店长姓名"}},[r("el-input",{attrs:{placeholder:"输入姓名关键字，请勿带符号"},model:{value:e.searchMsg.clerkName,callback:function(t){e.searchMsg.clerkName=t},expression:"searchMsg.clerkName"}})],1),r("el-form-item",{attrs:{label:"店长手机"}},[r("el-input",{attrs:{placeholder:"输入店长手机号"},model:{value:e.searchMsg.clerkMobile,callback:function(t){e.searchMsg.clerkMobile=t},expression:"searchMsg.clerkMobile"}})],1)],1),r("el-button",{ref:"search",attrs:{type:"primary",icon:"search"},on:{click:e.searchList}},[e._v("按条件查询")]),r("a",{staticClass:"reset-form",on:{click:e.clearSearch}},[e._v(" 清空筛选条件")])],1),r("mtable",{attrs:{keys:e.keys,tableData:e.tableData,ops:e.operates,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{edit:e.edit,pageChange:e.pageChange,unbund:e.unbund}})],1),e.isInput?r("div",{staticClass:"edit-ctn"},[r("div",{staticClass:"page-title"},[e._v(e._s(e.curOperate)+"店长")]),r("div",{staticClass:"form-ctn"},[r("el-form",{attrs:{model:e.editItem,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"店长姓名"}},[r("el-input",{attrs:{type:"text",placeholder:"最多8个汉字"},model:{value:e.editItem.realname,callback:function(t){e.editItem.realname=t},expression:"editItem.realname"}})],1),r("el-form-item",{attrs:{label:"身份证号"}},[r("el-input",{attrs:{type:"text",placeholder:"18位居民身份证号码"},model:{value:e.editItem.idCard,callback:function(t){e.editItem.idCard=t},expression:"editItem.idCard"}})],1),r("el-form-item",{attrs:{label:"手机号码"}},[r("el-input",{attrs:{type:"text",placeholder:"11位中国大陆手机号码"},model:{value:e.editItem.mobile,callback:function(t){e.editItem.mobile=t},expression:"editItem.mobile"}})],1),r("div",{staticClass:"border-line"}),r("el-form-item",{attrs:{label:"员工编号"}},[r("el-input",{attrs:{type:"text"},model:{value:e.editItem.clerkNum,callback:function(t){e.editItem.clerkNum=t},expression:"editItem.clerkNum"}})],1),r("el-form-item",{attrs:{label:"所属片区"}},[r("el-select",{attrs:{placeholder:"请选择所属片区",disabled:"disabled"},model:{value:e.editItem.areaId,callback:function(t){e.editItem.areaId=t},expression:"editItem.areaId"}},e._l(e.zoneList,function(e,t){return r("el-option",{key:t,attrs:{label:e.areaName,value:e.id}})}))],1),r("el-form-item",{attrs:{label:"所属门店"}},[r("el-select",{attrs:{placeholder:"请选择所属门店",disabled:"disabled"},model:{value:e.editItem.storeId,callback:function(t){e.editItem.storeId=t},expression:"editItem.storeId"}},e._l(e.shopList,function(e,t){return r("el-option",{key:t,attrs:{label:e.storeName,value:e.storeId}})}))],1),r("div",{staticClass:"border-line"}),r("el-button",{staticClass:"left",attrs:{type:"primary"},on:{click:e.editOk}},[e._v("完成")]),r("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)],1)]):e._e()])])},staticRenderFns:[]}}});