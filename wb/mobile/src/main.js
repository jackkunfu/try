// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/zwgzh'   // 郑武公众号
// import router from './router/jxjk'   // 嘉兴健康

import './assets/base.sass'
import proto from './js/proto'    //  表格操作每一行需要传递每一行的scope数据
import filter from './js/filter'
import comps from './js/components'

import './js/datePicker.js'

Vue.use(proto)
Vue.use(filter)
Vue.use(comps)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
