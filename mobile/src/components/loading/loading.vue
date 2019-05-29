<template>
 
  <div id="loading-plugins" ref="root" v-show="showFlag">
    <div class="load-box">
      <div class="load-circle"> <img src="../../assets/img/loading.gif" alt=""> </div>
    </div>
  </div>
 
</template>
<script language="JavaScript">
export default {
  data() {
    return {
      showFlag: false
    };
  },
  created() {},
  methods: {
    changeView(obj) {
      if (obj) {
        this.$nextTick(() => {
          this.$refs['root'].style.height = obj.clientHeight + 'px';
          this.$refs['root'].style.width = obj.clientWidth + 'px';
        });
      } else {
        this.$nextTick(() => {
          this.$refs['root'].style.height = window.innerHeight + 'px';
          this.$refs['root'].style.width = window.innerWidth + 'px';
        });
      }
    },
    async show(obj = undefined) {
      await this.changeView(obj);
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="scss" scoped>
#loading-plugins {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(255, 255, 255, 1);
  .load-box {
    height: 50px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .load-circle {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
      }
    }
  }
}
</style>