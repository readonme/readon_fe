<template>
  <div>
    <div class="top-story-area pd-top-50 pd-bottom-30">
      <div class="container">
        <div class="section-title">
          <div class="row">
            <div class="col-sm-8">
              <h4 class="title">Top Voted Stories</h4>
            </div>
            <div class="col-sm-4 text-sm-right align-self-center">
              <a class="see-all-btn float-sm-end dark-see-all-btn"
                 href="#">View all</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6"
               v-for="item in toparticles">
            <div class="single-post-wrap">
              <div class="thumb">
                <img :src="item.coverImg"
                     alt="img"
                     class="voteimg" />
                <a class="tag top-right tag-sky top_title"
                   href="#">{{
                  item.cate.title
                }}</a>
              </div>
              <div class="post-details">
                <div class="meta">
                  <div class="date">
                    <i class="fa fa-clock-o"></i>
                    {{ item.createdAt }}
                  </div>
                </div>
                <h6 class="top_title">
                  <a :href="'#/detail/' + item.id"
                     target="_blank">{{
                    item.title
                  }}</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- news-area Start -->
    <div class="pd-top-50 pd-bottom-30"
         id="articlesFeed">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title">
              <h4 class="title">Stories</h4>
            </div>
            <div v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="5"
                 class="list">
              <div class="media-post-wrap-2 media dark-media"
                   v-for="item in articles">
                <div class="thumb"
                     style="
                    width: 20em;
                    align-self: center;
                    justify-content: center;
                  ">
                  <img :src="item.coverImg"
                       alt="img"
                       style="max-height: 11em;" />
                </div>
                <div class="media-body"
                     style="margin-top: 2px">
                  <div class="meta d-block mt-3">
                    <div class="date">
                      <i class="fa fa-clock-o"></i>
                      {{ item.createdAt }}
                      <i class="fa author"></i>
                      {{ item.author }}
                    </div>
                  </div>
                  <a :href="'#/detail/' + item.id"
                     target="_blank">
                    <h6 class="story_title">{{ item.title }}</h6>
                    <p class="story_content">{{ item.short_content }}</p>
                  </a>
                  <div class="news_botton">
                    <a class="tag tag-red"
                       href="#">{{ item.cate.title }} </a>
                  </div>
                </div>
              </div>
              <div class="btn-wrap mt-5 mb-5 text-center">
                <a class="btn btn-main"
                   style="color: rgba(1, 237, 255, 1);">{{ loadMsg }}</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="section-title">
              <h4 class="title">Categories</h4>
            </div>
            <ul class="widget widget-categories">
              <li v-for="item in cateObjList">
                <div class="thumb"><img :src="item.memo.img"
                       alt="img" /></div>
                <a :href="'#/category/' + item.id"
                   target="_blank">
                  {{item.title}}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- news-area End -->
  </div>
</template>
<script> 
import { cateList, articleList, articleTopVoteList } from "@/api/article.js";

export default {
  name: "Home",
  components: {
  },
  async created () {
    var params = { "page": 1 }
    this.cid = this.$route.params.cid
    if (this.cid == undefined) {
      console.log('cid is null')
    } else {
      params["cid"] = this.cid
    }

    let cateRes = await cateList();
    this.cateObjList = cateRes.data.data;
    let articleRes = await articleTopVoteList(params);
    this.toparticles = articleRes.data.data.slice(0, 4);
    //console.log("this.toparticles", articleRes)
    let articleRes2 = await articleList(params);
    //this.articles = articleRes2.data.data;
  },
  data () {
    return {
      toparticles: [],
      articles: [],
      cateObjList: [],
      loading: false,
      page: 1,
      loadMsg: "Load More",
    };
  },

  methods: {
    loadMore () {
      this.requestData();
    },
    async requestData () {
      try {
        console.log("load more", this.page);
        this.loading = true;
        let articleRes2 = await articleList({ "page": this.page, "cid": this.cid });
        if (articleRes2.data && articleRes2.data.code == 0) {
          let tmp = articleRes2.data.data.items;
          this.articles = this.articles.concat(tmp);
          this.page += 1;
          if (tmp.length < 10) {
            this.loading = true;
            this.loadMsg = "No Articles";
          } else {
            this.loading = false;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  },
};
</script> 
<style scoped src="../../assets/css/dark/home.css">
</style>
 