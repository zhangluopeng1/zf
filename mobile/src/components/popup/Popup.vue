<template>
  <div class="zhezhao" v-if="show">
      <div class="msgbox-container" :class="className" v-if="type === 'center'">
        <header v-if="title">{{title}}</header>
        <div class="content_body">
          <div>{{ content }}</div>
        </div>
        <footer>
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="buttons" style=" float: left;">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="buttons" style=" float: right;">{{confirm}}</a>
        </footer>
      </div>
      <transition name="show">
          <div class="msgbox_bottom" :class="className" v-if="type === 'bottom'">
            <header v-if="title">{{title}}</header>
            <div class="content_body_buttom">
              <div v-for="(item,index) in items" :key="index" @click="item.fun">{{ item.content }}</div>
            </div>
            
            <footer class="footer">
              <a href="javascript:;" @click="successBtn" class="buttons" style=" float: right;">{{confirm}}</a>
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
      content: '',
      confirm: '确定',
      cancel: '',
      className: '',
      items: []
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
.msgbox-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  background: #fff;
  color: black;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%) scale(1, 1);
}
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
.content_body {
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
.content_body_buttom {
  font-size: 0.5rem;
  color: black;
  div {
    line-height: 1.5rem;
    text-align: center;
    padding: 0 0.2rem;
    word-break: break-all;
    border-bottom: 1px solid rgba(189, 189, 189, 0.2);
  }
}
.footer {
  border-top: 4px solid rgba(189, 189, 189, 0.2);
}
footer {
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  display: block !important;
  border-width: 0;
  overflow: hidden;
  background: transparent;
  border-radius: 0 0 0.8rem 0.8rem;
  .buttons {
    padding: 0.2rem 0;
    width: 50%;
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
.show-enter-active,
.show-leave-active {
  transition: all 0.5s;
}
.show-enter,
.show-leave-to {
  margin-bottom: -500px;
}
.show-enter-to,
.show-leave {
  margin-bottom: 0px;
}
</style>