<template>
  <div class="my-blog-list">
    <div
      class="blog-list"
      is="transition-group"
      name="el-zoom-in-center"
      appear
    >
      <el-card
        v-for="(page, index) in pagesPer"
        :key="page.path"
        class="page-data"
        :style="gridMode(index)"
      >
        <component
          :is="page.component"
          :href="page.path"
          :to="page.path"
          :replace="!page.frontmatter.mathjax"
        >
          <p class="post-img">
            <el-image
              :src="
                page.frontmatter.photos ||
                'https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/image-404.png'
              "
              fit="cover"
              style="width: 100%"
              :alt="`文章图${index}`"
              :style="{ height: index % 6 == 0 ? 'calc(60vh - 50px)' : '20vh' }"
            />
          </p>
        </component>
        <p class="content">
          <span class="title-date"
            ><span class="title" :title="page.title">{{ page.title }}</span
            ><span class="date"> {{ page.frontmatter.date }}</span></span
          >
          <span class="author">{{ page.frontmatter.author }}</span>
          <span class="tags" :title="page.frontmatter.tags">{{
            page.frontmatter.tags
          }}</span>
          <span class="description">{{ page.frontmatter.description }}</span>
          <component
            :is="page.component"
            :href="page.path"
            :to="page.path"
            :replace="!page.frontmatter.mathjax"
          >
            更多 >>
          </component>
        </p>
      </el-card>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageIndex"
      :page-size.sync="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
    />
  </div>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return {
      pageSize: 12,
      pageIndex: 1,
      total: 0,
      pagesPer: [],
      scrollHeight: null,
    };
  },
  computed: {
    kind() {
      return this.$page.frontmatter.kind;
    },

    pages() {
      const { pages } = this.$site;
      return pages
        .filter(
          (page) =>
            page.frontmatter.post && page.frontmatter.categories === this.kind
        )
        .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
        .map((page) => {
          console.log(page);
          page.frontmatter.date = this.$parseTime(page.frontmatter.date);
          page.component = page.frontmatter.mathjax ? "a" : "router-link";
          return page;
        });
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pageIndex = 1;
      this.pageSize = 12;
      this.total = this.pages.length;
      this.pagesPer = this.pages.slice(0, this.pageSize);
      const pageTop = document.getElementsByClassName("page-top")[0];
      this.scrollHeight = pageTop
        ? pageTop.offsetHeight
        : 0 + document.getElementsByTagName("header")[0].offsetHeight;
      this.$handleScrollBar(this.scrollHeight);
    },

    handleCurrentChange(page) {
      const start = (page - 1) * this.pageSize;
      const end = page * this.pageSize;
      this.pagesPer = this.pages.slice(start, end);
    },

    gridMode(index) {
      let style = "";
      if (index % 6 === 0) {
        const times6 = index / 6;
        style += `grid-row: ${3 * times6 + 1} / ${3 * (times6 + 1)};`;
        if (times6 % 2 === 0) {
          style += `${
            this.pageIndex % 2 === 0 ? "grid-column: 1/3" : "grid-column: 2/4"
          }`;
        } else {
          style += `${
            this.pageIndex % 2 === 0 ? "grid-column: 2/4" : "grid-column: 1/3"
          }`;
        }
      }

      return style;
    },
  },
};
</script>

<style lang="stylus">
.my-blog-list {
  min-width: $contentWidth + 300px;
  margin-left: -150px;

  ._odsrpenqjm {
    position: absolute;
    top: $navbarHeight * 8.5;
    left: 10vw;
    transition: all 0.5s;
  }

  .el-pagination {
    margin: 10px auto;
    text-align: center;

    li {
      width: auto;
    }
  }

  .blog-list {
    display: grid;
    grid-auto-flow: row dense;
    transition: all 1s;
    grid-template-columns: repeat(3, 33.33%);
    width: 100%;

    .page-data.el-card {
      margin: 10px;

      .el-card-body {
        padding: 10px;
      }

      .post-img {
        display: inline-block;
        width: 100%;
        margin: 5px 0;
      }

      .content {
        width: 100%;
        margin: 0;
        padding: 0 0 10px;

        a {
          float: right;
          font-size: 14px;
        }

        span {
          display: block;
          width: 100%;
          margin: 5px 0;
        }

        .author, .description {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
        }

        .tags {
          font-size: 13px;
        }

        .title-date {
          display: flex;

          .title {
            display: inline-block;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;
          }

          .date {
            display: inline-block;
            font-size: 12px;
            padding: 3px 0;
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}

.left-ads-abs {
  position: absolute;
  top: $navbarHeight * 8.5;
}

.left-ads-fixed {
  position: fixed;
  top: $navbarHeight * 1.5;
}

@media (max-width: $MQMobile) {
  .my-blog-list {
    min-width: 0 !important;
    width: 100%;
    margin-left: 0 !important;

    ._odsrpenqjm {
      display: none;
    }

    .blog-list {
      display: block !important;
      grid-template-columns: none !important;
      width: 100%;

      .post-img {
        height: 20vh !important;
      }

      .page-data {
        grid-row: none !important;
        grid-column: none !important;

        .el-image {
          height: 20vh !important;
        }
      }
    }
  }
}
</style>
