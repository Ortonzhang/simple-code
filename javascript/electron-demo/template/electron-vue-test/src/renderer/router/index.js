import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/preview',
      name: 'preview',
      component: require('@/components/preview').default,
    },
    {
      path: '/',
      name: 'upload',
      component: require('@/components/upload').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
