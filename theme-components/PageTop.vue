<template>
  <div class="page-top">
    <el-image
      :src="
        frontmatter.photos ||
        'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/image-404.png'
      "
      fit="cover"
      :alt="`封面图${frontmatter.title}`"
      style="width: 100%; height: 45vmin"
    />
  </div>
</template>

<script>
export default {
  name: 'PageTop',
  computed: {
    frontmatter() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="stylus">
.page-top
    display flex
</style>
