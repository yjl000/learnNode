import request from '@/utils/request'

export function addNote (data = {}) {
  let query = data
  return request({
    url: '/addNote',
    method: 'post',
    data: query
  })
}
