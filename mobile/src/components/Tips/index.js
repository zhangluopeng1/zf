import Vue from 'vue';
import msgBoxComponent from './Tips.vue';
import { setTimeout } from 'timers';

let Tips = (options = {}) => {
  let msgBoxConstructor = Vue.extend(msgBoxComponent);
  let instance = new msgBoxConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
  // 将单个 confirm instance 的配置合并到默认值中
  Object.assign(instance.$data, options);
  return new Promise((resolve, reject) => {
    instance.show = true;
    setTimeout(function() {
      instance.show = false;
    }, 2000);
  });
};

export default function(Vue) {
  // //添加全局API
  Vue.prototype.$Tips = Tips;
}
