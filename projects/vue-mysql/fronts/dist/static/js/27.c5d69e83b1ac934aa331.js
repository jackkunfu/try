webpackJsonp([27],{456:function(e,t,a){a(572);var s=a(165)(a(509),a(613),"data-v-36ea4377",null);e.exports=s.exports},509:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(76),r=a.n(s),i=a(75),l=a.n(i);t.default={name:"role",mixins:[mixTable],data:function(){return{isLot:!1,curOperate:"添加",keys:[{key:"areaName",str:"片区名称"},{key:"vendorName",str:"供应商"},{key:"createdTime",str:"添加时间"}],operates:[{f:"edit",str:"编辑"}],selfApi:{list:{type:"get",url:"/zone/index"},add:{type:"post",url:"/zone/addDo"},edit:{type:"post",url:"/zone/editDo"},del:{type:"post",url:"/delRole"}},searchKeys:["areaName","storeName"],editKeys:[],editName:""}},mounted:function(){},methods:{testRule:function(){return this.editItem.areaName&&""!=this.editItem.areaName.trim()?this.editItem.areaName.trim()!=this.editName||(this.isInput=!1,!1):(this.$message({type:"error",message:"名称不能为空~"}),!1)},selfEdit:function(e){this.editName=e.row.areaName},editOk2:function(e){var t=this;return l()(r.a.mark(function a(){var s,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.editItem.areaName&&""!=t.editItem.areaName.trim()){a.next=3;break}return t.$message({type:"error",message:"名称不能为空"}),a.abrupt("return",!1);case 3:if(t.editItem.areaName.trim()!=t.editName){a.next=8;break}t.editItem.model=t.editItem.id,e(t.editItem),a.next=13;break;case 8:return s=t.curEditing.id?"edit":"add",a.next=11,tryAwait(t.selfApi[s].type,t.selfApi[s].url,t.editItem);case 11:i=a.sent,i.success?(t.curEditing.id&&(i.model=t.curEditing.id),e(i)):t.$message({type:"error",message:i.msgInfo});case 13:case"end":return a.stop()}},a,t)}))()},goToStore:function(e){if(isNaN(e.model))alert("没返回获取到id");else{var t=localStorage.storePageId;this.$router.push({path:"/sa-store",query:{op:"add",areaId:e.model,id:t}})}}}}},533:function(e,t,a){t=e.exports=a(425)(!1),t.push([e.i,"",""])},572:function(e,t,a){var s=a(533);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(426)("386873dc",s,!0)},613:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"table-main no-nav"},[e.isInput?e._e():a("div",{staticClass:"table-ctn"},[a("div",{staticClass:"page-title"},[e._v("片区配置")]),a("div",{staticClass:"search-ctn"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchMsg}},[a("el-form-item",{attrs:{label:"片区名称查询"}},[a("el-input",{attrs:{placeholder:"输入片区关键字，请勿带符号"},model:{value:e.searchMsg.areaName,callback:function(t){e.searchMsg.areaName=t},expression:"searchMsg.areaName"}})],1),a("el-form-item",{staticStyle:{"margin-left":"80px"},attrs:{label:"下属门店查询"}},[a("el-input",{attrs:{placeholder:"输入门店关键字，请勿带符号"},model:{value:e.searchMsg.storeName,callback:function(t){e.searchMsg.storeName=t},expression:"searchMsg.storeName"}})],1)],1),a("el-button",{ref:"search",attrs:{type:"primary",icon:"search"},on:{click:e.searchList}},[e._v("按条件查询")]),a("a",{staticClass:"reset-form",on:{click:e.clearSearch}},[e._v(" 清空筛选条件")]),a("el-button",{ref:"add",attrs:{type:"success"},on:{click:e.add}},[e._v("添加片区")])],1),a("mtable",{attrs:{keys:e.keys,tableData:e.tableData,ops:e.operates,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{pageChange:e.pageChange,edit:e.edit}})],1),e.isInput?a("div",{staticClass:"edit-ctn"},[a("div",{staticClass:"page-title"},[e._v(e._s(e.curOperate)+"片区")]),a("div",{staticClass:"form-ctn"},[a("el-form",{attrs:{model:e.editItem,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"片区名称"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"20个以内的汉字和数字组合"},model:{value:e.editItem.areaName,callback:function(t){e.editItem.areaName=t},expression:"editItem.areaName"}})],1),a("el-button",{staticClass:"left",attrs:{type:"primary"},on:{click:e.editOk}},[e._v("完成")]),a("el-button",{staticClass:"left",attrs:{type:"success"},on:{click:function(t){e.editOk2(e.goToStore)}}},[e._v("完成，去添加对应门店")]),a("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)],1)]):e._e()])])},staticRenderFns:[]}}});