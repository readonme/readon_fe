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

//socail share
import VueSocialSharing from 'vue-social-sharing'

//wallet
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { initWallet } from "solana-wallets-vue";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { initWorkspace } from "@/composables";
const network = WalletAdapterNetwork.Devnet;
const wallets = [
  new PhantomWalletAdapter(),
  new SlopeWalletAdapter(),
  new SolflareWalletAdapter({ network }),
  new TorusWalletAdapter(),
  new SolletWalletAdapter({ network }),
  new SolletExtensionWalletAdapter({ network }),
];
initWallet({ wallets, autoConnect: false });
initWorkspace();

// Routing.
import TOKEN from "@/utils/token.js";
import { createRouter, createWebHashHistory } from 'vue-router'


import routes from './router/index'
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})




// Create the app.
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(veProgress)
app.use(VueSocialSharing)
app.mount('#app')


