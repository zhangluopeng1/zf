<template>
    <div class="input_boss">
        <div class="before">
            <slot name="iconBefore"></slot>
        </div>
        <input :type="type" ref="input" :value="value" :placeholder="text" @input="$emit('input', $event.target.value)" >
        <div class="after">
            <slot name="iconAfter"></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Input',
  props: ['text', 'value', 'type'],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import './../assets/css/variable.scss';
.input_boss {
  width: 100%;
  margin: 0 auto;
  position: relative;
  input {
    padding: 0 1rem;
    line-height: 1.2rem;
    width: 100%;
    border: 0 solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 0.4rem;
  }
  .before {
    position: absolute;
    top: 0;
    left: 0;
    i {
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #8a8a8a;
    }
  }
  .after {
    position: absolute;
    top: 0;
    right: 0;
    i {
      font-size: 0.6rem;
      line-height: 1.2rem;
      color: #8a8a8a;
    }
  }
}
</style>