<template>
  <footer>
    <div class="site-footer">
      <div class="site-info">
        <div class="footertext">
          <div class="img-preload">
            <img
              src="https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/wordpress-rotating-ball-o.svg"
              alt="footer1"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/disqus-preloader.svg"
              alt="footer2"
            />
          </div>
          <p style="color: #666666">&copy 2020 JarryChen</p>
          <p
            style="font-family: 'Ubuntu', sans-serif; color: #b9b9b9"
            v-if="showTime"
          >
            <span id="timeDate">{{ timeDate }}</span
            ><span id="times">{{ times }}</span>
          </p>
        </div>
      </div>
      <div class="footer-device">
        <p v-if="showStatis">
          <span id="busuanzi_container_site_pv"
            >{{ busuanzi.pv || '访问量'
            }}<span id="busuanzi_value_site_pv"></span>次</span
          >
          &emsp;
          <span id="busuanzi_container_site_uv"
            >{{ busuanzi.uv_first || '访客数'
            }}<span id="busuanzi_value_site_uv"></span>
            {{ busuanzi.uv_last || '人' }}
          </span>
        </p>
        <p>
          <img style="width: 20px; height: 20px" src="../public/beian.png" alt="备案" />
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            rel="external nofollow"
            style="color: #b9b9b9"
            >&nbsp;{{ beian }}</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      timeDate: '载入天数...',
      times: '载入时分秒...',
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.showTime) {
        this.createTime();
        setInterval(() => {
          this.createTime();
        }, 1000);
      }
    });
  },
  computed: {
    themeConfig() {
      return this.$site.themeConfig;
    },
    time() {
      return new Date(this.themeConfig.createTime);
    },
    showTime() {
      return Boolean(this.themeConfig.createTime);
    },
    showStatis() {
      return Boolean(this.themeConfig.busuanzi);
    },
    busuanzi() {
      return this.themeConfig.busuanzi;
    },
    beian() {
      return this.themeConfig.beian;
    },
  },
  methods: {
    createTime() {
      const time = this.time;
      const now = new Date();
      now.setTime(now.getTime() + 1000);
      let days = (now - time) / 1000 / 60 / 60 / 24;
      let dnum = Math.floor(days);
      let hours = (now - time) / 1000 / 60 / 60 - 24 * dnum;
      let hnum = Math.floor(hours);
      if (hnum.toString().length === 1) hnum = '0' + hnum;
      let minutes = (now - time) / 1000 / 60 - 24 * 60 * dnum - 60 * hnum;
      let mnum = Math.floor(minutes);
      if (mnum.toString().length === 1) mnum = '0' + mnum;
      let seconds =
        (now - time) / 1000 - 24 * 60 * 60 * dnum - 60 * 60 * hnum - 60 * mnum;
      let snum = Math.floor(seconds);
      if (snum.toString().length === 1) snum = '0' + snum;
      this.timeDate = `本站已苟活 ${dnum} 天`;
      this.times = `${hnum} 小时 ${mnum} 分 ${snum} 秒`;
    },
  },
};
</script>

<style lang="stylus">
.site-footer
  font-size 13px
  padding 2% 0
  background rgba(255, 255, 255, .8)
  width 100%
  margin auto
  text-align center
  .site-info
    font-size  13px
    color #b9b9b9
    .footertext
      .img-preload
        visibility hidden
        width 0
        height 0
      p
        line-height none
      .foo-logo
        width 30px
        height 30px
        opacity .3
        margin 0 auto
        background-size cover
        background-position center center
        background-repeat no-repeat
        animation poi-deg 12s infinite linear
    a
     color #b9b9b9
     &:hover
      color orange

@keyframes poi-deg
  0%
    transform rotate(0deg) hue-rotate(0deg)
  100%
    transform rotate(360deg) hue-rotate(360deg)
</style>
