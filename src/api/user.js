import request from '@/utils/request'
import UserMockApi from '../utils/UserMockApi'

export function login(data) {
  return request({
    url: UserMockApi.getUserMockApi() + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: UserMockApi.getUserMockApi() + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: UserMockApi.getUserMockApi() + '/user/logout',
    method: 'post',
    params: { token }
  })
}
