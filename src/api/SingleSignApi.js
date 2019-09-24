import request from '../utils/request'
import UTCMiddleWare from './UTCMiddleWare'
import { Message } from 'element-ui'
/**
 * 单签js集合
 */
export default class SingleSignApi {
  /**
   * 按位置单签
   * @param singlePositionParam
   *              singlePosition: {
   *                xPos: x,
   *                yPos: y,
   *                pageNum: p
   *              },
   *              signType: '',
   *              pin: ''
   * @param singlePercentage
   *              percentage: 0, // 百分比
   *              signStatus: '' // 状态
   */
  static singleSignPosition(singlePositionParam, singlePercentage) {
    // singlePercentage.percentage = 20

  }
  // 失败回调
  static failMessage(message) {
    Message({
      message: '失败，原因：' + message,
      type: 'error',
      duration: 2 * 1000,
      center: true
    })
  }
  static errorMessage(message) {
    Message({
      message: '失败，原因：' + message,
      type: 'error',
      duration: 2 * 1000,
      center: true
    })
  }
}
