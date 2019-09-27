
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
      url: '/px-common-signature/signSealManage/querySeals',
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
      url: '/px-common-signature/searchScene/queryScene',
      method: 'post'
    })
  }

  /**
   * 修改印章状态
   * @returns {AxiosPromise}
   */
  static changeStatus(updateParam) {
    return request({
      url: '/px-common-signature/signSealManage/updateStatus',
      method: 'post',
      data: updateParam
    })
  }
  // 测试打开
  static sealStart() {
    return request({
      url: '/px-common-signature/pdfView',
      method: 'post'
    })
  }

  /**
   * 获取文件列表
   * @returns {AxiosPromise}
   */
  static getPdfList(queryParam) {
    return request({
      url: '/px-common-signature/getPdfList',
      method: 'post',
      data: queryParam
    })
  }

  /**
   * 批量验签
   * @param param
   *            fileIds 文件数组
   */
  static verifySignFiles(param) {
    return request({
      url: '/px-common-signature/verifySignFiles',
      method: 'post',
      data: param
    })
  }
}
