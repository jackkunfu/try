// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Config from './config'
import $ from 'jquery'

Vue.config.productionTip = false;

Vue.prototype._$ = $;
Vue.prototype.$ajax = function(type, url, options, cb) {
    $.ajax({
        type: type,
        url: Config.apiBasicUrl + url,
        data: options
    }).done(function(res) {
        alert(res.message);
        res.success && cb(res);
    }).fail(function(e) {
        console.log('ajax ' + url + '失败，如下：');
        console.log(e)
    })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})