webpackJsonp([26],{458:function(e,t,a){a(594);var s=a(165)(a(511),a(635),"data-v-87c6bc44",null);e.exports=s.exports},511:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(76),r=a.n(s),i=a(75),l=a.n(i);t.default={name:"role",mixins:[mixTable],data:function(){return{isLot:!1,keys:[{key:"areaName",str:"区域名称"},{key:"vendorName",str:"供应商"},{key:"childArea",str:"下属片区"},{key:"createdTime",str:"添加时间"}],operates:[{f:"edit",str:"编辑"},{f:"del",str:"删除"}],selfApi:{list:{type:"get",url:"/area/index"},add:{type:"post",url:"/area/addDo"},edit:{type:"post",url:"/area/editDo"},del:{type:"post",url:"/area/delete"}},searchKeys:["areaName","childAreaName"],editKeys:["areaName","childArea"],transferData:[],chooseTransfer:[]}},mounted:function(){var e=this;return l()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$nextTick(function(){}),t.next=3,tryAwait("get","/area/zone",{});case 3:a=t.sent,s=[],a&&a.model&&(s=a.model),e.transferData=s.map(function(e){return{key:e.id,label:e.areaName,id:e.id}});case 7:case"end":return t.stop()}},t,e)}))()},methods:{testRule:function(){return!0},selfEdit:function(){var e=this,t=this.transferData.filter(function(t){return e.editItem.childArea.indexOf(t.label)>-1});this.chooseTransfer=t.map(function(e){return e.id})},selfEditCancel:function(){this.chooseTransfer=[]}},watch:{chooseTransfer:function(e){this.editItem.childArea=e.join(",")}}}},555:function(e,t,a){t=e.exports=a(424)(!1),t.push([e.i,"",""])},594:function(e,t,a){var s=a(555);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(425)("a1753640",s,!0)},635:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"table-main no-nav"},[e.isInput?e._e():a("div",{staticClass:"table-ctn"},[a("div",{staticClass:"page-title"},[e._v("区域配置")]),a("div",{staticClass:"search-ctn"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchMsg}},[a("el-form-item",{attrs:{label:"区域名称"}},[a("el-input",{attrs:{placeholder:"输入区域名称，请勿带符号"},model:{value:e.searchMsg.areaName,callback:function(t){e.searchMsg.areaName=t},expression:"searchMsg.areaName"}})],1),a("el-form-item",{staticStyle:{"margin-left":"80px"},attrs:{label:"下属片区"}},[a("el-input",{attrs:{placeholder:"输入片区关键字，请勿带符号"},model:{value:e.searchMsg.childAreaName,callback:function(t){e.searchMsg.childAreaName=t},expression:"searchMsg.childAreaName"}})],1)],1),a("el-button",{ref:"search",attrs:{type:"primary",icon:"search"},on:{click:e.searchList}},[e._v("按条件查询")]),a("a",{staticClass:"reset-form",on:{click:e.clearSearch}},[e._v(" 清空筛选条件")]),a("el-button",{ref:"add",attrs:{type:"success"},on:{click:e.add}},[e._v("添加区域")])],1),a("mtable",{ref:"table",attrs:{keys:e.keys,tableData:e.tableData,ops:e.operates,selfApi:e.selfApi,totalPage:e.totalPage,currentPage:e.currentPage,tabOp:e.tabOp},on:{pageChange:e.pageChange,edit:e.edit,del:e.del}})],1),e.isInput&&!e.isLot?a("div",{staticClass:"edit-ctn"},[a("div",{staticClass:"page-title"},[e._v(e._s(e.curOperate)+"区域")]),a("div",{staticClass:"form-ctn"},[a("el-form",{attrs:{model:e.editItem,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"区域名称"}},[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"20个以内的汉字和数字组合"},model:{value:e.editItem.areaName,callback:function(t){e.editItem.areaName=t},expression:"editItem.areaName"}})],1),a("el-form-item",{staticClass:"transfer-item",attrs:{label:"下属片区"}},[a("el-transfer",{attrs:{data:e.transferData,titles:["全部片区","已选片区"]},model:{value:e.chooseTransfer,callback:function(t){e.chooseTransfer=t},expression:"chooseTransfer"}})],1),a("el-button",{staticClass:"left",attrs:{type:"primary"},on:{click:e.editOk}},[e._v("完成")]),a("div",{staticClass:"goBack",on:{click:e.goBack}},[e._v("返回")])],1)],1)]):e._e(),e.isLot?a("div",{staticClass:"edit-ctn"},[a("div",{staticClass:"page-title"},[e._v("批量增加店员")]),a("div",{staticClass:"form-ctn"},[a("el-upload",{staticClass:"upload-demo",attrs:{drag:"drag",action:"https://jsonplaceholder.typicode.com/posts/",multiple:"multiple"}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])])]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.isEdit=!1,e.isInput=!0,e.isLot=!1}}},[e._v("完成")])],1)]):e._e()])])},staticRenderFns:[]}}});