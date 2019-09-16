
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
  static savePageParam(pageParam) {
    return request({
      url: '/px-common-dragpage/dragPage/savePageParam',
      method: 'post',
      data: pageParam
    })
  }
  static initTree() {
    return request({
      url: '/px-common-dragpage/treeManage/treeInit',
      method: 'post'
    })
  }
}
