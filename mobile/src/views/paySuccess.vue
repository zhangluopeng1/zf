<template>
  <div class="home_boss_success" ref="viewBox">
    <mt-header title="支付完成">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">
    <div><i class="iconfont icon-weixinzhifu"></i>微信支付成功</div>
    <div><i class="iconfont icon-Alipaypayment"></i>支付宝支付成功</div>
    <div class="price">￥1.00</div>    
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {};
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    //获取详细列表
    getdateil() {},
    //获取更多列表
    loadMore() {},
    //搜索
    search() {},
    a() {}
  },

  watch: {
    searchValue: function(newvs, oldvs) {
      console.log('newvs', newvs);
      console.log('oldvs', oldvs);
      if (!newvs) {
        this.getdateil();
      } else {
        this.search();
      }
    }
  }
};
</script>
<style lang="scss">
@import './../assets/css/variable.scss';
.home_boss_success {
  .mint-header {
    background: white;
  }
  .mint-header-title {
    color: #000;
  }
  .mintui-back {
    color: #000;
  }
  .content {
    div {
      text-align: center;
      padding: 10px;
      font-size: 0.5rem;
    }
  }
  .price {
    color: #ff6a68;
  }
  i {
    font-size: 0.6rem;
    vertical-align: middle;
    color: #ccc;
    margin-right: 5px;
  }
  .icon-weixinzhifu,
  .icon-Alipaypayment {
    position: relative;
    top: -0.05rem;
    font-size: 1rem;
    color: #3d95ff;
  }
  .icon-weixinzhifu {
    color: #66dd66;
    font-size: 0.8rem;
  }
}
</style>
