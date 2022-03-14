<template>
  <div class="achievement-page">
    <div class="achievement-header">
      <div class="achievement-header-tip">Mint Buzz Now!</div>
      <img
        src="@/assets/img/achievement/mintnft.png"
        class="achievement-header-image"
      />
      <div class="achievement-header-title">My Achievement</div>
      <div class="achievement-header-count">
        <div class="achievement-header-reach-count">0</div>
        <div class="achievement-header-split">/</div>
        <div class="achievement-header-total-count">25</div>
      </div>
    </div>
    <div class="achievement-content">
      <div class="achievement-c-line"></div>
      <div class="achievement-c-title">The Gate Of Crypto</div>
      <div class="achievement-c-list">
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/1WALLET.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/1CRYPTO.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/5CRYPTO.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <template v-if="false">
            <img
              src="@/assets/img/achievement/10CRYPTO.png"
              class="achievement-c-image"
          /></template>
          <template v-else>
            <img
              src="@/assets/img/achievement/grey/10CRYPTO.png"
              class="achievement-c-image"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="achievement-content">
      <div class="achievement-c-line"></div>
      <div class="achievement-c-title">Daily Reading</div>
      <div class="achievement-c-list">
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/1DAYS.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/3DAYS.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <template v-if="false">
            <img
              src="@/assets/img/achievement/7DAYS.png"
              class="achievement-c-image"
          /></template>
          <template v-else>
            <img
              src="@/assets/img/achievement/grey/7DAYS.png"
              class="achievement-c-image"
            />
          </template>
        </div>
        <div class="achievement-c">
          <template v-if="false">
            <img
              src="@/assets/img/achievement/14DAYS.png"
              class="achievement-c-image"
          /></template>
          <template v-else>
            <img
              src="@/assets/img/achievement/grey/14DAYS.png"
              class="achievement-c-image"
            />
          </template>
        </div>
        <div class="achievement-c">
          <template v-if="false">
            <img
              src="@/assets/img/achievement/30DAYS.png"
              class="achievement-c-image"
          /></template>
          <template v-else>
            <img
              src="@/assets/img/achievement/grey/30DAYS.png"
              class="achievement-c-image"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="achievement-content">
      <div class="achievement-c-line"></div>
      <div class="achievement-c-title">Release Impact</div>
      <div class="achievement-c-list">
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/3SHARES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/10SHARES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/20SHARES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/30SHARES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/50SHARES.png"
            class="achievement-c-image"
          />
        </div>
      </div>
    </div>
    <div class="achievement-content">
      <div class="achievement-c-line"></div>
      <div class="achievement-c-title">Immerse Yourself</div>
      <div class="achievement-c-list">
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/3HOURS.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/4HOURS.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/9HOURS.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/16HOURS.png"
            class="achievement-c-image"
          />
        </div>
      </div>
    </div>

    <div class="achievement-content">
      <div class="achievement-c-line"></div>
      <div class="achievement-c-title">Mentorship Path</div>
      <div class="achievement-c-list">
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/3INVITES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/6INVITES.png"
            class="achievement-c-image"
          />
        </div>
        <div class="achievement-c">
          <img
            src="@/assets/img/achievement/10INVITES.png"
            class="achievement-c-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cateList, articleList, articleTopVoteList } from "@/api/article.js";

export default {
  name: "Achievement",
  components: {},
  async created() {},
  data() {
    return {};
  },

  methods: {},
};
</script>
<style scoped src="../../assets/css/dark/achievement.css"></style>
