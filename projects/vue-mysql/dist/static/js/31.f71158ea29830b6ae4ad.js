webpackJsonp([31],{442:function(e,t,r){r(588);var a=r(165)(r(496),r(629),"data-v-64f40da6",null);e.exports=a.exports},496:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"form-staff",mixins:[mixTable],data:function(){return{keys:[{key:"vendorName",str:"供应商名称"},{key:"createdTime",str:"添加时间"},{key:"province",str:"所在省"},{key:"city",str:"所在市"},{key:"zone",str:"所在区"},{key:"vendorAreaName",str:"所在片区"},{key:"storeName",str:"门店名称"},{key:"clerkerName",str:"店员姓名"},{key:"clerkerNo",str:"店员工号"},{key:"clerkerMobile",str:"店员手机"},{key:"clerkerIdCard",str:"店员身份证"}],selfApi:{list:{type:"get",url:"/Report/clerkAction",options:{vendorId:localStorage.pdSaasVendorId},listkey:"item"}}}},mounted:function(){},methods:{}}},549:function(e,t,r){t=e.exports=r(424)(!1),t.push([e.i,"",""])},588:function(e,t,r){var a=r(549);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(425)("5e97a9b6",a,!0)},629:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{height:"100%"}},[r("div",{staticClass:"table-main no-nav"},[r("div",{staticClass:"table-ctn"},[r("div",{staticClass:"page-title"},[e._v("店员管理报表")]),r("div",{staticClass:"search-ctn"},[r("el-button",{ref:"export",attrs:{type:"info"},on:{click:function(t){e.downForm("/report-clerker/export")}}},[e._v("导出报表")])],1),r("mtable",{attrs:{keys:e.keys,tableData:e.tableData,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{pageChange:e.pageChange}})],1)])])},staticRenderFns:[]}}});