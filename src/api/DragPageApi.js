
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

  /**
   * 查询所有版本号
   * @param queryParam
   * @returns {AxiosPromise}
   */
  static queryVersions(queryParam) {
    return request({
      url: '/px-common-dragpage/versionManage/queryVersions',
      method: 'post',
      data: queryParam
    })
  }

  /**
   * 更新最新版本号
   * @param updateParam
   * @returns {AxiosPromise}
   */
  static updateVersion(updateParam) {
    return request({
      url: '/px-common-dragpage/versionManage/updateVersion',
      method: 'post',
      data: updateParam
    })
  }

  /**
   * 删除页面版本
   * @param deleteParam
   *                    pageId
   * @returns {AxiosPromise}
   */
  static deleteVersion(deleteParam) {
    return request({
      url: '/px-common-dragpage/versionManage/deleteVersion',
      method: 'post',
      data: deleteParam
    })
  }

  /**
   * 修改当前版本页面的信息
   * @param updateParam
   * @returns {AxiosPromise}
   */
  static updatePageInfo(updateParam) {
    return request({
      url: '/px-common-dragpage/versionManage/updatePageInfo',
      method: 'post',
      data: updateParam
    })
  }
}
