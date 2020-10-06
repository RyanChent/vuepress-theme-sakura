<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart.self="onTouchStart"
    @touchend.self="onTouchEnd"
  >
    <div id="progressbar" v-if="!$page.frontmatter.home" />
    <div id="scrollPath" v-if="!$page.frontmatter.home" />
    <Navbar
      v-if="shouldShowNavbar"
      :style="{ opacity: Number(showNavbar) }"
      @toggle-sidebar="toggleSidebar"
    />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" @click="toggleSidebar(false)" />
    <Page v-else :sidebar-items="sidebarItems" @click="toggleSidebar(false)" />

    <Footer v-if="!$page.frontmatter.home" />
  </div>
</template>

<script>
import Home from "../theme-components/Home.vue";
import Navbar from "../theme-components/Navbar.vue";
import Page from "../theme-components/Page.vue";
import Sidebar from "../theme-components/Sidebar.vue";
import { resolveSidebarItems } from "../util";
import Footer from "../theme-components/Footer.vue";
export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    Footer,
  },

  data() {
    return {
      isSidebarOpen: false,
      botui: null,
      scrollHeight: null,
      showNavbar: false,
      moveFunction: null,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },
  mounted() {
    this.initLayout();
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },
  watch: {
    $route() {
      this.$handleScrollBar(this.scrollHeight);
    },
  },
  methods: {
    initLayout() {
      const pageTop = document.getElementsByClassName("page-top")[0];
      this.scrollHeight = pageTop
        ? pageTop.offsetHeight
        : 0 + document.getElementsByTagName("header")[0].offsetHeight;
      //处理目录的滚动
      if (this.$site.themeConfig.botui) {
        if (!this.botui) {
          //加载机器人
          this.botui = this.$loadScript(this.$site.themeConfig.botui);
        }
      }
      window.addEventListener("mousemove", this.handleNavbarShow, true);
    },

    handleNavbarShow() {
      this.showNavbar = true;
      clearTimeout(this.moveFunction);
      this.moveFunction = setTimeout(() => {
        this.showNavbar = false;
      }, 2500);
    },

    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.handleNavbarShow, true);
  },
};
</script>
