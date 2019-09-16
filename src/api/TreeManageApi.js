
import request from '../utils/request'

/**
 *
 */
export default class TreeManageApi {
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
   * 添加文件夹
   * @param param
   * @returns {AxiosPromise}
   */
  static addFolderJs(param) {
    return request({
      url: '/px-common-dragpage/treeManage/addFolder',
      method: 'post',
      data: param
    })
  }

  /**
   * 添加页面
   * @param param
   * @returns {AxiosPromise}
   */
  static addPageJs(param) {
    return request({
      url: '/px-common-dragpage/treeManage/addPage',
      method: 'post',
      data: param
    })
  }

  /**
   * 节点删除文件夹
   * @param param 文件夹id
   * @returns {AxiosPromise}
   */
  static deleteFolderJs(param) {
    return request({
      url: '/px-common-dragpage/treeManage/deleteFolder',
      method: 'post',
      data: param
    })
  }

  /**
   * 查询节点文件夹信息
   * @param param 节点文件夹id
   * @returns {AxiosPromise}
   */
  static queryFolderInfo(param) {
    return request({
      url: '/px-common-dragpage/treeManage/queryFolder',
      method: 'post',
      data: param
    })
  }

  /**
   * 查询节点文件信息
   * @param param 节点文件id
   * @returns {AxiosPromise}
   */
  static queryPageInfo(param) {
    return request({
      url: '/px-common-dragpage/treeManage/queryPage',
      method: 'post',
      data: param
    })
  }

  /**
   * 节点删除页面
   * @param param pageId
   * @returns {AxiosPromise}
   */
  static deletePageJs(param) {
    return request({
      url: '/px-common-dragpage/treeManage/deletePage',
      method: 'post',
      data: param
    })
  }
}
