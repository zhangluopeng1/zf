<template>
  <div class="home_boss" ref="viewBox">
    <div class="header">
      <img src="../assets/img/header.jpg" alt="">
    </div>
    <div class="search">
      <form action="" v-on:submit.prevent="a">
        <span class="title">Pos</span>
        <mt-search
        v-model="searchValue"
        cancel-text="取消"
        placeholder="搜索产品"
        @keyup.enter.native="search"
        class="font-size-8"
        style="width:100%;height:auto;"
        >
        </mt-search>
      </form>
    </div>
    <ul
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="200">
      <li v-for="(item,key) in list" :key="key" @click="select(item,key)" :class="check===key? 'checked' : ''">
        <mt-cell :title="item.filename" :label="item.description">
          <span style="color:#FF4040;font-weight:300;font-size:.48rem"><span style="font-size:.35rem">￥</span>{{item.price}}</span>
          <div slot="icon" class="icon_img">
            <img  src="../assets/img/titleBg.png" >
          </div>
        </mt-cell>
      </li>
      <div class="loading" v-if="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
    </ul>
    <div class="button_song" @click="chooseSong()">
      去支付
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  name: 'home',
  data() {
    return {
      list: [],
      searchValue: '',
      check: '',
      loading: false,
      num: 1
    };
  },
  created() {
    console.log(this.$route.query.devid);
  },
  mounted() {
    function GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }

    // 微信登录
    if (!GetQueryString('code') && this.getPlatform() === 'weixin' && !this.getSession('code')) {
        let data = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx612901746d6bc8b4&redirect_uri=${encodeURIComponent(`http://www.hwkjtop.com/#/?devid=${this.$route.query.devid || ''}`)}&response_type=code&scope=snsapi_base&state=2222#wechat_redirect`;
        window.location.href = data;
    } else {
      this.setSession('code',GetQueryString('code'))
      this.getdateil();
    }
    var _this = this;
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {},
  methods: {
    //获取详细列表
    getdateil() {
      this.$axios.get(`${this.listURL}/mediaonline/api/getfilelist?devid=${this.$route.query.devid}&linecnt=20&pagecnt=${this.num}`).then(res=>{
        if(res.data.code === 0){
          res.data.data.forEach(item=>{
            item.price = (item.price / 100).toFixed(2)
            this.list.push(item);
          })
        }
        console.log(this.list);
        this.loading = false;
        console.log(res);
      })
    },
    select (item,key) {
      this.check = key
      localStorage.setItem("song",JSON.stringify(item))
    },
    //获取更多列表
    loadMore() {
      this.loading = true;
      this.num ++;
      this.getdateil();
    },
    //搜索
    search() {},
    a() {},
    // 微信授权
    thirdLogin(type) {
      this.$axios
        .post('/v1/store/getStoreJoinStatus', {
          data: this.getSession('supplierGuid')
        })
        .then(res => {
          this.brandGuid = res.data.data;
          let baseURL =
            'https:' == document.location.protocol
              ? 'https://' + window.location.host + '/mobile/'
              : 'http://' + window.location.host + '/mobile/';
          this.$axios
            .post('/v1/WeChatPay/getAppId', {
              data: {
                companyGuid: this.getSession('supplierGuid'),
                brandGuid: this.brandGuid
              }
            })
            .then(res => {
              let data = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
                res.data.data
              }&redirect_uri=${encodeURIComponent(
                `${baseURL}`
              )}&response_type=code&scope=${type}&state=${type}#wechat_redirect`;
              window.location.href = data;
            });
        });
    },
    // 支付宝授权
    thirdLoginZfb() {
      this.$axios
        .post('/v1/store/getStoreJoinStatus', {
          data: this.getSession('supplierGuid')
        })
        .then(res => {
          this.brandGuid = res.data.data;
          let baseURL =
            'https:' == document.location.protocol
              ? 'https://' + window.location.host + '/'
              : 'http://' + window.location.host + '/';
          baseURL = baseURL + '#/';
          console.log(baseURL);
          this.$axios
            .post('/v1/AliPay/getAppId', {
              data: {
                companyGuid: this.getSession('supplierGuid'),
                brandGuid: this.brandGuid
              }
            })
            .then(res => {
              //正式
              // let data = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${
              //   res.data.data
              // }&scope=auth_base,auth_user&redirect_uri=${encodeURIComponent(
              //   `${baseURL}`
              // )}&state=zfb`;
              //测试
              let data = `https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=${
                res.data.data
              }&scope=auth_base,auth_user&redirect_uri=${encodeURIComponent(
                `${baseURL}`
              )}&state=zfb`;
              window.location.href = data;
            });
        });
    },
    chooseSong() {
      if (this.check || this.check === 0) {
       this.$router.push('/pay');
      } else {
                Toast({
          message: '请选择产品',
          position: 'center',
          duration: 5000
        });
      }
    }
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
.home_boss {
  padding-top: 3.1rem;
  .header {
    img {
      width: 100%;
      height:3.1rem;
    }
  }
  ul {
    max-height: 100vh; //与屏幕一样高度
    overflow-y: auto;
    padding-bottom: 1.2rem;
    // box-sizing: border-box;
    li {
      padding: 0 10px;
      border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.3);
    }
  }
  .loading .mint-spinner-fading-circle {
    margin: 0 auto;
  }
  .search {
    position:relative;
    padding: 10px;
    background: url('../assets/img/timg.jpg');
    .mint-search {
      height: auto;
    }
  }
  .button_song {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    background: #3d95ff;
    color: white;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .45rem;
  }
  .icon_img {
    position: absolute;
    left: 0;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .checked {
    background: #DEDEDE;
    a {
      background: #DEDEDE!important;
    }
  }
  .mint-searchbar {
    background: rgba(0, 0, 0, 0);
    padding: 5px;
    padding-left: 1.5rem;
  }
  .mint-searchbar-inner {
    height: .9rem;
    font-size: .4rem;
    border-radius: 5px;
  }
}
.mint-button-text {
  display: none;
}
.mint-cell {
  min-height: 1.6rem;
}
.mint-cell .mint-cell-wrapper {
  font-size: .45rem!important;
}
body .mint-cell-label {
  font-size: .35rem;
  margin-top: .27rem;
}
.mint-cell .mint-cell-title {
  padding-left:1.3rem;
}
.title {
  position: absolute;
  top:.6rem;
  bottom:0;
  font-size:.4rem;
  color: white;
}
</style>
