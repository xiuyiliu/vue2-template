import request from '@/config/request'
import prefix from '@/config/prefix'

export const findAllNote = (params) => {
  return request.get(`${prefix.api}note/findAll`, { params })
}
