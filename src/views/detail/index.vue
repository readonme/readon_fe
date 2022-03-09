<template>
  <div v-loading="loading" element-loading-text="doing">
    <div class="fixed_div">
      <ve-progress
        :is="component"
        :progress="progress"
        color="#1859ce"
        empty-color="transparent"
        :thickness="10"
        :empty-thickness="1"
        lineMode="in 40"
        :legend="false"
        animation="default 1000 100"
        fontSize="1em"
      >
        <img
          style="width: 5em"
          :src="require(`@/assets/img/detail/${imgurl}`)"
        />
      </ve-progress>

      <img
        class="icon_jump"
        v-show="bct_jump_show"
        src="@/assets/img/detail/bct_jump.gif"
        alt="img"
      />
    </div>

    <!-- blog area Start -->
    <div class="blog-details-area pd-top-30 pd-bottom-80">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-inner pb-4">
              <i class="fa fa-home fa-2"></i>
              <ul class="page-list">
                <li><a href="/" style="font-size: 1.5em">Home</a></li>
                <li style="font-size: 1.5em">Details</li>
              </ul>
            </div>
            <div class="blog-details-wrap">
              <h3>{{ articleObj.title }}</h3>
              <p class="subtitle">{{ articleObj.subTitle }}</p>
              <div></div>
              <div class="meta">
                <a href="#" class="author">
                  <img
                    src="@/assets/img/mine/headimg.png"
                    alt="img"
                    style="width: 2em"
                    onerror="this.src='@/assets/img/mine/headimg.png'"
                  />
                  {{ articleObj.author }}
                </a>
                <el-button
                  round
                  type="primary"
                  ref="followuser"
                  style="
                    padding: 9px 10px;
                    margin-right: 2em;
                    background: rgba(1, 237, 255, 1);
                  "
                  @click="follow"
                  >Follow</el-button
                >
              </div>
              <div class="meta float-sm-right">
                <div class="date">
                  <i class="fa fa-clock-o" style="color: #7c7577"></i>
                  {{ articleObj.updatedAt }}
                </div>
              </div>
              <div class="row">
                <div
                  v-html="articleObj.cleanContent"
                  class="col-lg-12 dark-blog"
                ></div>
              </div>
              <img class="share-shadow" src="@/assets/img/detail/shadow.png" />
              <div class="blog-share-area">
                <ul class="social-area action">
                  <li>
                    <i class="fa fa-thumbs-up fa-lg" @click="like"></i>
                    {{ articleObj.like }}
                  </li>
                  <li>
                    <i class="fa fa-thumbs-down fa-lg" @click="dislike"></i>
                    {{ articleObj.unlike }}
                  </li>
                </ul>
                <ul class="social-area share">
                  <!-- share -->
                  <div class="share-network-list">
                    <ShareNetwork
                      v-for="network in networks"
                      :network="network.network"
                      :key="network.network"
                      :style="{ backgroundColor: network.color }"
                      :url="sharing.url"
                      :title="sharing.title"
                      :description="sharing.description"
                      :quote="sharing.quote"
                      :hashtags="sharing.hashtags"
                      :twitterUser="sharing.twitterUser"
                    >
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
import { articleDetail, articleLike, articleDisLike } from "@/api/article.js";
import { getReward } from "@/api/mine.js";
import { ElNotification } from "element-plus";
import { h } from "vue";

//import { Message } from 'element-ui';
import { ElLoading } from "element-plus";
import Interval from "@/utils/interval";
import TOKEN from "@/utils/token.js";
import CACHE from "@/utils/cache.js";
export default {
  name: "Detail",
  data() {
    return {
      articleObj: {},
      centerDialogVisible: false,
      bct_jump_show: false,
      balance: 0,
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
        hashtags: "vuejs,vite,javascript",
        twitterUser: "youyuxi",
      },
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
    activate(newVal, oldVal) {
      var that = this;
      if (newVal == true && oldVal == false) {
        Interval.run(that);
      }
    },
    async progress(newVal, oldVal) {
      var that = this;
      if (newVal === 100) {
        this.bct_jump_show = true;
        setTimeout(function () {
          that.bct_jump_show = false;
        }, 500);

        var mesopt = {
          message: "To get reward,please wait a memont......",
        };
        //Message(mesopt)
        Interval.stop(that);
        let res = await getReward();
        console.log(res);
        if (res.code == 1) {
          this.imgurl = "bct_c.png";
          var mes = "there are no rewards left";
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
      }
    },
  },
  async created() {
    //获取当前进度
    if (TOKEN.checkLogin()) {
      let lastprogress = Number(CACHE.get("readingProgress"));
      if (!TOKEN.checkWallet()) {
        var mes = "Please connect wallet to get reward first";
        var options = {
          title: "Aha ~",
          message: h("i", { style: "color: teal;font-weight:700" }, mes),
          type: "success",
        };
        ElNotification(options);
      }
      if (lastprogress !== undefined || lastprogress != null) {
        this.progress = lastprogress;
      }
    } else {
      this.imgurl = "bct_c.png";
      this.$router.push("/login");
    }
    // 页面一打开就去加载文章详情。
    let res = await articleDetail({
      art_id: this.$route.params.art_id,
    });
    this.articleObj = res.data.data;
    document.title = this.articleObj["title"] + " ｜ ReadON ";
    //console.log("************", this.articleObj);
  },
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    handleScroll() {
      this.activate = true;
    },
    runTimer() {
      if (this.sec === 60) {
        this.sec = 0;
        this.progress = (this.sec * 100) / 60;
        return;
      }
      this.sec += 2; //控制速度
      this.progress = (this.sec * 100) / 60;
    },
    //激活页面
    handleActivate() {
      // 监听页面是否是激活状态
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
        console.log("页面非激活");
      } else {
        var lastprogress = Number(CACHE.get("readingProgress"));
        this.progress = lastprogress;
        console.log("页面激活");
      }
    },
    follow() {},
    async like() {
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
    async dislike() {
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
    },
    async vote() {
      // 获取余额
      //if (this.$checkLogin() && this.$checkWallet()) {
      if (true) {
        let ba = TOKEN.getWallet();
        let bal_res = await userBanllance({ wallet_id: ba });
        if (bal_res.data && bal_res.data.code == 0) {
          this.balance = bal_res.data.data["ballance"];
          this.max = parseInt(this.balance);
        }
        this.centerDialogVisible = true;
      } else {
        this.$router.push("/login");
      }
    },
    async submitTran() {
      var mywallet = TOKEN.getWallet();
      var ammount = this.votenum;
      console.log("当前值", this.votenum);
      //if (this.$checkLogin()) {
      if (true) {
        this.centerDialogVisible = false;
        let loadingInstance = Loading.service({ fullscreen: true });
        let res = await userTransfer({
          wallet_id: mywallet,
          stake_ammount: ammount,
        });
        console.log(res);
        loadingInstance.close();
        //const h = this.$createElement;
        var mes = "Transfer submit seccuss";
        var options = {
          title: "Aha ~",
          message: h("i", { style: "color: teal;font-weight:700" }, mes),
          type: "success",
        };
        //ElNotification(options);
        var params = { aid: this.articleObj.id, stake: ammount };
        let backres = await userTransferToBack(params);
        console.log(backres);
      }
    },
  },
  mounted() {
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
  unmounted() {
    CACHE.set("readingProgress", this.progress);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("visibilitychange", this.handleScroll);
  },
};
</script>
<style scoped src="../../assets/css/dark/detail.css">
</style>