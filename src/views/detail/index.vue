<template>
  <loading v-if="loadingflag" />
  <div>
    <div class="fixed_div">
      <ve-progress :is="component"
                   :progress="progress"
                   color="#1859ce"
                   empty-color="transparent"
                   :thickness="10"
                   :empty-thickness="1"
                   lineMode="in 40"
                   :legend="false"
                   animation="default 1000 100"
                   fontSize="1em">
        <img style="width: 5em"
             :src="require(`@/assets/img/detail/${imgurl}`)" />
      </ve-progress>
      <div id="wrapper"
           v-if="balance"> {{balance}} $</div>

      <img class="icon_jump"
           v-show="bct_jump_show"
           :src="bct_jump_show?require('@/assets/img/detail/bct_jump.gif'):''"
           alt="img" />
    </div>

    <!-- blog area Start -->
    <div class="blog-details-area pd-top-30 pd-bottom-80">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-inner pb-4">
              <i class="fa fa-home fa-2"></i>
              <ul class="page-list">
                <li><a href="/"
                     style="font-size: 1.5em">Home</a></li>
                <li style="font-size: 1.5em">Details</li>
              </ul>
            </div>
            <div class="blog-details-wrap">
              <h3>{{ articleObj.title }}</h3>
              <p class="subtitle">{{ articleObj.subTitle }}</p>
              <div>
                <el-tag v-for="topic in articleObj.topicInfo"
                        :key="topic.id"
                        :color="topic.color"
                        style="margin-right:1em;border-color: transparent;"
                        effect="dark">
                  {{ topic.displayName }}
                </el-tag>
              </div>
              <div class="meta">
                <a href="#"
                   class="author">
                  <img src="@/assets/img/mine/headimg.png"
                       alt="img"
                       style="width: 2em"
                       onerror="this.src='@/assets/img/mine/headimg.png'" />
                  {{ articleObj.author }}
                </a>
                <el-button round
                           type="primary"
                           ref="followuser"
                           style="
                    padding: 9px 10px;
                    margin-right: 2em;"
                           @click="follow">Follow</el-button>
              </div>
              <div class="meta float-sm-right">
                <div class="date">
                  <i class="fa fa-clock-o"
                     style="color: #7c7577"></i>
                  {{ articleObj.createdAt}}
                </div>
              </div>
              <div class="meta float-sm-right">
                <div class="date">
                  <i class="fa fa-bookmark-o"
                     aria-hidden="true"
                     style="color: #7c7577"></i>
                  {{ articleObj.readTime}}
                </div>
              </div>
              <div class="row">
                <div v-if="articleObj.sourceUrl"
                     class="meta"
                     style="margin: -1em 0 3em 0;">source: {{articleObj.sourceUrl}}</div>
              </div>

              <div class="row">
                <div v-html="articleObj.cleanContent"
                     class="col-lg-12 dark-blog"></div>
              </div>
              <img class="share-shadow"
                   src="@/assets/img/detail/shadow.png" />
              <div class="blog-share-area">
                <ul class="social-area action">
                  <li>
                    <i class="fa fa-thumbs-vote fa-lg"
                       @click="vote">{{articleVoted?'Voted':'Vote'}}</i>
                  </li>
                  <li>
                    <i class="fa fa-thumbs-up fa-lg"
                       @click="like"></i>
                    {{ articleObj.like }}
                  </li>
                  <li>
                    <i class="fa fa-thumbs-down fa-lg"
                       @click="dislike"></i>
                    {{ articleObj.unlike }}
                  </li>
                </ul>
                <ul class="social-area share">
                  <!-- share -->
                  <div class="share-network-list">
                    <ShareNetwork v-for="network in networks"
                                  :network="network.network"
                                  :key="network.network"
                                  :style="{ backgroundColor: network.color }"
                                  :url="sharing.url"
                                  :title="sharing.title"
                                  :description="sharing.description"
                                  :quote="sharing.quote"
                                  :hashtags="sharing.hashtags"
                                  :twitterUser="sharing.twitterUser">
                      <i :class="network.icon"></i>
                    </ShareNetwork>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- blog area End -->
  </div>
