<script setup> 

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
const { connected } = useWallet()
console.log("wallet connected", connected)
</script>

<template>
  <wallet-multi-button></wallet-multi-button>

</template>
