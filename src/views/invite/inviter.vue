<template>
  <div>
    <!--share-->
    <div class="section1">
      <h1 class="font_blue" style="text-align: center">
        Refer a friend and get Reward
      </h1>
      <h5>
        For every friend who uses your link to sign up a new account, you'll
        both get $100 READ. For each friend you invite, you will passively earn
        extra profit when your friend earns $READ.
      </h5>
      <div v-show="isShareShow">
        <h5>
          <span>Code: </span><span class="font_blue">{{ code }}</span>
        </h5>
        <h5>
          <span>Link: </span><span>{{ link }}</span>
        </h5>
        <el-button type="primary" class="share" @click="copy"
          >Share your link</el-button
        >
        <div class="flex">
          <div>
            <h1 class="h1_num">0</h1>
            <h5>Signed up</h5>
          </div>
          <div>
            <h1 class="h1_num">0</h1>
            <h5>Completed refereals</h5>
          </div>
        </div>
      </div>
    </div>

    <!--info-->
    <div style="background-color: #e9e9e9; margin: 2em 0">
      <div class="section2">
        <h1
          class="font_blue"
          style="background-color: #e9e9e9; text-align: center"
        >
          How do i earn rewards?
        </h1>
        <h3 class="font_blue">How do I earn $100 READ rewards?</h3>
        <h5>25% token back on registration completed.</h5>
        <h5>75% token back on wallet connection completed.</h5>
        <h3 class="font_blue">How do I earn extra profit?</h3>
        <h5>
          You will get an extra 20% profit when your invited friends get $READ.
          This does not affect your friend's income.
        </h5>
        <h5>
          More than that. If your friend invites a new user, You'll get an extra
          10% profit when your friend's friend reads.
        </h5>
        <h3 class="font_blue">
          Can I unlock achievements by inviting friends?
        </h3>
        <h5>
          Inviting friends is an important task line that is the ultimate
          qualification for the NFT bonus.
        </h5>
        <h3 class="font_blue">
          What if my friend forgets to fill in the invitation code when signs
          up?
        </h3>
        <h5>
          Don't worry, just remind him to fill in the invitation code in the
          personal center and then you will get the reward.
        </h5>
      </div>
    </div>
  </div>
</template> 
<script>
import { userInfo } from "@/api/mine.js";
import TOKEN from "@/utils/token.js";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      code: "",
      isDiaShow: false,
      isShareShow: false,
      domain: "",
      link: "",
    };
  },
  async created() {
    this.domain = window.location.host;
    //if login
    if (!TOKEN.checkLogin()) {
      this.$router.push("/login");
    }
    if (!TOKEN.checkWallet()) {
      this.isShareShow = false;
      this.isDiaShow = true;
    }
    let res = await userInfo();
    if (res.status == 200 && res.data) {
      this.userObj = res.data.data;
      this.code = this.userObj.inviteCode;
      this.isShareShow = true;
      this.isDiaShow = false;
      this.link = this.domain + "/#/register/" + this.code;
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    async copy() {
      try {
        const { toClipboard } = useClipboard();
        await toClipboard(this.link);
        ElMessage({
          message: "Congrats, Copied to clipboar.",
          type: "success",
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.section1,
.section2 {
  width: 60%;
  margin: 0 auto;
  padding: 2em 0;
}

.font_blue {
  color: #0a57cd;
}
.share {
  width: 100%;
  background-image: linear-gradient(to right, #6791f7, #3967d7);
  height: 2.5em;
  font-size: 2em;
  border-radius: 17px;
}
h5 {
  padding-bottom: 1em;
  color: white;
}
.section2 > h5 {
  color: black;
}
.h1_num {
  text-align: center;
  color: #0a57cd;
  font-size: 7em;
}
.flex {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 600px) {
  .section1,
  .section2 {
    width: 60%;
    width: 90%;
  }
  h1 {
    font-size: 40px;
  }
}
</style>