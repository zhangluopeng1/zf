<template>
  <div class="zhezhao">
    <transition name="msgbox">
      <div class="msgbox_bottom" :class="className">
        <div class="content-body">
          <div>{{ content }}</div>
        </div>
        <footer class="">
          <a href="javascript:;" class="buttons" style=" float: right;">{{confirm}}</a>
        </footer>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      type: 'center',
      title: '',
      content: '111',
      confirm: '取消',
      cancel: '',
      className: '',
      text: ''
    };
  },
  props: {
    text: {
      type: Array,
      default: []
    }
  },
  beforeMount() {},
  methods: {
    successBtn() {
      this.show = false;
    },
    cancelBtn() {
      this.show = false;
    },
    addClass(obj, cls) {
      var obj_class = obj.className,
        blank = obj_class != '' ? ' ' : '';
      var added = obj_class + blank + cls;
      obj.className = added;
    },
    removeClass(obj, cls) {
      var obj_class = ' ' + obj.className + ' ';
      obj_class = obj_class.replace(/(\s+)/gi, ' ');
      var removed = obj_class.replace(' ' + cls + ' ', ' ');
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed; //替换原来的 class.
    },
    hasClass(obj, cls) {
      var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  margin: 0;
  padding: 0.1rem 0;
  text-align: center;
  color: #333;
  height: 0.5rem;
  line-height: 0.8rem;
  font-size: 0.5rem;
  border-radius: 0.8rem 0.8rem 0 0;
  background: #fff;
  border-width: 0;
  border-bottom: 1px solid #ccc;
}
.content-body {
  font-size: 0.5rem;
  margin: 0.5rem;
  line-height: 2;
  max-height: 20rem;
  overflow-y: auto;
  color: black;
  div {
    line-height: 3rem;
    text-align: center;
    padding: 0 0.2rem;
    word-break: break-all;
  }
}
footer {
  width: 80%;
  padding: 0 0.5rem 0.5rem 0.5rem;
  margin: 0 auto;
  text-align: center;
  display: block !important;
  border-width: 0;
  overflow: hidden;
  background: transparent;
  border-radius: 0 0 0.8rem 0.8rem;
  .buttons {
    padding: 0.2rem 0;
    width: 40%;
    color: black;
    box-sizing: border-box;
    line-height: 0.5rem;
    font-size: 0.5rem;
    text-decoration: none;
  }
  .buttons:first-child:nth-last-child(1) {
    width: 100%;
  }
}
.msgbox_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  color: black;
}
.msgbox-enter,
.msgbox-leave-to {
  -webkit-transform: translate(-50%, -50%) scale(0, 0);
}
.msgbox-enter-active,
.msgbox-leave-active {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.msgbox-enter-to,
.msgbox-leave {
  -webkit-transform: translate(-50%, -50%) scale(1, 1);
}
</style>