<template>
  <div class="home_boss_pay" ref="viewBox">
    <mt-header title="确认点歌">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <ul>
      <li>
        <label>歌曲名称</label>
        <span class="name">最美的期待</span>
      </li>
      <li>
        <label>歌曲价格</label>
        <span class="price">￥1.00</span>
      </li>
      <li>
        <label>支付方式</label>
        <span v-if="getPlatform() !== 'weixin'">
          <i class="iconfont icon-Alipaypayment"></i>
          支付宝
          <span style="float:right">
            <i class="iconfont icon-zhengque" :class="check == 1? 'checked' : ''"></i>
          </span>
        </span>
        <span v-if="getPlatform() == 'weixin'"><i class="iconfont icon-weixinzhifu"></i>微信
          <span style="float:right">
            <i class="iconfont icon-zhengque" :class="check == 2? 'checked' : ''"></i>
          </span>
        </span>
      </li>
    </ul>
    <div class="pay">
      <button @click="goPay()">
      确认支付
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      check: 1
    };
  },
  created() {
    console.log(this.getPlatform());
    if (this.getPlatform() == 'weixin') {
      this.check = 2;
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    goPay() {
      function GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
      }
      if (this.getPlatform() == 'weixin') {
        // this.$axios.post('/v1/WeChatPay/isBingWeChat').then(res => {
        if (GetQueryString('code')) {
          let self = this;
          let returnUrl = `${
            'https:' == document.location.protocol
              ? 'https://' + window.location.host
              : 'http://' + window.location.host
          }/mobile/#/paydetail`;
          // alert('回调地址:' + returnUrl);
          this.$axios
            .post(`/v1/orders/order/pay`, {
              data: {
                amount: this.getSession('order_pay').amount,
                orderGuidArray: this.getSession('order_pay').orderGuidArray,
                platform: this.checked,
                returnUrl: returnUrl,
                code: GetQueryString('code')
              }
            })
            .then(res => {
              // 支付
              console.log(res);
              console.log(1);
              let formContent = res.data.data.weChatPayReturnData;

              if (!res.data.isError) {
                if (typeof WeixinJSBridge == 'undefined') {
                  if (document.addEventListener) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      onBridgeReady,
                      false
                    );
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent(
                      'onWeixinJSBridgeReady',
                      onBridgeReady
                    );
                  }
                } else {
                  onBridgeReady(formContent, res.data.data.orderGuids);
                }
              }
              function onBridgeReady(params, orderGuids) {
                console.log(params['appId']);
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',
                  {
                    appId: params['appId'], //公众号名称，由商户传入
                    timeStamp: params['timeStamp'], //时间戳，自1970年以来的秒数
                    nonceStr: params['nonceStr'], //随机串
                    package: params['package'],
                    signType: params['signType'], //微信签名方式：
                    paySign: params['paySign'] //微信签名
                    //                                  "total_fee": self.getOrderInfo.price
                  },
                  function(res) {
                    console.log(res);
                    // alert(orderGuids);
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                      // alert(orderGuids);

                      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                      self.$toast('支付成功');
                      setTimeout(function() {
                        self.$router.push('/paysuccess');
                      }, 500);
                    }
                  }
                );
              }
            })
            .catch(err => {});
        } else {
          this.thirdLogin('snsapi_userinfo');
        }
        // });
      } else {
        // 支付宝
        let returnUrl = `${
          'https:' == document.location.protocol
            ? 'https://' + window.location.host
            : 'http://' + window.location.host
        }/mobile/#/paydetail`;
        let self = this;
        this.$axios
          .post(`/v1/orders/order/pay`, {
            data: {
              amount: this.getSession('order_pay').amount,
              orderGuidArray: this.getSession('order_pay').orderGuidArray,
              platform: this.checked,
              returnUrl: returnUrl
            }
          })
          .then(res => {
            this.strData = res.data.data.aliPayReturnData;
            // createPayForm.call(this, strData);
            this.$nextTick(function() {
              console.log(document.forms['punchout_form']);
              document.forms['punchout_form'].submit();
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="scss">
@import './../assets/css/variable.scss';
.home_boss_pay {
  .mint-header {
    background: white;
  }
  .mint-header-title {
    color: #000;
  }
  .mintui-back {
    color: #000;
  }
  li {
    padding: 15px 10px;
    margin: 0 10px;
    font-size: 15px;
    border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.3);
    label {
      display: inline-block;
      width: 100px;
      font-size: 16px;
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
      font-size: 0.7rem;
      color: #3d95ff;
    }
    .icon-weixinzhifu {
      color: #66dd66;
    }
  }
  .pay {
    text-align: center;
    button {
      width: 80%;
      padding: 10px;
      background: #3d95ff;
      color: white;
      border: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  }
  .name {
    color: #999;
  }
  .checked {
    color: #3d95ff;
  }
}
</style>
