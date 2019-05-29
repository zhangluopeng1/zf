<template>
  <div id="app" class="hasHeader hasFooter">
    <div class="content" id="content">
      <!-- <transition name="router-fade" mode="out-in"> -->
        <router-view/>
      <!-- </transition>   -->
    </div>
  </div>
</template>

<script>
import appFooter from '@/components/Footer';
import appHeader from '@/components/Header';
export default {
  name: 'app',
  data() {
    return {
      footerOPtions: [
        {
          icon: 'icon-shouye',
          text: '首页',
          path: '/'
        },
        {
          icon: 'icon-quanbu',
          text: '全部商品',
          path: '/assort'
        },
        {
          icon: 'icon-gouwuche',
          text: '购物车',
          path: '/shopcart'
        },
        {
          icon: 'icon-wodeActive ',
          text: '我的',
          path: '/my'
        }
      ],
      num: 0
    };
  },
  components: {
    appFooter,
    appHeader
  },
  created() {
    this.changekey();
    this.timer = setInterval(this.changekey, 30000);
  },
  methods: {
    back() {
      console.log(this.$route);
      if (this.$route.name === 'MyOrder') {
        this.$router.push('/my');
      } else if (this.$route.name === 'Pay') {
        this.$router.push('/my/myorder');
      } else {
        this.$router.go(-1);
      }
    },
    goInfo() {
      if (this.getData('user')) {
        this.$router.push('/my/messagecenter');
      } else {
        this.$toast('请先登录');
      }
    },
    changekey() {
      let user = this.getData('user');
      if (user) {
        this.$axios.get('/v1/message/searchCount').then(res => {
          this.num = res.data.data.unRead;
        });
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    $route(to, from) {
      this.changekey();
    }
  }
};
</script>

<style lang="scss">
@import './assets/css/variable.scss';
@import './App.scss';
body::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
#app,
.content {
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // top: 0;
  // overflow: auto;

  background: white;
}
#app.hasFooter .content {
  // bottom: 54rem / $model;
}
#app {
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 99;
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}
.back {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 0.6rem;
}
.wc-pagination .wc-dot-active {
  background: #66cc66;
}
.car_icon {
  position: absolute;
  left: 0.4rem;
  top: 0;
  line-height: 1.5rem;
  z-index: 9999999;
  i {
    font-size: 1.4rem;
    color: #66cc66;
  }
}
.icon-car-count {
  min-width: 14px;
  text-align: center;
  line-height: 14px !important;
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0px;
  background: red;
  color: #fff;
  border-radius: 17px;
  padding: 6px;
  font-size: 16px;
  transform: scale(0.7);
  font-family: Tahoma !important;
}
.icon-xuankuang {
  color: #a4a4a4 !important;
}
.button {
  background: #66cc66;
  margin-top: 1rem;
  border: none;
  color: white;
  border-radius: 50px;
  width: 282rem / $model;
  height: 44rem / $model;
  line-height: 44rem / $model;
  font-size: 17rem / $model;
  box-shadow: #a4a4a4 1px 1px 1px;
}
.header_right {
  font-size: 0.4rem;
  i {
    font-size: 0.6rem;
    vertical-align: -5%;
  }
}
// 遮罩
.zhezhao {
  z-index: 999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.7);
}
//右上角得管理
.manage {
  position: fixed;
  top: 0.3rem;
  right: 0.45rem;
  z-index: 100;
  color: white;
  font-size: 0.4rem;
}
//翻转
.flipx {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
  /*IE*/
  filter: FlipH;
}
// 翻转
.flipy {
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /*IE*/
  filter: FlipV;
}
.centerboss {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex {
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
}
.xiaoxi_span {
  .icon-car-count {
    top: -0.1rem;
    right: -0.2rem;
    min-width: 0px;
    text-align: center;
    line-height: 2px !important;
  }
}
</style>
