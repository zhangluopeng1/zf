<template>
  <div class="cells">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "cells"
};
</script>
<style lang="scss" scoped>
@import "./../assets/css/variable.scss";
.cells {
  @include borderAfter;
  & + .cells {
    margin-top: 10px;
  }
}
</style>
