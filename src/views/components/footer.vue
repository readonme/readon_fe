<template>
  <div>
    <!-- footer area start -->
    <div class="footer">
      <div class="foot-main">
        <p> Make you addicted to Reading like a Game.</p>
        <div class="box">
          <a href="https://twitter.com/ReadOnMe3"
             target="_blank"> <img class="b-title"
                 src="@/assets/img/footer/twitter.png"></a>
          <a href="https://discord.gg/NCZG4nvrYT"
             target="_blank"> <img class="b-title"
                 src="@/assets/img/footer/discord.png"></a>
          <img class="b-title"
               src="@/assets/img/footer/telegram.png">
           <a href="https://readonofficial.medium.com/" target="_blank">
           <img class="b-title"
               src="@/assets/img/footer/medium.png"></a>
        </div>

        <div class="line_02"></div>
        <p>Copyright 2022. All Right Reserved</p>
      </div>
      <img class="foot-shadow"
           src="@/assets/img/footer/shadow.png">
    </div>

    <!-- footer area end -->

    <!-- back to top area start -->
    <div class="back-to-top">
      <span class="back-top"><i class="fa fa-angle-double-up"></i></span>
    </div>
    <!-- back to top area end -->

  </div>

</template>

<script>



export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*footer */
.footer {
  margin: 0 auto;
  width: 85%;
  padding: 2em;
}
.foot-main > p {
  margin: 0 auto;
  text-align: center;
  width: 75%;
  font-size: 1.2em;
  padding: 1em;
}

.foot-main {
  background-color: rgba(1, 237, 255, 1);
  border: 1px solid;
  border-radius: 20px;
}
.foot-shadow {
  width: 100%;
  margin-top: -8px;
}
.foot-shadow1 {
  margin-top: 0em;
  border-top: 50px solid #5a5756;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  background-image: linear-gradient(#e66465, #9198e5);
}

.box {
  display: flex;
  margin: 1em auto;
  width: 40%;
}

.b-title {
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-right: 3em;
}

.line_02 {
  width: 70%;
  margin: 0 auto;
  height: 1px;
  border-top: 1px solid black;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .footer {
    margin: 0 auto;
    width: 95%;
    padding: 0;
  }
  .box {
    display: flex;
    width: 55%;
  }
  .b-title {
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: left;
    margin-right: 1em;
  }
  .b-title :nth-last-child(3) {
    margin-right: 0;
  }
}

@media screen and (min-width: 401px) and (max-width: 850px) {
  .box {
    display: flex;
    width: 66%;
  }
}
</style>
