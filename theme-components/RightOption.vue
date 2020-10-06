<template>
  <div class="right-options">
    <!-- <span class="el-icon-share my-share" title="分享到" @click="showShare = true"/> -->
    <component v-if="share" :is="share" :config="config" />
    <el-backtop :visibility-height="30" :right="vw" :bottom="250">
      <div class="back-to-top-diy">
        <i class="el-icon-position" title="返回顶部" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: 'RightOptions',
  data() {
    return {
      vw: 200,
      share: null,
      showShare: false
    };
  },
  computed: {
    config() {
      return {
        url: this.url,
        disabled: this.$site.themeConfig.postShare.disabled || [
          "diandian",
          "douban",
          "tencent",
          "google",
        ],
      };
    },
  },
  props: {
    url: [String],
  },
  mounted() {
    this.vw = document.body.clientWidth / 5;
    import('vue-social-share').then(m => {
      this.share = m.default;
    });
  },
};
</script>

<style lang="stylus">
.right-options
    position absolute
    top $navbarHeight * 8.5
    transition all 0.5s
    right 20vw
    .my-share
      font-size 20px
      display inline-block
      color #409eff
      width 32px
      line-height 32px
      cursor pointer
      border-radius 50%
      border solid 1px #409eff
      text-align: center;
      vertical-align: middle;
      transition: background 0.6s ease-out 0s;
      &:hover
        color white
        background #409eff
    .social-share.share-component
      display flex
      flex-direction column
      z-index 9999
      transition all 0.5s
      a
        margin 6px 4px
    .back-to-top-diy
      height 100%
      width 100%
      background-color transparent
      box-shadow 0 0 6px rgba(0, 0, 0, 0.12)
      text-align center
      line-height 40px
      color #1989fa

.right-options-abs
    position absolute
    top $navbarHeight * 8.5
    right 20vw
    z-index 9999
.right-options-fixed
    position fixed
    top $navbarHeight * 3
    right 20vw
    z-index 9999

@media (max-width: calc(1920px * 0.80))
    .right-options
        position static
        max-width $contentWidth
        margin -35px auto 20px
        .social-share.share-component
            flex-direction row
            justify-content center
            a
              margin 4px 6px

@media (max-width: $MQMobile)
    .el-backtop
        right 20px !important
        bottom 50px !important
</style>
