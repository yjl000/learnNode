import request from '@/utils/request'

export function login (data = {}) {
  let query = data
  return request({
    url: '/userLogin',
    method: 'post',
    data: query
  })
}
