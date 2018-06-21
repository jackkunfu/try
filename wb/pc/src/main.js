// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'

import proto from './basic/proto'    //  表格操作每一行需要传递每一行的scope数据
import zwProto from './basic/zwmanage/proto'    //  表格操作每一行需要传递每一行的scope数据
import filter from './basic/filter'
import comps from './basic/components'

Vue.use(ElementUi)
Vue.use(zwProto)
Vue.use(proto)
Vue.use(filter)
Vue.use(comps)

// tableManage.js挂在window上减少组件内引用
import tableManage from './basic/mixs/table';
window.tableManage = tableManage;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
