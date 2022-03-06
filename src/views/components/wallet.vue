<script setup>
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


import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
const { connected } = useWallet()
console.log("wallet connected", connected)
</script>

<template>
  <wallet-multi-button></wallet-multi-button>

</template>
