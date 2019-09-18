
import request from '../utils/request'

/**
 *
 */
export default class SealManageApi {
  /**
   * 分页查询
   * @param data
   * @returns {AxiosPromise}
   */
  static querySeals(queryParam) {
    return request({
      url: '/px-common-sign/signSealManage/querySeals',
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
      url: '/px-common-sign/searchScene/queryScene',
      method: 'post'
    })
  }

  /**
   * 修改印章状态
   * @returns {AxiosPromise}
   */
  static changeStatus(updateParam) {
    return request({
      url: '/px-common-sign/signSealManage/updateStatus',
      method: 'post',
      data: updateParam
    })
  }
  // 测试打开
  static sealStart() {
    return request({
      url: '/px-common-sign/pdfView',
      method: 'post'
    })
  }

  /**
   * 获取文件列表
   * @returns {AxiosPromise}
   */
  static getPdfList(queryParam) {
    return request({
      url: '/admin/getPdfList',
      method: 'post',
      data: queryParam
    })
  }
}
