import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import History from '@/views/History';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      name: 'history',
      path: '/history/',
      component: History,
    },
    {
      name: 'history',
      path: '/history/added',
      component: History,
      props: { added: true, deepHistory: true },
    },
    {
      name: 'history',
      path: '/history/moved',
      component: History,
      props: { added: false, deepHistory: true },
    },
  ],
});
