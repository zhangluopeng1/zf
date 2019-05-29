<template>
  <div class="cell" v-if="isLink" :class="{isCenter: alignCenter}">
    <div class="icon" v-if="iconright">
      <slot name="icon"></slot>
    </div>
    <div class="tt">
      <slot name="title"></slot>
    </div>
    <div class="text link">{{text}}</div>
    <div class="icon" v-if="!iconright">
      <slot name="icon"></slot>
    </div>
  </div>
  <div class="cell" v-else :class="{isCenter: alignCenter}">
    <div class="icon" v-if="iconright">
      <slot name="icon"></slot>
    </div>
    <div class="tt">
      <slot name="title"></slot>
    </div>
    <div class="text" v-if="text">{{text}}</div>
    <slot v-if="!text"></slot>
    <div class="icon" v-if="!iconright">
      <slot name="icon"></slot>
    </div>
      <slot name="con"></slot>
  </div>
</template>
<script>
export default {
  name: 'Cell',
  props: {
    text: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    alignCenter: {
      type: Boolean,
      default: true
    },
    iconright: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import './../assets/css/variable.scss';
a.cell:active {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: #f5f5f5;
}
.cell {
  @include borderAfter;
  text-decoration: none;
  background: #fff;
  padding: 10rem / $model 15px;
  display: flex;
  font-size: $fontS1;
  position: relative;
  &.isCenter {
    align-items: center;
  }
  & + .cell {
    &::before {
      left: 15px;
      right: 0;
    }
  }
  .tt {
    flex: 5;
  }
  .text {
    margin-left: 10px;
    font-size: 12rem / $model;
    &.link {
      @include linkIcon;
    }
  }
  .icon {
    & > i {
      margin-right: 8px;
    }
    & > img {
      margin-right: 8px;
    }
  }
}
</style>

