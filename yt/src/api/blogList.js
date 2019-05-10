import request from '@/utils/request'

export function blogData (data = {}) {
  let query = data
  return request({
    url: '/blogList',
    method: 'post',
    data: query
  })
}
