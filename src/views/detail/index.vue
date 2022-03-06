<template>
  <div v-loading="loading"
       element-loading-text="doing">
    <div class="fixed_div">
      <ve-progress :is="component"
                   :progress="progress"
                   color="#f9a402"
                   empty-color="transparent"
                   :thickness="10"
                   :empty-thickness="1"
                   lineMode="in 50"
                   :legend="false"
                   animation="default 1000 100"
                   fontSize="1em">
        <img style="width:5em"
             :src="require(`@/assets/img/${imgurl}`)" />
      </ve-progress>

      <img class="icon_jump"
           v-show="bct_jump_show"
           src="@/assets/img/bct_jump.gif"
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
              <p class="subtitle">{{ articleObj.sub_title }}</p>
              <div></div>
              <div class="meta">
                <a href="#"
                   class="author">
                  <img :src="articleObj.author_head"
                       alt="img"
                       style="width: 2em" />
                  {{ articleObj.author }}
                </a>
                <el-button round
                           type="primary"
                           ref="followuser"
                           style="padding: 9px 10px; margin-right: 2em"
                           @click="follow">Follow</el-button>
              </div>
              <div class="meta float-sm-right">
                <div class="date">
                  <i class="fa fa-clock-o"
                     style="color: #7c7577"></i>
                  {{ articleObj.created_at }}
                </div>
              </div>
              <div class="row">
                <div v-html="articleObj.content"
                     class="col-lg-12"></div>
              </div>
              <div class="blog-share-area">
                <ul class="social-area action">
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
                  <li @click="vote">
                    <img src="@/assets/img/vote.png"
                         alt="img"
                         style="width: 1.5em" />
                    <el-button round
                               type="primary"
                               @click="vote"
                               class="votebutton">vote</el-button>
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
              <el-dialog title="VOTE"
                         v-model:visible="centerDialogVisible"
                         width="30%"
                         center
                         :destroy-on-close="true"
                         class="votedialog">
                <h6 style="text-align: center">How many BAT to stake?</h6>
                <div style="margin-top: 3em">
                  <vue-slider v-model="votenum"
                              :tooltip="'always'"
                              :max="max"
                              :min="min" />
                </div>
                <h6 style="text-align: center; margin-top: 1.2em; color: #409eff">
                  Avaliable: {{ balance }}
                </h6>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary"
                             @click="submitTran">确 定</el-button>
                </span>
              </el-dialog>
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
  data () {
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
        title:
          "Hey, I'm reading a great article at ReadON! .",
        description:
          "Join me to earn extra bonus！",
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
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
      ]
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
        }, 1000);

        var mesopt = {
          message: "To get reward,please wait a memont......",
        };
        //Message(mesopt)
        Interval.stop(that);
        let res = await getReward();
        console.log(res);
        if (res.msg == "InsufficientPersonalBudget") {
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
  async created () {
    //获取当前进度
    if (TOKEN.checkLogin()) {
      let lastprogress = Number(CACHE.get("readingProgress"));
      if (!TOKEN.checkWallet()) {
        var mes = "Please connect wallet first";
        var options = {
          title: "Aha ~",
          message: h("i", { style: "color: teal;font-weight:700" }, mes),
          type: "success",
        };
        ElNotification(options);
        //return
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
    console.log(this.articleObj);
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
    follow () { },
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
    },
    async vote () {
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
    async submitTran () {
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
<style scoped>
.blog-share-area {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  border: none !important;
}
.social-area {
  display: inline-block;
}
.action {
  float: left;
}

.action li {
  margin-right: 2em !important;
}

.el-dialog__header {
  background-color: #409eff;
  font-weight: bold;
}
/deep/.ep-legend--value {
  height: auto !important;
}
.votebutton {
  margin-left: 0.5em !important;
  vertical-align: middle !important;
  padding: 5px 7px !important;
}

.votedialog .el-dialog {
  border: 1px solid #94c1e7;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  box-shadow: darkgrey 1px 1px 2px 2px;
}
.ep-content {
  width: 3em;
}
.fixed_div {
  position: fixed;
  z-index: 10;
  right: -2em;
  bottom: 0;
}

.icon_jump {
  width: 3em;
  position: fixed;
  z-index: 15;
  right: 2.5em;
  bottom: 8em;
}

.meta .date i {
  color: #7c7577;
}

@media only screen and (max-width: 700px) {
  .share {
    margin: 20px 0 !important;
    padding: 0;
  }
  .share li:first {
    padding-left: 0;
  }
  .share li {
    margin-right: 10px;
  }
  .blog-details-area {
    padding-bottom: 0;
  }
}

.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^="share-network-"] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>