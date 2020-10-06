<template>
  <main class="home" aria-labelledby="main-title">
    <div class="home-logos">
      <div
        v-for="(item, index) in allname"
        :key="item"
        class="per-logo"
        @click="logokey = index"
        :class="{ choose: logokey == index }"
        @dblclick="jumpTo(item)"
      >
        <img :src="alllogo[item]" :alt="item" />
        <span>{{ item }}</span>
      </div>
    </div>
  </main>
</template>

<script>
import NavLink from "./NavLink.vue";
import { logos, links } from "../assets/home-logo";
export default {
  name: "Home",
  data() {
    return {
      logokey: -1,
    };
  },
  components: { NavLink },
  computed: {
    alllogo() {
      return logos;
    },

    allname() {
      return [
        "angular",
        "css3",
        "h5",
        "es6",
        "vue",
        "react",
        "nuxt",
        "wechat",
        "typescript",
        "webpack",
        "nodejs",
      ];
    },
  },
  methods: {
    jumpTo(key) {
      location.href = links[`${key}link`];
      this.logokey = -1;
    },
  },
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 0 0;
  width: 100%;
  background-image: url('../public/home.jpg');
  height: 100vh - $navbarHeight - 2.3;
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: hidden;

  .home-logos {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

    .per-logo {
      &.choose {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);

        span {
          color: #409eff;
        }
      }

      width: 64px;
      text-align: center;
      margin: 0 auto;

      &:hover {
        span {
          color: #409eff;
        }
      }

      span {
        color: #cce7f8;
        display: block;
        text-align: center;
        width: 100%;
      }

      img {
        display: block;
        text-align: center;
        width: 100%;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home {
    background-image: url('../public/home-mobile.jpg');

    .per-logo {
      margin: 10px !important;
      flex: 0 0 calc(25% - 20px);
    }
  }
}
</style>
