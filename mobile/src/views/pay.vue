<template>
  <div class="home_boss_pay" ref="viewBox">
    <ul>
      <li>
        <label>歌曲名称</label>
        <span class="name">{{ list.filename }}</span>
      </li>
      <li>
        <label>歌曲价格</label>
        <span class="price">￥{{ list.price }}</span>
      </li>
      <li>
        <label>支付方式</label>
        <span v-if="getPlatform() !== 'weixin'">
          <i class="iconfont icon-Alipaypayment"></i>
          支付宝
          <span style="float:right" @click="check = 1">
            <i class="iconfont icon-zhengque" :class="check == 1? 'checked' : ''"></i>
          </span>
        </span>
      </li>
      <li>
        <label>  </label>
        <span v-if="getPlatform() !== 'zhifubao'"><i class="iconfont icon-weixinzhifu"></i>微信
          <span style="float:right" @click="check = 2">
            <i class="iconfont icon-zhengque" :class="check == 2? 'checked' : ''"></i>
          </span>
        </span>
      </li>
    </ul>
    <p style="margin-top:30px">
      您即将支付{{ list.price }}元到贵州幻维科技有限公司
    </p>
    <p>
      用于点播歌曲 : {{ list.filename }}
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
      check: 1
    };
  },
  created() {
    this.list =  JSON.parse(localStorage.getItem("song"))
    console.log(this.getPlatform());
    if (this.getPlatform() == 'weixin') {
      this.check = 2;
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    goPay() {
      // Indicator.open()
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
        let returnUrl = 'http://www.hwkjtop.com/#/paysuccess';
        let self = this;
        this.$axios
          .post(`http://www.api.hwkjtop.com/api/WeChatPay/MobileWebPay`, {
            TotalAmount: this.list.price,
            Subject: this.list.filename.substring(0,10),
            ReturnUrl: returnUrl,
            InterfaceParam:{
              IpAddr:this.list.ipaddr,
              Port:this.list.port,
              FileName:this.list.filename.substring(0,10),
              DevId:this.list.devid,
              MediaId:this.list.id
            }
          })
          .then(res => {
            console.log(res.data.mweb_url + '&redirect_url=' + urlencode('http://www.hwkjtop.com'))
            let data = res.data.mweb_url + '&redirect_url=' + urlencode('http://www.hwkjtop.com')
            window.location.href= data
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        // 支付宝
        let returnUrl = 'http://www.hwkjtop.com/#/paysuccess';
        let self = this;
        this.$axios
          .post(`http://www.api.hwkjtop.com/api/AliPay/MobileWebPay`, {
            TotalAmount: this.list.price,
            Subject: this.list.filename,
            ReturnUrl: returnUrl,
            InterfaceParam:{
              IpAddr:this.list.ipaddr,
              Port:this.list.port,
              FileName:this.list.filename,
              DevId:this.list.devid,
              MediaId:this.list.id
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
