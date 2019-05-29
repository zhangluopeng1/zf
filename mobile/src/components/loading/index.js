import Loading from './loading';

export default {
  /**
   * 每个插件都有的install方法，用于安装插件
   * @param {Object} Vue - Vue类
   * @param {Object} [pluginOptions] - 插件安装配置
   */
  install(Vue, pluginOptions = {}) {
    // 创建"子类"方便挂载
    const VueLoading = Vue.extend(Loading);
    let loading = null;
    function show(obj = undefined) {
      return new Promise(resolve => {
        if (!loading) {
          let ele = document.querySelector('body');
          if (obj) {
            ele = obj;
            obj.style.position = 'relative';
          }
          loading = new VueLoading();
          loading.father = obj;
          loading.$mount();
          loading.show(obj);
          ele.appendChild(loading.$el);
          resolve();
        }
      });
    }
    function hide() {
      if (loading) {
        loading.hide();
        loading = null;
      }
    }
    let $load = {
      show(obj) {
        show(obj);
      },
      hide() {
        hide();
      }
    };
    Object.assign($load, loading);
    Vue.prototype.$loading = $load; //这里把load组件挂载到　Vue原型链上
  }
};
