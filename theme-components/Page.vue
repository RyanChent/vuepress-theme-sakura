<template>
  <main class="page">
    <PageTop />
    <section
      @touchstart.stop="onTouchStart"
      @touchend.stop="onTouchEnd"
      @mousedown.stop="onMouseDown"
      @mouseup.stop="onMouseUp"
      ref="section"
    >
      <Content class="theme-default-content" ref="article" />
    </section>
    <PageEdit />
    <PageNav v-bind="{ sidebarItems }" />
    <RightOptions :url="$page.frontmatter.path" v-if="$page.frontmatter.post && $site.themeConfig.postShare" />
    <Comments v-if="$page.frontmatter.comments" />
  </main>
</template>

<script>
import PageEdit from "./PageEdit.vue";
import PageNav from "./PageNav.vue";
import Comments from "./Comments.vue";
import PageTop from "./PageTop.vue";
import RightOptions from "./RightOption.vue";
export default {
  components: { PageEdit, PageNav, Comments, PageTop, RightOptions },
  props: ["sidebarItems"],
  data() {
    return {
      scrollHeight: null,
      carousel: null,
    };
  },
  mounted() {
    this.init();
    this.bindClickOnToc();
  },
  computed: {
    pageSize() {
      const { frontmatter } = this.$page;
      return frontmatter.pageSize || 1;
    },
  },
  methods: {
    init() {
      const pageTop = document.getElementsByClassName("page-top")[0];
      this.scrollHeight = pageTop
        ? pageTop.offsetHeight
        : 0 + document.getElementsByTagName("header")[0].offsetHeight;
      this.$handleScrollBar(this.scrollHeight);
    },

    bindClickOnToc() {
      const toc = document.getElementsByClassName("table-of-contents");
      this.carousel = this.$refs.article.$el.getElementsByClassName(
        "el-carousel"
      );
      if (this.carousel && this.carousel[0]) {
        const ALIST = toc[0].getElementsByTagName("a");
        for (const tag of ALIST) {
          tag.href = "javascript:void(0)";
        }
      }
      if (toc && toc[0]) {
        toc[0].onclick = (e) => {
          const index = parseInt(e.target.text);
          if (this.carousel[0] && !isNaN(index)) {
            this.carousel[0].__vue__.setActiveItem(
              Math.floor((index + 1) / this.pageSize)
            );
          }
        };
      }
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
        if (this.carousel && this.carousel[0]) {
          if (dx > 0) {
            this.carousel[0].__vue__.prev();
          } else {
            this.carousel[0].__vue__.next();
          }
        }
      }
    },

    onMouseDown(e) {
      this.mouseDown = {
        x: e.clientX,
        y: e.clientY,
      };
      this.$refs.section.onselectstart = () => false;
    },

    onMouseUp(e) {
      const dx = e.clientX - this.mouseDown.x;
      const dy = e.clientY - this.mouseDown.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 150) {
        if (this.carousel && this.carousel[0]) {
          if (dx > 0) {
            this.carousel[0].__vue__.prev();
          } else {
            this.carousel[0].__vue__.next();
          }
          this.$refs.section.onselectstart = () => true;
        }
      }
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.bindClickOnToc();
      });
    },
  },
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;

  .el-carousel {
    min-height: 100vh;

    .el-carousel__item {
      overflow: hidden auto;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
  }
}
</style>
