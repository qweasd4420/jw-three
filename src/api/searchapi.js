
import request from '../utils/request'

/**
 *
 */
export default class searchapi {
  /**
   * 分页查询知识
   * @param data
   * @returns {AxiosPromise}
   */
  static queryPage(queryParam) {
    return request({
      url: '/icomprehensive/knowSearch/queryPage',
      method: 'post',
      data: queryParam
    })
  }
  /**
   * 查询详情
   * @param queryParam
   * @returns {AxiosPromise}
   */
  static queryDetail(queryParam) {
    return request({
      url: '/icomprehensive/knowSearch/queryDetail',
      method: 'post',
      data: queryParam
    })
  }

  /**
   * 查询场景
   * @returns {AxiosPromise}
   */
  static queryScene() {
    return request({
      url: '/icomprehensive/searchScene/queryScene',
      method: 'post'
    })
  }

  /**
   * 查询标签
   * @returns {AxiosPromise}
   */
  static queryTag(queryString) {
    return request({
      url: '/icomprehensive/knowSearch/queryTag',
      method: 'post',
      data: queryString
    })
  }
}
