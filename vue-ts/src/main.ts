import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import proto from './js/proto'
Vue.use(proto)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
