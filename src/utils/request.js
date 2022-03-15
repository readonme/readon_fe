import axios from 'axios'
import TOKEN from "@/utils/token.js";

import JSONBig from 'json-bigint'
let request = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 60000,
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data);
    } catch (err) {
      return data;
    }

  }],
})

// 1，添加请求拦截器
// 请求拦截里面携带token
request.interceptors.request.use(function (config) {
  var mytoken = TOKEN.getToken();
  config.headers.Authorization = mytoken && 'Bearer ' + mytoken;//每次首页里面的请求在发送后都会被拦截下来，自动加上一个token值。

  return config;
}, function (error) {
  //(2) 对请求错误做些什么
  return Promise.reject(error);
});

export default request;