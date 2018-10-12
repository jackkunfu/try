/*global Vue*/
import Router from 'vue-router'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: r => require(['@/pages/list'], r)
    }
  ]
})
