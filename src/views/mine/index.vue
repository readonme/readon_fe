<template>
  <div class="pd-top-50 pd-bottom-50 main">
    <!-- myheader -->
    <div class="header">
      <img src="@/assets/img/mine/headimg.png"
           border="2"
           class="myheadimg" />
      <p class="myname">{{ userObj.name }}</p>
      <Wallet />

      <div class="mybal box"
           v-show="showBal">
        <el-row>
          <el-col :span="8">
            <div class="">
              <p>1000</p>
              <p>$READ</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <p>700</p>
              <p>Staked</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <p>300</p>
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
          <a href="#/inviter">
            <img src="@/assets/img/mine/1.png"
                 class="oprimg" />
            <p>Invite friends</p>
          </a>
        </el-col>
        <el-col :span="8">
          <div>
            <img src="@/assets/img/mine/2.png"
                 class="oprimg" />
            <p>My Earning</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <img src="@/assets/img/mine/3.png"
                 class="oprimg" />
            <p>Achievements</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- nft -->
    <div class="box">
      <div class="box-header">
        <span class="task-head">Nucleus</span><span class="view-more">View More</span>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft1.png"
                 class="nftimg" />
            <p>Fission</p>
            <p>#1001</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft2.png"
                 class="nftimg" />
            <p>Fission</p>
            <p>#1001</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft3.png"
                 class="nftimg" />
            <p>Fission</p>
            <p>#1001</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft4.png"
                 class="nftimg" />
            <p>Fission</p>
            <p>#1001</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="nftbox">
            <img src="@/assets/img/mine/nft5.png"
                 class="nftimg" />
            <p>Fission</p>
            <p>#1001</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- task -->
    <div class="box">
      <div class="box-header"><span class="task-head">Earn Points</span></div>
      <el-row>
        <el-col :span="20"
                class="task-cont">
          <p class="task-cont-h1">
            Enter refreeal code
          </p>
          <p>Enter referral code to get 100 Points!</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">ENTER</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"
                class="task-cont">
          <p class="task-cont-h1">
            Reading
          </p>
          <p>Read more to get more points!</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">0/50</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"
                class="task-cont">
          <p class="task-cont-h1">
            Watch videos
          </p>
          <p>Watch more to get more points!</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">GO</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20"
                class="task-cont">
          <p class="task-cont-h1">
            Connect Facebook
          </p>
          <p>Connect your Facebook account</p>
        </el-col>
        <el-col :span="4">
          <p class="tip">+100</p>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script> 

import { userInfo, bindWallet } from "@/api/mine.js";
import Wallet from "../components/wallet.vue";
import TOKEN from "@/utils/token.js";
export default {
  name: "Mine",
  components: { Wallet },
  data () {
    return {
      userObj: { name: "James" },
      showBal: false
    };
  },
  mounted () {
    this.connectwallet();

  },
  async created () {
    if (!TOKEN.checkLogin()) {
      this.$router.push("/login");
    }
    let res = await userInfo();
    if (res.status == 200 && res.data) {
      this.userObj = res.data.data;
    }
  },
  methods: {
    connectwallet () {
      let _this = this;
      _this.timer = setInterval(async function () {
        var addr = document.getElementsByClassName("swv-button")[0].getAttribute("title")
        console.log(addr)
        if (addr !== null && addr.length > 16) {
          console.log(addr)
          var data = { "principal": addr, "type": "SOL" }
          var res = await bindWallet(data)
          console.log(res)
          if (res.status == 200) {
            TOKEN.setWallet(addr)
            _this.showBal = true;
            clearInterval(_this.timer);// 满足条件时 停止计时
          }
        }
      }, 1000)
    }

  }
};
</script>

<style scoped>
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
.myheadimg {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  background-color: #bebebe;
  padding: 0.5em;
  border: none;
}
.myname {
  margin: 0.5em auto;
}
.mybal {
  margin: 0 auto;
  text-align: center;
  margin-top: 1em;
  background: rgba(42, 42, 42, 0.45) !important;
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
  background-color: white;
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
  height: 55%;
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
}

@media only screen and (max-width: 600px) {
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
    padding: 0.2em 0;
    width: 16%;
  }
}
</style>