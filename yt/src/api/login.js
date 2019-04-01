import request from '@/utils/request'

export function login (data = {}) {
  let query = data
  return request({
    url: '/userLogin',
    method: 'post',
    data: query
  })
}

export function regin (data = {}) {
  let query = data
  return request({
    url: '/addUser',
    method: 'post',
    data: query
  })
}
