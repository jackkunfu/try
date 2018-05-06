// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import proto from './js/base'
import filter from './js/filter'
Vue.use(proto);
Vue.use(filter);

Vue.config.productionTip = false

window.srPath = 'http://47.52.152.120:8080'

window.onhashchange = function(){
  
  $('#messageTip').remove();
}

window.addEventListener("popstate", function(e) {
  $('#tip').remove();
  $('#messageTip').remove();
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
