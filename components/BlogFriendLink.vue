<template>
  <div id="content" class="site-content">
    <article
      class="post-item post-301 page type-page status-publish has-post-thumbnail hentry"
    >
      <p>欢迎交换友链 (ˊᗜˋ)</p>
      <p>
        请留言告诉我你的：<br />
        1、名字 <br />
        2、一句话介绍（熟人我会亲自帮写的） <br />
        3、主页地址 <br />
        4、头像（HTTPS*，可在评论区上传）
      </p>
      <p>
        For Example：<br />
        ★ Name: JarryChen<br />
        ★ Bio: 暂无<br />
        ★ URL: https://jarrychen.cn<br />
        ★ Avatar:
        <a
          href="https://cdn.jsdelivr.net/gh/xbclub/CDN/wp-content/uploads/2020/01/4311c9ad04554119.png"
          target="_blank"
          rel="external nofollow"
        >
          获取嵌入代码</a
        >
      </p>
      <p style="font-size: 13px">
        ※
        为保证友链质量，今后新申请的友链将经过筛选，请在收到我的回复邮件后再于贵站添加本站链接。原则上过去已添加友链不会轻易删除，如遇死链、改变网站用途（友链主要针对的是同类的博客），将单独移至“阵亡将士”分类中，下次清理时未整改的将移除；如遇盗版、破解、网页植入挖矿脚本、极低质量内容、单方面移除本站链接，将直接移除，恕不另行通知。
      </p>
      <div class="links" v-if="page.links">
        <div v-for="(group, index) in page.links" :key="index">
          <h3 class="link-title">
            <span class="fake-title">{{ index + 1 }}. {{ group.group }}</span>
          </h3>
          <div class="link-description" v-if="group.desc">{{ group.desc }}</div>
          <ul class="link-items fontSmooth">
            <li class="link-item" v-for="item in group.items" :key="item.name">
              <a
                class="link-item-inner effect-apollo"
                :href="item.url"
                :title="item.desc"
                target="_blank"
                rel="friend nofollow"
              >
                <img class="lazyload" :src="item.img" alt="头像" />
                <span class="sitename">{{ item.name }}</span>
                <div class="linkdes">{{ item.desc }}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "BlogFriendLink",
  computed: {
    page() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="stylus">
#content {
  animation: main 1s;
  position: relative;
}

.site-content {
  &:before, &:after {
    content: '';
    display: table;
    table-layout: fixed;
  }

  &:after {
    clear: both;
  }

  .hentry {
    margin: 0 0 1.5rem;

    .links {
      margin-bottom: 50px;

      .link-title {
        font-weight: 400;
        color: #6d6d6d;
        padding-left: 0;
        border-left: 0;
        margin: 50px 0 20px;

        .fake-title {
          padding-left: 10px;
          border-left: 3px solid orange;
        }
      }

      ul {
        margin: 0;
        list-style: none;
        padding: 0;
        width: 100%;
        display: inline-block;

        li {
          .link-item-inner {
            text-decoration: none;
          }

          &:hover {
            .linkdes {
              border-top: 1px dashed #fff;
            }

            &:before {
              width: 180%;
            }

            color: #27323a;
            border: 1px solid orange;
          }

          &:before {
            content: '';
            background-color: orange;
            -webkit-transform: skew(45deg, 0);
            transform: skew(45deg, 0);
            width: 0;
            height: 100%;
            position: absolute;
            top: 0;
            left: -60px;
            z-index: -1;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
          }

          width: 32%;
          float: left;
          border: 1px solid #ececec;
          padding: 10px 30px;
          margin: 4px 4px;
          position: relative;
          overflow: hidden;
          -webkit-transition: all 0.3s;
          transition: all 0.3s;
          border-radius: 10px;

          .sitename {
            color: orange;
            padding-bottom: 10px;
            display: block;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
          }

          .linkdes {
            color: #949494;
            font-size: 13px;
            padding: 10px 0;
            border-top: 1px dashed #ddd;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 25px;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
          }

          &:hover {
            img {
              transform: rotate(360deg);
              -webkit-transform: rotate(360deg);
              -moz-transform: rotate(360deg);
              -o-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
            }
          }

          img {
            float: right;
            box-shadow: inset 0 0 10px #000;
            padding: 5px;
            opacity: 1;
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transition: all ease 1s;
            -webkit-transition: all ease 1s;
            -moz-transition: all ease 1s;
            -o-transition: all ease 1s;
            margin-top: 5px;
            width: 65px;
            height: 65px;
            padding: 2px;
            border-radius: 100%;
          }
        }
      }
    }
  }

  max-width: $contentWidth;
  padding: 0 10px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
}

@media (max-width: $MQMobile) {
  .site-content {
    li {
      width: 70%;
    }
  }
}

@keyframes main {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
