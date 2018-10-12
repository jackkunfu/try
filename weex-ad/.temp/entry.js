import Vue from 'vue'
import weex from 'weex-vue-render'
/*global Vue*/

weex.init(Vue)
/* weex initialized here, please do not move this line */
const router = require('./router');
const App = require('@/index.vue');

// const proto = require('@/js/proto.js');
import proto from '@/js/proto.js'
Vue.use(proto)

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App))

// router.push('/');

