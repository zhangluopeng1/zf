<template>
  <div class="home_boss_success" ref="viewBox">
    <div class="content">
    <div v-if="getPlatform() === 'weixin'"><i class="iconfont icon-weixinzhifu" ></i>微信支付成功</div>
    <div v-if="getPlatform() !== 'weixin'"><i class="iconfont icon-Alipaypayment"></i>支付宝支付成功</div>
    <div class="price">￥{{ list.price * list.count }}</div>    
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      list: {
        price: 0,
        count: 0
      }
    };
  },
  created() {
    this.list =  JSON.parse(localStorage.getItem("song"))
  },
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
  .mint-header-button {
    flex:0
  }
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
    margin-top: 1.2rem;
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
