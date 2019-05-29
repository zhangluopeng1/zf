<template>
  <div v-if="show">
    <transition name="msgbox">
      <div class="msgbox-container" :class="className" :style="`top:${positionTop}%;left:${positionLeft}%;`">
        <div style="text-align: center">{{ content }}</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      title: '',
      content: '',
      confirm: '确定',
      cancel: '',
      className: '',
      positionTop: '',
      positionLeft: ''
    };
  },
  watch: {
    show(val) {
      if (val) {
        if (!this.hasClass(document.body, 'pop-mask')) {
          this.addClass(document.body, 'pop-mask');
        }
      } else {
        this.removeClass(document.body, 'pop-mask');
      }
    }
  },
  beforeMount() {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.msgbox-container');
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  },
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
.zhezhao {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
.msgbox-container {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.3rem 0.5rem;
  max-width: 60%;
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%) scale(1, 1);
  .content-body {
    font-size: 0.5rem;
    margin: 0.5rem;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: black;
    height: 3rem;
    div {
      line-height: 3rem;
      text-align: center;
      padding: 0 0.2rem;
      word-break: break-all;
    }
  }
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