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
console.log(connected)
</script>

<template>
  <aside class="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4">
    <div class="fixed bottom-8 right-8 md:static w-48 md:w-full">
      <wallet-multi-button></wallet-multi-button>
    </div>
  </aside>
</template>
