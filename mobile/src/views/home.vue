<template>
  <div class="home_boss" ref="viewBox">
    <div class="search">
      <form action="" v-on:submit.prevent="a">
        <mt-search
        v-model="searchValue"
        cancel-text="取消"
        placeholder="搜索歌曲"
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
      <li v-for="(item,key) in list" :key="key" @click="check = key" :class="check===key? 'checked' : ''">
        <mt-cell title="标题文字" label="描述信息">
          <span>icon 是图片{{item}}</span>
          <div slot="icon" class="icon_img">
            <img  src="../assets/img/bg.png" >
          </div>
        </mt-cell>
      </li>
      <div class="loading" v-if="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
    </ul>
    <div class="button_song" @click="chooseSong()">
      立即点歌
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  name: 'home',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 66, 7, 8, 9, 10, 2, 3, 4, 5, 66, 7, 8, 9, 10],
      searchValue: '',
      check: '',
      loading: false
    };
  },
  created() {},
  mounted() {
    function GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }

    // this.$indicator.open();
    // if (this.$route.query.brandId) {
    //   this.setSession('brandId', this.$route.query.brandId);
    // }
    // 支付宝登录
    if (this.$route.query.auth_code && !this.isLogin()) {
      this.$axios
        .post('/v1/store/getStoreJoinStatus', {
          data: this.getSession('supplierGuid')
        })
        .then(res => {
          let data = {
            brandGuid: res.data.data,
            code: this.$route.query.auth_code,
            companyGuid: this.getSession('supplierGuid')
          };
          this.$axios
            .post('/v1/AliPay/codeTurnAccessToken', { data: data })
            .then(res => {
              // this.$toast('登录成功');
            });
        });
    }
    // 微信登录
    if (GetQueryString('code') && !this.isLogin()) {
      if (GetQueryString('state') === 'snsapi_userinfo') {
        this.$axios
          .post('/v1/store/getStoreJoinStatus', {
            data: this.getSession('supplierGuid')
          })
          .then(res => {
            let data = {
              brandGuid: res.data.data,
              code: GetQueryString('code'),
              companyGuid: this.getSession('supplierGuid')
            };
            this.$axios
              .post('/v1/WeChatPay/codeTurnAccessTokenTest', { data: data })
              .then(res => {
                // this.$toast('登录成功');
                console.log(res);
                if (res.data.data.thirdPartUserGuid) {
                  this.$indicator.close();
                  this.$toast('请先完善您的信息');
                  this.setSession(
                    'thirdPartUserGuid',
                    res.data.data.thirdPartUserGuid
                  );
                  this.$router.push('/register');
                } else {
                  this.setData('user', res.data.data);
                  this.getdateil();
                }
              });
          });
      }
    } else {
      this.getdateil();
    }
    var _this = this;
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {},
  methods: {
    //获取详细列表
    getdateil() {},
    //获取更多列表
    loadMore() {
      this.loading = true;
      this.list.push('1');
      this.loading = false;
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
      if (!this.check) {
        Toast({
          message: '请选择歌曲',
          position: 'center',
          duration: 5000
        });
      } else {
        this.$router.push('/pay');
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
    padding: 10px;
    background: url('../assets/img/bg.png');
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
    line-height: 20px;
    background: #3d95ff;
    color: white;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon_img {
    position: absolute;
    left: 0;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
  .checked {
    background: #ccc;
  }
  .mint-searchbar {
    background: rgba(0, 0, 0, 0);
    padding: 5px;
    padding-left: 30px;
  }
  .mint-searchbar-inner {
    height: 30px;
    border-radius: 5px;
  }
}
.mint-button-text {
  display: none;
}
</style>
