<template>
  <div id="SOHUCS" style="width: 50%" />
</template>

<script>
export default {
  name: 'ChangYan',
  computed: {
    changyan() {
      return this.$themeConfig.commentsParam;
    },

    width() {
      return window.innerWidth || document.documentElement.clientWidth;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const {changyan_appid, changyan_appkey} = this.changyan;
      if (this.width < 960) {
        const head =
          document.getElementsByTagName('head')[0] ||
          document.head ||
          document.documentElement;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.id = 'changyan_mobile_js';
        script.src = `https://cy-cdn.kuaizhan.com/upload/mobile/wap-js/changyan_mobile.js?client_id=${changyan_appid}&conf=${changyan_appkey}`;
        head.appendChild(script);
      } else {
        const loadJs = function (d, a) {
          const c =
            document.getElementsByTagName('head')[0] ||
            document.head ||
            document.documentElement;
          const b = document.createElement('script');
          b.setAttribute('type', 'text/javascript');
          b.setAttribute('charset', 'UTF-8');
          b.setAttribute('src', d);
          if (typeof a === 'function') {
            if (window.attachEvent) {
              b.onreadystatechange = function () {
                const e = b.readyState;
                if (e === 'loaded' || e === 'complete') {
                  b.onreadystatechange = null;
                  a();
                }
              };
            } else {
              b.onload = a;
            }
          }
          c.appendChild(b);
        };
        loadJs('https://cy-cdn.kuaizhan.com/upload/changyan.js', () => {
          window.changyan.api.config({
            appid: changyan_appid,
            conf: changyan_appkey,
          });
        });
      }
    },
  },
};
</script>

<style lang="stylus">
html[theme='dark-mode']
    #SOHUCS
        #SOHU_MAIN
        .changyan-login-dialog-wrapper
            .platform-login
                .login-group
                    .login-item
                        .login-logo
                            filter: invert(1) hue-rotate(180deg)
</style>
