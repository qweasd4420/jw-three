
import request from '../utils/request'

/**
 * 课程Api
 * @author 杨文培
 */
export default class CourseApi {
  /**
   * 保存课程
   * @param data
   * @returns {AxiosPromise}
   */
  static save(data) {
    return request({
      url: '/demo/course/save',
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
      url: '/demo/course/queryPage',
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
      url: '/demo/course/deleteById/' + id,
      method: 'get'
    })
  }
}
