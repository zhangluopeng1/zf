<template>
  <div class="home_boss_pay" ref="viewBox">
    <ul>
      <li>
        <label>产品名称</label>
        <span class="name">{{ list.filename }}</span>
      </li>
      <li>
        <label>产品单价</label>
        <span class="price">￥{{ list.price }}</span>
      </li>
      <li style="padding:0">
        <!-- <label>点播次数</label>
        <span class="price">￥{{ list.price }}</span> -->
        <mt-field label="点播次数" placeholder="请输入数字" type="number" v-model="list.count"></mt-field>
      </li>
      <li>
        <label>产品总价</label>
        <span class="price">￥{{ list.price * list.count }}</span>
      </li>
      <li v-if="getPlatform() !== 'weixin'">
        <label>支付方式</label>
        <span>
          <i class="iconfont icon-Alipaypayment"></i>
          支付宝
          <span style="float:right" @click="check = 1">
            <i class="iconfont icon-zhengque" :class="check == 1? 'checked' : ''"></i>
          </span>
        </span>
      </li>
      <li  v-if="getPlatform() === 'weixin'">
        <label>支付方式</label>
        <span><i class="iconfont icon-weixinzhifu"></i>微信
          <span style="float:right" @click="check = 2">
            <i class="iconfont icon-zhengque" :class="check == 2? 'checked' : ''"></i>
          </span>
        </span>
      </li>
    </ul>
    <p style="margin-top:30px">
      您即将支付{{ list.price * list.count }}元到贵州幻维科技有限公司
    </p>
    <p>
      用于点播产品 : {{ list.filename }}
    </p>
    <div class="pay">
      <button @click="goPay()">
      确认支付
      </button>
    </div>

  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  name: 'home',
  data() {
    return {
      check: 1,
      list:{
        count: 1,
        price: 1
      }
    };
  },
  created() {
      function GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
      }
    this.list =  JSON.parse(localStorage.getItem("song"))
    console.log(this.list)
    // if( !this.list.count ||  this.list.count == 0){
    //   this.$set(this.list,'count',1)
    //   // this.list.count = 1
    // }
    this.$set(this.list,'count',1)
    if (this.getPlatform() == 'weixin') {
      this.check = 2;
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    weixinpay (code) {
      let self = this
          this.$axios
            .post(`http://www.api.hwkjtop.com/api/WeChatPay/MobileJsPay`,{
                Amount: this.list.price,
                Subject: this.list.filename.substring(0, 10),
                openId: code.data.data || code.data,
                InterfaceParam:{
                  IpAddr:this.list.ipaddr,
                  Port:this.list.port,
                  DevId:this.list.devid,
                  MediaId:this.list.id,
                  Count: this.list.count || 1
                }
            })
            .then(res => {
                            // 支付
                            console.log(res)
              let formContent = res.data
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
                  onBridgeReady(formContent);
                }
              }
              function onBridgeReady(params, orderGuids) {
                console.log(params)
                // alert(params['app_id'])
                // alert(params['time_stamp'])
                // alert(params['nonce'])
                // alert(params['package'])
                // alert(params['sign'])
                // alert(params['sign_type'])
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',
                  {
                    appId: params['app_id'], //公众号名称，由商户传入
                    timeStamp: params['time_stamp'], //时间戳，自1970年以来的秒数
                    nonceStr: params['nonce'], //随机串
                    package: params['package'],
                    signType: params['sign_type'], //微信签名方式：
                    paySign: params['sign'] //微信签名
                    //                                  "total_fee": self.getOrderInfo.price
                  },
                  function(res) {
                    Indicator.close();
                    console.log(res);
                    // alert(res.err_msg)
                    // alert(orderGuids);
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                      // alert(orderGuids);
                      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                      self.$toast('支付成功');
                      // alert(self)
                      setTimeout(function() {
                        // alert('我要跳转了!')
                        self.$router.push('/paysuccess');
                      }, 500);
                    }
                  }
                );
              }
            })
    },
    goPay() {
      localStorage.setItem("song",JSON.stringify(this.list))
      Indicator.open()
      // this.$loading.show();
      // this.$axios.get(`http://121.41.108.53:10088/play?ipaddr=${this.list.ipaddr}&port=${this.list.port}&filename=${this.list.filename}`).then(res=>{
      //   console.log(res)
      // })
      // this.$router.push('/paysuccess')
      function GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
      }
      function urlencode (str) {  
          str = (str + '').toString();   

          return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
          replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');  
      }
      if (this.check == 2) {
                // this.$axios.post('/v1/WeChatPay/isBingWeChat').then(res => {
        if (this.getSession('code')) {
          let self = this;
          let returnUrl = `${
            'https:' == document.location.protocol
              ? 'https://' + window.location.host
              : 'http://' + window.location.host
          }#/paysuccess`
          // alert('回调地址:' + returnUrl);
          if(this.getSession('openId')){
            this.weixinpay(this.getSession('openId'))
          }
          this.$axios
            .get(`http://www.api.hwkjtop.com/api/WeChatPay/GetOpenId?code=${this.getSession('code')}`)
            .then(code => {
              this.weixinpay(code)
              this.setSession('openId',code)
            })
            .catch(err => {});
        } else {
          // this.thirdLogin('snsapi_userinfo');
        }

      } else {
        // 支付宝
        let returnUrl = 'http://www.hwkjtop.com/#/paysuccess';
        let self = this;
        this.$axios
          .post(`http://www.api.hwkjtop.com/api/AliPay/MobileWebPay`, {
            Amount: this.list.price,
            Subject: this.list.filename,
            ReturnUrl: returnUrl,
            InterfaceParam:{
              IpAddr:this.list.ipaddr,
              Port:this.list.port,
              DevId:this.list.devid,
              MediaId:this.list.id,
              Count: this.list.count || 1
            }
          })
          .then(res => {
            console.log(res)
                const div = document.createElement('div')
                /* 此处form就是后台返回接收到的数据 */
                div.innerHTML = res.data
                div.style='display:none'
                document.body.appendChild(div)
                document.forms[0].submit()
            // createPayForm.call(this, strData);
            // this.$nextTick(function() {
            //   console.log(document.forms['punchout_form']);
            //   document.forms['punchout_form'].submit();
            // });
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
.home_boss_pay {
  .mint-cell .mint-cell-title {
    padding-left:0!important;
    font-size: 16px;
  }
}
@import './../assets/css/variable.scss';
.home_boss_pay {
  .mint-header-button {
    flex:0
  }
  p {
    padding: 10px 10px 0 10px;
    margin: 0 10px;
    font-size: 15px;
    opacity: .7;
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
  li {
    padding: 25px 10px;
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
    margin-top:30px;
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
    color: #454545;
  }
  .checked {
    color: #3d95ff;
  }
}
</style>
