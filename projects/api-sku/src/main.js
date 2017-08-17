// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config.js'
import $ from 'jquery'

Vue.config.productionTip = false

Vue.prototype._$ = $;
Vue.prototype._fentchData = (type, url, options, cb) => {
    $.ajax({
        type: type,
        url: config.apiBasicUrl + url,
        dataType: 'json',
        crossDomain: true,
        data: options
    }).done((res) => {
        alert(res.msgInfo)
        res.success && cb(res);
    }).fail((e) => {
        console.log(e)
        alert(e.msgInfo)
    })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})