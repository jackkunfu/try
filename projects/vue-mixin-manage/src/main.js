import 'babel-polyfill'
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/";
import ElementUI from "element-ui";
// import "element-ui/lib/theme-default/index.css";
// import "./basic/area.min.js";

// 减少包体积，在index.html中script cdn引入
// import $ from 'jquery'
// window.$ = $;

// IE9  No transport 异常处理，设置跨域
jQuery.support.cors = true;

/**
 * https://cn.vuejs.org/v2/api/#silent
 * @type {boolean} 设置为 false 以阻止 vue 在启动时生成生产提示。
 */
Vue.config.productionTip = false;

/**
 * https://cn.vuejs.org/v2/api/#Vue-use
 * 安装 Vue.js 插件。
 */
Vue.use(ElementUI);

// 接口api方法
// import getData from './api/getData.js'
// Vue.prototype.api = getData;

/**
 * 在实例化 Vue 时，需要传入一个选项对象，
 * 它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
 * 全部的选项可以在 API 文档中查看。
 */
var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
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
