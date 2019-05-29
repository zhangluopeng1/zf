<template>
  <footer class="footer">
    <!-- <div v-for="(item, index) of options" :key="index" @click="$router.push(item.path)" :class="item.path === $route.path?'current':'current1'">
        <i class="iconfont" :class="item.icon" :style="item.style"></i>
        <p v-text="item.text"></p>
      <div class="car_icon" v-if="item.text === '购物车'"> -->
        <!-- <span class="icon-car-count">{{ getnum(list) }}</span> -->
      <!-- </div>
    </div> -->
    <!-- <mt-tabbar v-model="selected">
      <mt-tab-item :id="item.path" v-for="(item,index) in options" :key="index">
        <i class="iconfont" :class="item.icon" :style="item.style"></i>
        {{ item.text }}
      </mt-tab-item>
    </mt-tabbar> -->
    <div data-v-1260502b="" class="mint-tabbar">
      <a data-v-1260502b="" class="mint-tab-item" v-for="(item, index) of options" :key="index" @click="$router.push(item.path)" :class="item.path === $route.path?'is-selected':''">
        <div class="mint-tab-item-icon"></div> 
        <div class="mint-tab-item-label">
          <div class="car_icon" v-if="item.text === '购物车' && $store.state.list !== 0 && getData('user')">
            <span class="icon-car-count">{{ $store.state.list }}</span>
          </div>
          <i data-v-1260502b="" :class="'iconfont ' + item.icon "></i>
        {{ item.text }}
        </div>
      </a></div>
  </footer>  
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'Footer',
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getnum() {}
  },
  computed: {
    ...mapState({
      list: 'list'
    })
  }
};
</script>
<style lang="scss" scoped>
@import './../assets/css/variable.scss';
.footer {
  height: 55rem / $model;
  // padding-top: 6px;
  background: #fafafa;
  display: flex;
  justify-content: space-around;
  .mint-tabbar {
    height: 55rem / $model;
  }
  .is-selected {
    position: relative;
    color: $greenColor !important;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .mint-tab-item {
    position: relative;
    color: #818085;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  & > div {
    text-align: center;
    &.current1 {
      position: relative;
      color: #818085;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    i {
      display: block;
      position: relative;
      font-size: 22rem / $model;
      height: 22rem / $model;
    }
    .tiaozheng {
      &::before {
        position: absolute;
        top: -4rem / $model;
        left: 11rem / $model;
        font-size: 32rem / $model;
      }
    }
    .tiaozheng-my {
      &::before {
        font-size: 27.5rem / $model;
      }
    }
    .tiaozheng-cart {
      &::before {
        font-size: 25rem / $model;
      }
    }
    p {
      display: block;
      font-size: 14rem / $model;
    }
  }
  .car_icon {
    position: absolute;
    right: 0.65rem;
    top: 0;
    line-height: 1.5rem;
    .icon-car-count {
      min-width: 10px;
      line-height: 10px !important;
      border-radius: 17px;
      padding: 4px;
      font-size: 14px;
    }
  }
}
</style>
