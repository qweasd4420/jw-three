
import request from '../utils/request'

/**
 *
 */
export default class SurveyApi {
  /**
   * 分页查询知识
   * @param data
   * @returns {AxiosPromise}
   */
  static queryPage(queryParam) {
    return request({
      url: '/icomprehensive/SurveyQuetions/queryPage',
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
   * 查询详情
   * @param queryDetail
   * @returns {AxiosPromise}
   */
  static queryDetail(queryDetail) {
    return request({
      url: '/icomprehensive/SurveyQuetions/queryDetail',
      method: 'post',
      data: queryDetail
    })
  }
  /**
   * 查询内嵌
   * @param queryInner
   * @returns {AxiosPromise}
   */
  static queryInner(queryInner) {
    return request({
      url: '/icomprehensive/SurveyQuetions/queryInner',
      method: 'post',
      data: queryInner
    })
  }

  /**
   * 查询选项
   * @param queryLib
   * @returns {AxiosPromise}
   */
  static queryLib(queryLib) {
    return request({
      url: '/icomprehensive/SurveyQuetions/queryLib',
      method: 'post',
      data: queryLib
    })
  }

  /**
   * 附件下载
   * @param queryInnerParam
   * @returns {AxiosPromise}
   */
  static downLoad(queryInnerParam) {
    return request({
      url: '/icomprehensive/SurveyQuetions/queryDownLoad',
      method: 'post',
      data: queryInnerParam
    })
  }
}
