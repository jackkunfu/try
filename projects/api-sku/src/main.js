// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config.js'
import $ from 'jquery'

Vue.config.productionTip = false

Vue.prototype._$ = $;
var optionsBasic = {
    _sy: "P||1||1366*768||pc||4||localhost:8080"
}
Vue.prototype._fetchData = (type, url, options, cb) => {
    $.ajax({
        // headers: {
        //     Cookie: 'acToken=' + (localStorage.token ? localStorage.token : '') + ';'
        // },
        type: type,
        url: config.apiBasicUrl + url,
        dataType: 'json',
        crossDomain: true,
        data: $.extend(optionsBasic, options),
        xhrFields: {
            withCredentials: true
        }
    }).done((res, status, xhr) => {
        // console.log(status)
        // console.log(xhr)
        // console.log(xhr.getAllResponseHeaders());
        // console.log(xhr.getResponseHeader("Content-Type"));
        // 正确错误信息统一在这里做弹出处理，具体调用不用处理了
        alert(res.msgInfo)

        res.success && cb(res);
    }).fail((e) => {
        console.error(e);
    })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})