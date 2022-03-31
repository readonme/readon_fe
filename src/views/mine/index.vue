<template>
  <div class="pd-top-50 pd-bottom-50 main">
    <!-- Avatars -->
    <el-dialog
      v-model="showAvaBox"
      title="choose one avatar you like"
      draggable
    >
      <el-row>
        <el-col :span="4" v-for="item in avatars">
          <img
            v-lazy="item.url"
            class="avatarimg"
            @click="submitAvatar(item.id, item.url)"
          />
        </el-col>
      </el-row>
    </el-dialog>
    <!-- myheader -->
    <div class="header">
      <div
        style="position: relative; width: 7em; height: 7em; margin: 0 auto"
        @click="selectAvatars"
      >
        <img v-lazy="userObj.headimgurl" border="2" class="myheadimg" /><i
          class="editicon fa fa-pencil-square-o"
          aria-hidden="true"
        ></i>
      </div>
      <p class="myname">
        <span contenteditable="false" id="nickname" :class="{'editnamespan':editAicon}"  @blur="editName()">{{
          userObj.name
        }}</span>
        <i
          class="fa fa-pencil"
          style="margin-left: 0.5em"
          aria-hidden="true"
          @click="enableEdit()"
        ></i>
      </p>
      <Wallet />
      <div class="mybal box" v-show="showBal">
        <el-row>
          <el-col :span="8">
            <div class="">
              <p>{{ balance }}</p>
              <p>$READ</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <p>{{ staked }}</p>
              <p>Staked</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <p>{{ balance }}</p>
              <p>Available</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- my opr -->
    <div class="box">
      <el-row>
        <el-col :span="8">
          <a href="#/inviter" target="_blank">
            <img src="@/assets/img/mine/1.png" class="oprimg" />
            <p>Invite friends</p>
          </a>
        </el-col>
        <el-col :span="8">
           <a href="#/earnings" target="_blank">
            <img src="@/assets/img/mine/2.png" class="oprimg" />
            <p>My Earning</p>
          </a>
        </el-col>
        <el-col :span="8">
          <a href="#/achievement" target="_blank">
            <img src="@/assets/img/mine/3.png" class="oprimg" />
            <p>Achievements</p>
          </a>
        </el-col>
      </el-row>
    </div>

    <!-- nft -->
    <div class="box">
      <p style="padding:1em">You do not have Nucleus yet, unlock the achievement to mint Now.&nbsp;<a href="#/achievement" target="_blank"><i class="fa fa-hand-o-right" aria-hidden="true"></i> </a></p>
      <p style="padding:1em">You can also buy Nucleus in the marketplace.&nbsp;<a href="http://market.readon.me/" target="_blank"><i class="fa fa-hand-o-right" aria-hidden="true"></i></a> </p>
    </div>
    <!--<div class="box">
      <div class="box-header">
        <span class="task-head">Nucleus</span
        ><span class="view-more">View More</span>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft2.png" class="nftimg" />
            <p>FISSION</p>
            <p>#10003</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft3.png" class="nftimg" />
            <p>FISSION</p>
            <p>#10012</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft4.png" class="nftimg" />
            <p>STEAM</p>
            <p>#20031</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft5.png" class="nftimg" />
            <p>BUZZ</p>
            <p>#30041</p>
          </div>
        </el-col>
      </el-row>
    </div>-->

    <!-- task -->
    <div class="box">
      <div class="box-header"><span class="task-head">Earn $Read</span></div>
      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">Take Your Wallet</p>
          <p>Connect your wallet, or create a new one to earn income</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">+50</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">Start Reading To Earn</p>
          <p>Read an article and get your first earnings!</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">0/1</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">See What Cryptocurrency Is</p>
          <p>Read three pieces of content related to cryptocurrency</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">1/3</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">Read Some Words Quietly</p>
          <p>Read a total of fifteen minutes of content</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">3/15</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">Share With Your Friends</p>
          <p>
            Find a piece of content you like and share it with three friends
          </p>
        </el-col>
        <el-col :span="4">
          <p class="tip">0/3</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="19" class="task-cont">
          <p class="task-cont-h1">Build A Reading Team</p>
          <p>Invite a friend to join ReadON and read together</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">0/1</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  userInfo,
  bindWallet,
  changeName,
  allAvatars,
  changeAvatar,
  getBalance,
} from "@/api/mine.js";
import Wallet from "../components/wallet.vue";
import TOKEN from "@/utils/token.js";
export default {
  name: "Mine",
  components: { Wallet },
  data() {
    return {
      userObj: {},
      showBal: false,
      originWallet: "",
      avatars: [],
      showAvaBox: false,
      isConnectWallet: false,
      balance: 0,
      staked: 300,
      editAicon: false,
    };
  },
  mounted() {
    this.connectwallet();
  },
  async created() {
    if (!TOKEN.checkLogin()) {
      this.$router.push("/login");
    }
    let res = await userInfo(); 
    if (res.status == 200 && res.data) {
      this.userObj = res.data.data;
      var principal = this.userObj.principal;
      if (principal.length > 16) {
        this.originWallet = principal;
        var length = this.originWallet.length;
        this.showBal = true;
        this.isConnectWallet = true; 
        TOKEN.setWallet(principal)
        var node = document.getElementsByClassName("swv-button")[0] || document.getElementsByClassName("swv-button")[0].children[1]
        node.innerHTML =
          this.originWallet.substring(0, 4) +
          ".." +
          this.originWallet.substring(length - 4, length);
      }
    }
    let res1 = await getBalance();
    if (res1.status == 200 && res1.data) {
      this.balance = res1.data.data;
      console.log(res1.data.data);
    }
  },
  methods: {
    async selectAvatars() {
      let res = await allAvatars();
      this.avatars = res.data.data;
      this.showAvaBox = true;
    },
    async submitAvatar(id, url) {
      console.log(id, url);
      this.userObj.headimgurl = url;
      changeAvatar({ avatar_id: id });
      this.showAvaBox = false;
    },
    enableEdit() {
      var node = document.getElementById("nickname")
      node.setAttribute("contenteditable", true);
      this.editAicon = true;
    },
    async editName() {
      var newName = document.getElementById("nickname"); 
      document
        .getElementById("nickname")
        .setAttribute("contenteditable", false);
         this.editAicon = false;
      await changeName({ name: newName.innerHTML });
      
    },
    connectwallet() {
      let _this = this;
      _this.timer = setInterval(async function () {
        var node = document.getElementsByClassName("swv-button")[0] || document.getElementsByClassName("swv-button")[0].children[1]
        var addr = node
          .getAttribute("title");
        if (addr !== null && addr.length > 16 && addr !== this.originWallet) {
          var data = { principal: addr, type: "SOL" };
          var res = await bindWallet(data);
          if (res.status == 200) {
            TOKEN.setWallet(addr);
            _this.showBal = true;
            this.originWallet = addr;
            //clearInterval(_this.timer); 
          }
        }
      }, 2000);
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  background: url("../../assets/img/mine/bg.png");
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
}
.main > div {
  width: 80%;
  margin: 3em auto;
  text-align: center;
}

p {
  font-size: 2em;
  color: white;
  margin-bottom: 0;
  font-weight: 500;
}
img {
  margin: 0 auto;
  text-align: center;
}
.editicon {
  display: none;
  margin: -2.5em 1.5em;
  position: absolute;
  font-size: 2em;
}
.myheadimg {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  background-color: #bebebe;
  padding: 0.5em;
  border: none;
  cursor: pointer;
  &:hover ~ .editicon {
    display: block;
  }
}
.myname {
  margin: 0.5em auto;
}
.editnamespan{
border: 1px solid #e5e9f7;
    padding: 0 1em;
    border-radius: 0.4em;
}


.mybal {
  margin: 0 auto;
  text-align: center;
  margin-top: 1em;
  background: rgba(42, 42, 42, 0.45) !important;
}
.avatarsbox {
  width: 50% !important;
  position: absolute;
  margin: 0 25% !important;
  text-align: center;
  z-index: 1000;
  background-color: white;
  padding: 1em;
  border-radius: 1em;
}
.avatarimg {
  width: 100%;
  border-radius: 1em;
  padding: 0.3em;
}
.box {
  background: rgb(39, 42, 52);
  border-radius: 1em;
}
.box-header {
  background: rgb(68, 73, 88);
  border-radius: 1em;
  padding-left: 0.2em;
  text-align: left;
}
/deep/ .box > .el-row {
  margin-top: 1em;
  margin-bottom: 1em;
}
.oprimg {
  margin-top: 1em;
  max-width: 20%;
}

.nftbox {
  background-color: rgba(82, 85, 99, 1);
  margin: 3em;
  border-radius: 1em;
}
.nftimg {
  width: 100%;
  border-radius: 1em;
  padding: 1em;
}

.tip {
  background: rgb(70, 100, 241);
  border-radius: 1em;
  padding: 0.2em;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14%;
  height: 2em;
  margin: auto;
}

.task-head {
  font-size: 3em;
  padding-left: 0.6em;
  font-weight: 900;
}
.task-cont {
  text-align: left;
  padding-left: 2em;
}
.task-cont-h1 {
  color: rgb(70, 100, 241);
  font-size: 2.5em;
}
.view-more {
  float: right;
  margin-right: 1em;
  border: 1px solid #000;
  border-radius: 1em;
  font-size: 1.5em;
  background-color: white;
  color: #000;
  margin-top: 0.6em;
  padding: 0.2em;
  text-align: center;
  box-shadow: 2px 3px 5px #000;
}

/deep/ .swv-dropdown {
  width: 100%;
}
/deep/ .swv-dropdown-list {
  right: 41%;
}

/deep/ .swv-button-trigger {
  border: 1px solid #fff;
  border-radius: 1em;
  width: 40%;
  margin: 0 auto;
  padding: 0 1em;
}

/deep/ .swv-button {
  border: 1px solid #fff;
  border-radius: 1em;
  width: 40%;
  margin: 0 auto;
  padding: 0 1em;
}

/deep/ .swv-button > p {
  font-size: 1.5em;
  font-weight: 600;
  color: white;
  text-align: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0px;
}

@media only screen and (max-width: 900px) {
  .main {
    padding-top: 10px;
  }
  .main > div {
    width: 98%;
    margin: 1.5em auto;
    text-align: center;
  }

  p {
    font-size: 1em;
    color: white;
    margin-bottom: 0;
    font-weight: 500;
  }

  /deep/ .swv-dropdown {
    width: 100%;
  }
  /deep/ .swv-dropdown-list {
    right: 30%;
  }

  /deep/ .swv-button-trigger {
    border: 1px solid #fff;
    border-radius: 1em;
    width: 60%;
    margin: 0 auto;
    padding: 0 1em;
  }

  /deep/ .swv-button {
    border: 1px solid #fff;
    border-radius: 1em;
    width: 60%;
    margin: 0 auto;
    padding: 0 1em;
  }

  /deep/ .swv-button > p {
    font-size: 1 em;
    font-weight: 600;
    color: white;
    text-align: center;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .nftbox {
    margin: 5px;
  }
  .nftimg {
    padding: 4px;
  }
  .task-head {
    font-size: 2em;
  }
  .view-more {
    font-size: 1em;
  }

  .task-cont {
    padding-left: 0.5em;
  }

  .task-cont-h1 {
    font-size: 1.5em;
  }
  .tip {
    border-radius: 0.5em;
    width: 16%;
    height: 3em;
    line-height: 3em;
  }
}
</style>
