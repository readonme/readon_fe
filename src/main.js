/* eslint-disable */


// CSS.
import 'solana-wallets-vue/styles.css'
import './main.css'

import "@/assets/css/vendor.css";
import "@/assets/css/magnific-popup.css";
import "@/assets/css/style.css";
import "@/assets/css/responsive.css";

//element-ui 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import veProgress from "vue-ellipse-progress";

// Routing.
import TOKEN from "@/utils/token.js";
import { createRouter, createWebHashHistory } from 'vue-router'


import routes from './router/index'
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})



import VueSocialSharing from 'vue-social-sharing'


// Create the app.
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(veProgress)
app.use(VueSocialSharing)
app.mount('#app')


