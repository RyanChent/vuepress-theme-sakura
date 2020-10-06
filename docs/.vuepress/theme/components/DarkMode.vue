<template>
  <div class="mode-switch">
    <el-switch
      v-model="mode"
      active-color="#FFCC66"
      inactive-color="#6495ED"
      active-value=" "
      inactive-value="dark-mode"
      @change="changeMode"
      active-icon-class="iconfont icon-sun"
      inactive-icon-class="iconfont icon-moon"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: "DarkMode",
  data() {
    return {
      mode: " ",
    };
  },
  mounted() {
    this.IsDayOrNight();
    setInterval(() => {
      this.IsDayOrNight();
    }, 1000 * 60 * 120);
  },
  methods: {
    changeMode(mode) {
      const html = document.getElementsByTagName("html")[0];
      html.setAttribute("theme", mode);
    },

    IsDayOrNight() {
      const hour = new Date().getHours();
      if (hour > 5 && hour < 19) {
        this.mode = " ";
      } else {
        this.mode = "dark-mode";
      }
      this.changeMode(this.mode);
    },
  },
};
</script>

<style lang="stylus">
.mode-switch
  margin 0 10px
  .el-switch
    vertical-align middle
    align-self center
    .el-switch__label.el-switch__label--right.is-active 
      color: #FFCC66
    .el-switch__label.el-switch__label--left.is-active
      color: 	#6495ED
</style>
