import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: () => import('./views/Home.vue'),
        appLeft: () => import('./components/Nav.vue')
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
  ],
});
