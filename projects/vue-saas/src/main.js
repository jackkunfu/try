// import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/";
import ElementUI from "element-ui";
import filter from "./basic/filter";
import proto from "./basic/proto";
Vue.use(ElementUI);
Vue.use(filter);    // 全局filters
Vue.use(proto);     // 全局vue.prototype

// IE9  No transport 异常处理，设置跨域
jQuery.support.cors = true;

import vDistpicker from 'v-distpicker'
Vue.component('v-distpicker', vDistpicker)

// webpack2 vue 异步引用组件
Vue.component('mtable', () => import('@/page/public/table.vue'))

import mixTable from './basic/mixins/mixin.js';
window.mixTable = mixTable;

/**
 * https://cn.vuejs.org/v2/api/#silent
 * @type {boolean} 设置为 false 以阻止 vue 在启动时生成生产提示。
 */
Vue.config.productionTip = false;

var vm = new Vue({
    el: '#app',
    router,
    store,
    // template: '<App/>',
    // components: { App }
    render(h){
        return h(App)
    }
});

import config from './basic/config.js'
Vue.prototype.ajax = config.makeAjax(vm);
// 封装try catch 捕获async await 异常
(function() {
    window.tryAwait = async function() {
        var data;
        try {
            data = await config.makeAjax(vm).apply(null, arguments)
        } catch (e) {
            console.log(e)
        }
        return data;
    }
})()
