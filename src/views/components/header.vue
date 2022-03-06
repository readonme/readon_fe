<template>
  <div class="header">
    <span class="title">ReadON</span>
    <span class="overview"
          v-show="!islogin"><a href="/#/login">Log in</a></span>

    <span class="overview"
          v-show="islogin"><a href="/#/mine"><i class="fa fa-user"></i></a></span>

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
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  padding-right: 10%;
  font-size: 1.5em;
  font-weight: bold;
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
</style>