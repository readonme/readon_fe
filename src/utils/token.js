import cache from '@/utils/cache.js'
const VUE_APP_TOKEN_NAME = "READTOKEN";
const VUE_APP_WALLET_NAME = "READWALLET";

function setToken (value) {
  cache.set(VUE_APP_TOKEN_NAME, value, 3600 * 2000)
}

function getToken () {
  return cache.get(VUE_APP_TOKEN_NAME)
}

function setWallet (value) {
  cache.set(VUE_APP_WALLET_NAME, value, 3600 * 2000)
}

function getWallet () {
  return cache.get(VUE_APP_WALLET_NAME)
}

function checkLogin () {
  if (cache.get(VUE_APP_TOKEN_NAME)) {
    return true;
  } else {
    return false;
  }
}

function checkWallet () {
  if (cache.get(VUE_APP_WALLET_NAME)) {
    return true;
  } else {
    return false;
  }
}


export default {
  VUE_APP_TOKEN_NAME,
  VUE_APP_WALLET_NAME,
  checkLogin,
  checkWallet,
  setToken,
  getToken,
  setWallet,
  getWallet
}


