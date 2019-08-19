
import request from '../utils/request'

/**
 *
 */
export default class StudentApi {
  /**
   * 添加用户
   * @param data
   * @returns {AxiosPromise}
   */
  static save(data) {
    return request({
      url: '/demo/user/addUser',
      method: 'post',
      data: data
    })
  }
  /**
   * 更新用户
   * @param data
   * @returns {AxiosPromise}
   */
  static update(data) {
    return request({
      url: '/demo/user/updateUser',
      method: 'post',
      data: data
    })
  }
  /**
   * 分页查询课程
   * @param data
   * @returns {AxiosPromise}
   */
  static queryPage(queryParam) {
    return request({
      url: '/demo/user/queryPage',
      method: 'post',
      data: queryParam
    })
  }
  /**
   * 根据ID删除课程
   * @param id
   * @returns {AxiosPromise}
   */
  static deleteById(id) {
    return request({
      url: '/demo/user/deleteById/' + id,
      method: 'get'
    })
  }

}
