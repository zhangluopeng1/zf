<template>
  <header class="header">
    <slot name="icon"></slot> 
    <slot name="title"></slot>
    <slot name="right"></slot>  
  </header>  
</template>
<script>
export default {
  name: 'appHeader'
};
</script>
<style lang="scss" scoped>
@import './../assets/css/variable.scss';
.header {
  height: 44rem / $model;
  line-height: 44rem / $model;
  background: #66cc66;
  font-size: 18rem / $model;
  color: white;
  position: relative;
  .title {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header_right {
    position: absolute;
    right: 0.5rem;
    top: 0;
    i {
      margin-right: 0.2rem;
    }
  }
}
</style>
