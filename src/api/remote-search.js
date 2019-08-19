import request from '@/utils/request'
import UserMockApi from '../utils/UserMockApi'

export function searchUser(name) {
  return request({
    url: UserMockApi.getUserMockApi() + '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: UserMockApi.getUserMockApi() + '/transaction/list',
    method: 'get',
    params: query
  })
}
