<template>
  <div class="404">
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Header -->
      <header id="header">
        <div class="logo">
          <span class="icon fa-diamond"></span>
        </div>
        <div class="content">
          <div class="inner">
            <h1>404</h1>
            <p>
              <!--[-->对不起，你要找的这个页面突然不见了。不过，放心，一切都在我的掌控之中，不会跑多远！<!--]-->
            </p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/" style="text-decoration: none">首页</a>
            </li>
            <li>
              <a
                href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=dAYDBRMVNAUFWhcbGQ"
                style="text-decoration: none"
                target="_blank"
                >联系</a
              >
            </li>
          </ul>
        </nav>
      </header>

      <footer id="footer">
        <p class="copyright">
          &copy; Untitled. Design: <b style="color: #0cc">404.LIFE</b>.
        </p>
      </footer>
    </div>

    <div id="bg"></div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  data() {
    return {
      jqueryMin: null,
      skelMin: null,
      utilJs: null,
      mainJs: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.jqueryMin) {
        this.jqueryMin = this.$loadScript(
          "../public/error/assets/js/jquery.min.js",
          false
        );
      }
      if (!this.skelMin) {
        this.skelMin = this.$loadScript(
          "../public/error/assets/js/skel.min.js",
          false
        );
      }

      if (!this.utilJs) {
        this.utilJs = this.$loadScript(
          "../public/error/assets/js/util.js",
          false
        );
      }

      if (!this.mainJs) {
        this.mainJs = this.$loadScript(
          "../public/error/assets/js/main.js",
          false
        );
      }
    },
  },
};
</script>

<style scoped>
@import url("../public/error/assets/css/main.css");
@import url("../public/error/assets/css/noscript.css");
</style>
