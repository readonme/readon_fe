<script setup> 

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
const { connected } = useWallet()
</script>

<template>
  <wallet-multi-button></wallet-multi-button>
</template>
