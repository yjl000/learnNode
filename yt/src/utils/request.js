import axios from 'axios'
// import { Message } from 'iview'
const Qs = require('qs')
const CancelToken = axios.CancelToken
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
let BASE_API = '/api/user/'
// let BASE_API = ''
window.cancelToken && window.cancelToken() // 根据标记取消对应的请求
// 创建axios实例
const service = axios.create({
  baseURL: BASE_API, // api的base_url
  timeout: 20000, // 请求超时时间
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    return Qs.stringify(data)
  }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  cancelToken: new CancelToken(function executor (c) {
    // 为每个请求做一个标记
    window.cancelToken = c
  })
})

// request拦截器
service.interceptors.request.use(config => {
  // if(sessionStorage.getItem('loginInfo')){
  //   var logininfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  // }
  if (!config.data) { // post请求
    config.data = {}
  } else {
    let params = {}
    Object.assign(params, config.data)
    config.data = params
  }
  if (!config.params) { // get请求
    config.params = {}
  } else {
    let params = {}
    Object.assign(params, config.params)
    config.params = params
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
// service.interceptors.response.use(response => {
//   // code为非200是抛错 可结合自己业务进行修改
//   const res = response.data
//   const errMsgs = {
//     1000: '登录已失效，请重新登录',
//     1002: '您的账户在别处登录',
//     // 1003: '登录失败',
//     1005: '您的帐号被禁用，请联系管理员',
//     1111: ''
//   }
//   if (res.errcode !== 0) {
//     // 1000: token错误 1002: token冲突被重置为无效 1003: 登录失败 1004: 验证码错误 1005: 用户被禁用
//     if (res.errcode === 1000 || res.errcode === 1002 || res.errcode === 1003 || res.errcode === 1005 || res.errcode === 1111) {
//       // router.push({ name: 'login' })
//     }
//     if (res.errcode !== 1111) {
//       Message({
//         message: errMsgs[res.errcode] || res.message,
//         type: 'error'
//       })
//     }
//
//     if (res.errcode === 500) {
//       return Promise.reject(res)
//     }
//     // return Promise.reject(res)
//     return Promise.resolve(res)
//   } else {
//     return response.data
//   }
// }, error => {
//   if (error && error.response) {
//     switch (error.response.status) {
//       case 400:
//         error.message = '请求错误(400)'
//         break
//       case 401:
//         error.message = '未授权，请重新登录(401)'
//         break
//       case 403:
//         error.message = '拒绝访问(403)'
//         break
//       case 404:
//         error.message = '请求出错(404)'
//         break
//       case 408:
//         error.message = '请求超时(408)'
//         break
//       case 500:
//         error.message = '服务器错误(500)'
//         break
//       case 501:
//         error.message = '服务未实现(501)'
//         break
//       case 502:
//         error.message = '网络错误(502)'
//         break
//       case 503:
//         error.message = '服务不可用(503)'
//         break
//       case 504:
//         error.message = '网络超时(504)'
//         break
//       case 505:
//         error.message = 'HTTP版本不受支持(505)'
//         break
//       default:
//         error.message = `连接出错(${error.response.status})!`
//     }
//   }
//   // Message({ message: error.message, type: 'error' })
//
//   return Promise.reject(error)
// })
export default service
