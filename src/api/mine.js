import request from '@/utils/request.js'
const host = "http://ec2-54-178-107-66.ap-northeast-1.compute.amazonaws.com:9958"

export function userInfo () {
  return request({
    url: host + "/api_v2/auth/me",
    method: "get"
  })
}
// change name 
export function changeName (data) {
  var res = request({
    url: host + "/api_v2/auth/change_name",
    method: "post",
    data
  })
  return res
}
// get  all_avatars
export function allAvatars () {
  return request({
    url: host + "/api_v2/auth/all_avatars",
    method: "get"
  })
}

// change avatar 
export function changeAvatar (data) {
  var res = request({
    url: host + "/api_v2/auth/change_avatar",
    method: "post",
    data
  })
  return res
}

//  绑定钱包  
export function bindWallet (data) {
  var res = request({
    url: host + "/api_v2/auth/connectwallet",
    method: "post",
    data
  })
  return res
}

//获取奖励
export function getReward () {
  var res = request({
    url: host + "/api_v2/auth/get_reward",
    method: "post"
  })
  return res
}

//get balnae
export function getBalance () {
  return request({
    url: host + "/api_v2/auth/get_balance",
    method: "get"
  })
}

//get reward list 
export function getRewardHistory () {
  return request({
    url: host + "/api_v2/auth/reward_history",
    method: "get"
  })
}



// // 获取stake列表
// // export function stakeList(params) {
// //     return request({
// //         url: host + "/api/user/stake/list",
// //         method: "get"
// //     })
// // }

// export function userInfo(params) {
//     return request({
//         url: host + "/api/user/info",
//         method: "get"
//     })
// }


// // 获取balance
// export function userBanllance(params) {
//     let bal = params.wallet_id
//     return request({
//         url: host + "/api/user/token/balance?address=" + bal,
//         method: "get"
//     })
// }


// // Transfer
// export function userTransfer(params) {
//     console.log(params)
//     let bal = params.wallet_id
//     var res = handleStake(params)
//     return res
// }

// // 向后端发送请求
// export function userTransferToBack(params) {
//     var aid = params.aid
//     var stake = params.stake
//     return request({
//         url: host + "/api/user/stake?aid=" + aid + "&stake=" + stake,
//         method: "get"
//     })
// }




