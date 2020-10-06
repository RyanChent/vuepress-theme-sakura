<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink :to="$localePath" class="home-link" replace>
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span
      >
    </RouterLink>

    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px',
            }
          : {}
      "
    >
      <Mode v-if="themeConfig.mode" />
      <AiSearch v-if="themeConfig.aiSearch" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AiSearch from "./AISearch.vue";
import SidebarButton from "./SidebarButton.vue";
import NavLinks from "./NavLinks.vue";
import Mode from "./DarkMode";

export default {
  name: "Navbar",

  components: {
    SidebarButton,
    NavLinks,
    AiSearch,
    Mode,
  },

  data() {
    return {
      linksWrapMaxWidth: null,
    };
  },
  computed: {
    themeConfig() {
      return this.$site.themeConfig;
    },
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Pacifico');

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;
  transition: all 2s;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 2.5rem;
    font-weight: 400;
    font-family: 'Pacifico', cursive;
    color: #cce7f8;
    animation: shining 0.5s alternate infinite;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }
}

@keyframes shining {
  from {
    text-shadow: 0 0 6px rgba(182, 211, 207, 0.9), 0 0 30px rgba(182, 211, 207, 0.3), 0 0 12px rgba(15, 115, 223, 0.5), 0 0 21px rgba(15, 115, 223, 0.9), 0 0 34px rgba(15, 115, 223, 0.8), 0 0 54px rgba(15, 115, 223, 0.9);
  }

  to {
    text-shadow: 0 0 6px rgba(182, 211, 207, 1), 0 0 30px rgba(182, 211, 207, 0.4), 0 0 12px rgba(15, 115, 223, 0.6), 0 0 22px rgba(15, 115, 223, 0.8), 0 0 38px rgba(15, 115, 223, 0.9), 0 0 60px rgba(15, 115, 223, 1);
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }

    .site-name {
      width: calc(100vw - 10.5rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: none;
    }
  }
}
</style>
