<template>
  <div class="ai-search">
    <el-autocomplete
      v-model="article"
      value-key="title"
      :debounce="500"
      placement="bottom"
      prefix-icon="el-icon-search"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    >
      <template slot-scope="{ item }">
        <p class="inline-input">
          <span :title="item.title">{{ item.title }}</span>
          <span>{{ item.frontmatter.categories }}</span>
        </p>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "AISearch",
  data() {
    return {
      article: "",
    };
  },
  computed: {
    articleList() {
      return this.$site.pages.filter(
        (page) => page.frontmatter && page.frontmatter.post
      );
    },
  },
  methods: {
    querySearch(queryString, cb) {
      const articleList = this.articleList;
      const result = queryString
        ? articleList.filter(
            (page) =>
              page.frontmatter.title &&
              page.frontmatter.title.includes(queryString)
          )
        : articleList;
      cb(result);
    },

    handleSelect(item) {
      location.href = item.path;
    },
  },
};
</script>

<style lang="stylus">
.ai-search {
  display: inline-block;
  flex: 0 0 auto;
  position: relative;
  margin-right: 1rem;

  .el-input__inner {
    display: inline-block;
    border-radius: 2rem;
    padding: 0 0.5rem 0 2rem;
    border: 1px solid #cfd4db;
    color: #4e6e8e;
    cursor: text;
    line-height: 2rem;
    height: 2rem;
    font-size: 0.9rem;
  }
}

.el-autocomplete-suggestion.el-popper {
  width: auto !important;

  .el-scrollbar__bar.is-horizontal {
    height: 0px;
    visibility: hidden;
  }

  li {
    padding: 0 10px;

    .inline-input {
      line-height: 1.4;
      display: flex;

      span {
        display: inline-block;

        &:first-child {
          width: 70%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:last-child {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
</style>
