import cache from '@/utils/cache.js'
const VUE_APP_TOKEN_NAME = "READTOKEN";
const VUE_APP_WALLET_NAME = "READWALLET";

function setToken (value) {
  cache.set(VUE_APP_TOKEN_NAME, value, 3600 * 1000 *24 * 30)
}

function getToken () {
  return cache.get(VUE_APP_TOKEN_NAME)
}

function setWallet (value) {
  cache.set(VUE_APP_WALLET_NAME, value, 3600 * 1000 * 24 * 30)
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

function logout () {
  cache.remove(VUE_APP_TOKEN_NAME);
  cache.remove(VUE_APP_WALLET_NAME);
}


export default {
  VUE_APP_TOKEN_NAME,
  VUE_APP_WALLET_NAME,
  checkLogin,
  checkWallet,
  setToken,
  getToken,
  setWallet,
  getWallet,
  logout
}


