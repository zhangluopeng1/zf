// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './vuex/store';

Vue.config.productionTip = false;
Vue.prototype.imgURL =
  window.location.host.indexOf('localhost') === -1
    ? 'https:' == document.location.protocol
      ? 'https://' + window.location.host + '/'
      : 'http://' + window.location.host + '/'
    : 'https://supplychain.yunqi-cn.com/';
Vue.prototype.$axios = axios;
Vue.prototype.baseURL =
  window.location.host.indexOf('localhost') === -1
    ? 'https:' == document.location.protocol
      ? 'https://' + window.location.host + '/api/manage'
      : 'http://' + window.location.host + '/api/manage'
    : '/api/manage';
//自定义的弹窗组件
import emComponent from './components/popup/index.js';
Vue.use(emComponent);
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
// // 自定义提示组件
// import Tips from './components/Tips/index.js';
// Vue.use(Tips);
// //自定义loading组件
// import VueLoading from './components/loading/index.js';
// Vue.use(VueLoading);
//轮播图组件
// import wcSwiper from 'wc-swiper';
// import 'wc-swiper/style.css';
// Vue.use(wcSwiper);
// import './assets/js/iscroll';
import '../static/js/flexible';
import '../static/css/iconfont.css';

// 有token携带token
axios.interceptors.request.use(
  function(config) {
    // ajax请求前拦截处理
    let token = Vue.prototype.getData('user');
    if (typeof token !== 'string' && token) {
      config.headers.Authorization = 'Bearer' + ' ' + token.token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 接口返回错误提示
axios.interceptors.response.use(
  function(response) {
    if (response.data.isError) {
      Mint.Toast({
        message: response.data.msg,
        position: 'center',
        duration: 3000
      });
    }
    return response;
  },
  function(err) {
    if (err.response.status === 401) {
      console.log(23323233);
      Mint.Indicator.close();
      Mint.Toast({
        message: '请先登陆',
        position: 'center',
        duration: 3000
      });
      setTimeout(function() {
        localStorage.clear('user');
        router.push({ name: 'Login' });
      }, 2500);
    }
    if (err.response.status === 500) {
      Mint.Indicator.close();
      Mint.Toast({
        message: err.response.data.msg,
        position: 'center',
        duration: 3000
      });
    }
    if (err.response.data.msg === '身份验证失败') {
      setTimeout(function() {
        localStorage.clear('user');
        router.push({ name: 'Login' });
      }, 1000);
    }
    if (err.response.data.msg === '请先完善信息') {
      setTimeout(function() {
        router.push({ name: 'StoreInfo' });
      }, 1000);
    }
    return Promise.reject(err.response.data);
  }
);
axios.defaults.baseURL = Vue.prototype.baseURL;
//判断浏览器函数
Vue.prototype.getPlatform = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  let regZFB = /alipay/gi,
    regWX = /MicroMessenger/gi;
  if (Vue.prototype.getData('platform')) {
    return Vue.prototype.getData('platform');
  }
  if (regZFB.test(ua)) {
    Vue.prototype.setData('platform', 'zhifubao');
    return 'zhifubao';
  }
  if (regWX.test(ua)) {
    Vue.prototype.setData('platform', 'weixin');
    return 'weixin';
  }
  Vue.prototype.setData('platform', 'browser');
  return 'browser';
};
// localStorage存储数据
Vue.prototype.getData = function(name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (err) {
    return localStorage.getItem(name);
  }
};
Vue.prototype.setData = function(name, value) {
  if (name) {
    if (typeof value === 'string') {
      localStorage.setItem(name, value);
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
  }
};
// Session存储数据
Vue.prototype.getSession = function(name) {
  try {
    return JSON.parse(sessionStorage.getItem(name));
  } catch (err) {
    return sessionStorage.getItem(name);
  }
};
Vue.prototype.setSession = function(name, value) {
  // sessionStorage
  if (name) {
    if (typeof value === 'string') {
      sessionStorage.setItem(name, value);
    } else {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
  }
};
Vue.prototype.isLogin = function() {
  return Vue.prototype.getData('user');
};
Vue.prototype.getShopCart = function() {
  return axios
    .get(
      `/v1/shoppingCart/get?companyGuid=${Vue.prototype.getSession(
        'supplierGuid'
      )}`
    )
    .then(res => {
      let data = 0;
      res.data.data.forEach(element => {
        data = data + element.commodityCount;
      });
      store.state.list = data;
      return res.data.data;
    });
};
Vue.filter('orderType', function(value) {
  if (value === 0) return '待付款';
  if (value === 1) return '待确认';
  if (value === 2) return '待发货';
  if (value === 3) return '待收货';
  if (value === 4) return '已完成';
  if (value === 5) return '已取消(未付款)';
  if (value === 6) return '已取消(已退款)';
  if (value === 7) return '已拒单';
  if (value === 11) return '退款申请中';
  if (value === 12) return '供应商拒绝退款';
  if (value === 13) return '已同意退款,待门店退货';
  if (value === 14) return '门店已退货,待退款';
});
Vue.filter('orderStatus', function(value) {
  if (value === 0) return '请尽快付款，超时未支付订单将自动关闭';
  if (value === 1) return '供应商会尽快确认订单，请耐心等待';
  if (value === 2) return '供应商已接单，即将给您发货';
  if (value === 3) return '供应商已发货，收到货后请尽快确认收货';
  if (value === 4) return '已确认收货，订单完成';
  if (value === 5) return '门店自主取消订单，订单取消';
  if (value === 6) return '供应商已退款，款项将于7个工作日内退回到您的账户，';
  if (value === 7) return '商家已拒单，款项将于7个工作日内打回您的原账户';
  if (value === 11) return '退款申请中';
  if (value === 12) return '供应商拒绝退款';
  if (value === 13) return '供应商已同意退款，请门店尽快寄货';
  if (value === 14) return '供应商收货后即将给门店退款';
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
