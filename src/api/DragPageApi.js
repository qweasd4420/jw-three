
import request from '../utils/request'

/**
 *
 */
export default class DragPageApi {
  /**
   * 初始化页面
   * @param pageId
   * @returns {AxiosPromise}
   */
  static initPage(pageId) {
    return request({
      url: '/px-common-dragpage/dragPage/queryPageParam',
      method: 'post',
      data: pageId
    })
  }

  /**
   * 更新页面数据-jsonData
   * @param pageParam
   * @returns {AxiosPromise}
   */
  static savePageParam(pageParam) {
    return request({
      url: '/px-common-dragpage/dragPage/savePageParam',
      method: 'post',
      data: pageParam
    })
  }
  /**
   * 初始化树形列表
   * @returns {AxiosPromise}
   */
  static initTree() {
    return request({
      url: '/px-common-dragpage/treeManage/treeInit',
      method: 'post'
    })
  }

  /**
   * 根据页面id查询页面可显示的版本信息
   * @param queryParam
   *                    pageId
   * @returns {AxiosPromise}
   */
  static queryVersionList(queryParam) {
    return request({
      url: '/px-common-dragpage/versionManage/queryVersionList',
      method: 'post',
      data: queryParam
    })
  }

  static queryVersions(queryParam) {
    return request({
      url: '/px-common-dragpage/versionManage/queryVersions',
      method: 'post',
      data: queryParam
    })
  }
}
