<template>
  <div class="loginbody pd-top-50 pd-bottom-50">
    <!--input email and pass-->
    <div class="login"
         v-show="registertip">
      <div class="login-wrap">
        <h1>Register</h1>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item prop="email">
            <el-input v-model.number="ruleForm.email"
                      class="forminput"
                      placeholder="Email Address"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="ruleForm.password"
                      autocomplete="off"
                      placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password"
                      v-model="ruleForm.checkPass"
                      autocomplete="off"
                      placeholder="Confirm Password"></el-input>  
          </el-form-item>
          <p style="font-size: 0.5em;text-align: left;color: #f48080;">*ReadON is not fully open yet, please get an early bird access in our community</p>

          <el-form-item prop="checkCode">
            <el-input class="forminput"
                      v-model="ruleForm.invitation"
                      placeholder="Invite Code"></el-input> 
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary"
                       @click="signup()">Sign up</el-button>
          </el-form-item>
        </el-form>

        <div class="toRegister">
          <span>Already a member？</span>
          <router-link to="/login"><span style="color: rgba(58, 103, 215, 1)">Login in</span></router-link>
        </div>
      </div>
    </div>

    <!-- success-->
    <div class="login"
         v-show="successtip">
      <div class="login-wrap">
        <img src="@/assets/img/login/done.png" />
        <h1 style="color: #ff9a27">Success</h1>
        <div class="btns">
          <router-link to="/">
            <el-button type="primary">HOME</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template> 

<script >
import { ElNotification } from 'element-plus'
import { h } from 'vue'
import TOKEN from "@/utils/token.js";
import { createHash } from "@/utils/common_tools.js";
import { register } from "@/api/login";
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input password again"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("The two passwords you entered were inconsistent!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        email: "",
        invitation: ""
      },

      codetip: false,
      successtip: false,
      registertip: true,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        checkCode: [{
          required: true,
          message: "Invitation code is required for the beta phase",
          trigger: ["blur", "change"]
        }],
        email: [
          {
            required: true,
            message: "please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created () {  
    this.ruleForm.invitation = this.$route.params.invitecode
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    async signup () {
      let datas = this.ruleForm;
      datas["name"] = "u_" + createHash(8)
      console.log(datas)
      let res = await register(datas);
      console.log(res)
      if (res.status == 200 && res.data) {
        if (res.data.code == 200 && res.data.token) {
          TOKEN.setToken(TOKEN.VUE_APP_TOKEN_NAME, res.data.token);
          this.registertip = false;
          this.successtip = true;
        } else {
          var mes = res.data.message;
          var options = {
            title: "emmm ~",
            message: h("i", { style: "color: teal;font-weight:700" }, mes),
            duration: 2000
          };
          ElNotification(options);
        }
      }
    }
  }
}
</script>

<style  scoped>
.loginbody {
}
.logoimg {
  width: 40%;
  padding-bottom: 1em;
  margin: 0 auto;
}
.btns {
  margin-bottom: 1em;
  margin-top: 4em;
}

.toRegister {
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  color: rgba(158, 158, 158, 1);
}

.login-wrap {
  text-align: center;
}
.forminput {
  width: 100%;
  margin: 0 auto;
  outline: none;
  font-weight: bold;
}

/deep/.el-input__inner {
  height: 4em;
  font-weight: 800;
  border-radius: 10px;
  height: 4em;
}

.login {
  width: 50%;
  padding: 3em;
  margin: auto;
  margin-top: 2em;
  text-align: center;
  box-shadow: #d5d4d4 1px 1px 2px 2px;
  background-color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}
.el-button {
  width: 100%;
  border-radius: 25px;
  height: 4em;
  color: #ffffff;
  font-weight: 800;
  background-color: #3a67d7;
  border-color: #678be9;
}
.skipbtn {
  background-color: #ffffff;
  color: #3a67d7;
}

.codetip {
  margin: 1em auto;
}
@media only screen and (max-width: 700px) {
  .login {
    width: 100%;
    padding: 1em;
  }
  button {
    display: block;
    width: 30%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
  }
}
</style>