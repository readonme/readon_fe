<template>
  <div class="header">
    <span class="title"><a href="/">ReadON</a></span>
    <span class="overview"
          v-show="!islogin"><a href="/#/login">Log in</a></span>

    <el-dropdown>
      <span class="el-dropdown-link info"
            v-show="islogin">
        <a href="/#/mine"><i class="fa fa-user"></i></a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logout()">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>
<script>
import TOKEN from "@/utils/token.js";
export default {
  name: 'Header',
  data () {
    return {
      islogin: false
    }
  },
  created () {
    if (TOKEN.checkLogin()) {
      this.islogin = true
    }
  },
  watch: {
    $route (to, from) {
      if (TOKEN.checkLogin()) {
        this.islogin = true
      }
    }
  },

  methods: {
    logout () {
      console.log("logout")
      TOKEN.logout()
      this.$router.push("/")
      this.islogin = false
    }
  }
}

</script> 
<style scoped>
/* header*/
.header {
  background-color: black;
  color: rgba(1, 237, 255, 1);
  height: 4.5em;
  line-height: 4.5em;
  border-bottom: 1px solid white;
}
.title {
  text-align: left;
  padding-left: 5%;
  font-weight: bold;
  font-size: 3em;
}
.overview {
  float: right;
  color: white;
  text-align: right;
  padding-right: 5%;
  font-size: 1.5em;
  font-weight: bold;
}
/deep/.el-dropdown {
  float: right;
  color: white;
  text-align: right;
  margin-top: 0.5em;
  padding-right: 5%;
  font-size: 1.5em;
  font-weight: bold;
}
/deep/.el-icon--right {
    margin-left: -1em;
}
.fa {
  border: 1px solid #fff;
  padding: 9px;
  width: 2em;
  height: 2em;
  margin: 0 auto;
  border-radius: 11em;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .overview {
    padding-right: 4%;
  }
  .title {
    padding-left: 3%;
    font-size: 2em;
  }
  /deep/.el-dropdown {
    padding-right: 1%;
  }
}
</style>