</template>
<script>
import loading from "../components/loading.vue";
import { formatTime } from "@/utils/common_tools";
import { articleDetail, articleLike, articleDisLike } from "@/api/article.js";
import { getBalance, getReward } from "@/api/mine.js";
import { ElNotification } from "element-plus";
import { h } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import Interval from "@/utils/interval";
import TOKEN from "@/utils/token.js";
import CACHE from "@/utils/cache.js";
export default {
  name: "Detail",
  components: { loading },
  data () {
    return {
      loadingflag: true,
      articleObj: {},
      centerDialogVisible: false,
      bct_jump_show: false,
      balance: "",
      votenum: 1,
      min: 1,
      max: 100,
      loading: false,
      sec: 0,
      progress: 0,
      activate: false,
      imgurl: "bct_o.gif",
      sharing: {
        url: window.location,
        title: "Hey, I'm reading a great article at ReadON! .",
        description: "Join me to earn extra bonus！",
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "readon",
        twitterUser: "youyuxi",
      },
      articleVoted:false,
      networks: [
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
      ],
    };
  },
  watch: {
    activate (newVal, oldVal) {
      var that = this;
      if (newVal == true && oldVal == false) {
        Interval.run(that);
      }
    },
    async progress (newVal, oldVal) {
      var that = this;
      if (newVal === 100) {
        this.bct_jump_show = true;
        setTimeout(function () {
          that.bct_jump_show = false;
        }, 2200);
        Interval.stop(that);
        let res = await getReward();
        //console.log("reward res", res);
        if (res.data.code == 1) {
          this.imgurl = "bct_c.png";
          var mes = "there are no budget left";
          var options = {
            title: "Aha ~",
            message: h("i", { style: "color: teal;font-weight:700" }, mes),
            type: "success",
          };
          ElNotification(options);
        } else {
          this.imgurl = "bct_o.gif";
          Interval.run(this);
        }
        let res1 = await getBalance();
        if (res1.status == 200 && res1.data) {
          this.balance = res1.data.data
        }
      }
    },
  },
  async created () {
    if (TOKEN.checkLogin()) {
      if (!TOKEN.checkWallet()) {
        ElMessageBox.confirm(
          'Please connect wallet to get reward first. Go?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            draggable: true,
            customClass: 'msgbox',
            customStyle: "color:red"
          }
        ).then((action) => {
          if (action === 'confirm') {
            window.open("#/mine", "_blank");
          }
        })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'canceled',
            })
          })
      }
      let lastprogress = Number(CACHE.get("readingProgress"));
      if (lastprogress !== undefined || lastprogress != null) {
        this.progress = lastprogress;
      }
    } else {
      this.imgurl = "bct_c.png";
      this.$router.push("/login");
    }
    // get balance
    let res1 = await getBalance();
    if (res1.status == 200 && res1.data) {
      this.balance = res1.data.data
    }
    // 页面一打开就去加载文章详情。
    let res = await articleDetail({
      art_id: this.$route.params.art_id,
    });
    this.articleObj = res.data.data;
    this.articleObj.createdAt = formatTime(this.articleObj.createdAt)
    document.title = this.articleObj["title"] + " ｜ ReadON ";
    console.log(this.articleObj)
    this.loadingflag = false
  },
  computed: {
    component () {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    handleScroll () {
      this.activate = true;
    },
    runTimer () {
      if (this.sec === 60) {
        this.sec = 0;
        this.progress = (this.sec * 100) / 60;
        return;
      }
      this.sec += 2; //控制速度
      this.progress = (this.sec * 100) / 60;
    },
    //激活页面
    handleActivate () {
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
            ? "webkitHidden"
            : "mozHidden" in document
              ? "mozHidden"
              : null;
      if (!document[hiddenProperty]) {
        CACHE.set("readingProgress", this.progress);
        console.log("page unactivate ");
      } else {
        var lastprogress = Number(CACHE.get("readingProgress"));
        this.progress = lastprogress;
        console.log("page Activate ");
      }
    },
    follow () { },
    async vote () {
      //for test 
      // console.log(11)
      this.articleVoted = !this.articleVoted;
      return;
      if (TOKEN.checkLogin()) {
        let res = await articleLike({
          aid: this.articleObj.id,
        });
        if (res.data.code == 0) {
          //刷新文章喜欢数
          let res = await articleDetail({
            art_id: this.$route.params.art_id,
          });
          this.articleObj = res.data.data;
        }
      } else {
        this.$router.push("/login");
      }
    },
    async like () {
      if (TOKEN.checkLogin()) {
        let res = await articleLike({
          aid: this.articleObj.id,
        });
        if (res.data.code == 0) {
          //刷新文章喜欢数
          let res = await articleDetail({
            art_id: this.$route.params.art_id,
          });
          this.articleObj = res.data.data;
        }
      } else {
        this.$router.push("/login");
      }
    },
    async dislike () {
      if (TOKEN.checkLogin()) {
        let res = await articleDisLike({
          aid: this.articleObj.id,
        });
        if (res.data.code == 0) {
          //刷新文章喜欢数
          let res = await articleDetail({
            art_id: this.$route.params.art_id,
          });
          this.articleObj = res.data.data;
        }
      } else {
        this.$router.push("/login");
      }
    }
  },
  mounted () {
    if (TOKEN.checkLogin() && TOKEN.checkWallet()) {
      Interval.addTask(this.runTimer);
      var that = this;
      Interval.run(that);
    }
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("visibilitychange", this.handleActivate, true);
    window.addEventListener("beforeunload", () => {
      CACHE.set("readingProgress", this.progress);
    });
  },
  unmounted () {
    CACHE.set("readingProgress", this.progress);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("visibilitychange", this.handleScroll);
  },
};
</script>
<style scoped src="../../assets/css/dark/detail.css">
</style>