import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store';

// routes
const Home = r => require.ensure([], () => r(require('@/views/home')), 'Home');
// routes
const Pay = r => require.ensure([], () => r(require('@/views/pay')), 'Pay');
// routes
const PaySuccess = r =>
  require.ensure([], () => r(require('@/views/paySuccess')), 'PaySuccess');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '支付'
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    meta: {
      title: '支付'
    }
  },
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: PaySuccess,
    meta: {
      title: '支付'
    }
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  window.removeEventListener('scroll', function() {});
  // let platform = Vue.prototype.getPlatform();
  console.log(router);
  // let metaData = to.meta;

  //判断微信 支付宝
  // if (platform === 'browser') {
  // store.commit('setPageHeader', true);
  // } else {
  // store.commit('setPageHeader', false);
  // }
  next();
});

router.afterEach(() => {
  // Vue.prototype.$loading.show();
});
export default router;
