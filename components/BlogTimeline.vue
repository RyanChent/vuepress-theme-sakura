<template>
  <div class="blog-timeline">
    <el-timeline reverse>
      <el-timeline-item
        v-for="(page, index) in pages"
        :key="index"
        type="success"
      >
        <RouterLink :to="page.path" replace>
          <el-card>
            <p class="title">{{ page.frontmatter.title }}</p>
            <p v-show="page.frontmatter.keywords" class="keywords">
              {{ page.frontmatter.keywords }}
            </p>
            <p class="description" v-show="page.frontmatter.description">
              {{ page.frontmatter.description }}
            </p>
            <p class="date">{{ page.frontmatter.date }}</p>
          </el-card>
        </RouterLink>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "BlogTimeline",
  computed: {
    pages() {
      const { pages } = this.$site;
      const unsortPage = pages.filter((page) => {
        page.frontmatter.date = this.$parseTime(page.frontmatter.date);
        return page.frontmatter.post;
      });
      unsortPage.sort((a, b) =>
        a.frontmatter.date > b.frontmatter.date ? 1 : -1
      );
      return unsortPage;
    },
  },
};
</script>

<style lang="stylus">
.blog-timeline {
  .el-timeline-item__wrapper {
    top: -8px;
  }
}
</style>
