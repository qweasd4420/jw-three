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
   *              pin: '',
   *              fileName: '',
   *              fileId: ''
   * @param singlePercentage
   *              percentage: 0, // 百分比
   *              signStatus: '' // 状态
   * @param callback
   */
  static singleSignPosition(singlePositionParam, singlePercentage, callback) {
    // singlePercentage.percentage = 20
    console.log('检测钥匙Pin码，事件绑定成功')
    const signFlag = singlePositionParam.signType
    let signType
    const xPos = singlePositionParam.singlePosition.xPos
    const yPos = singlePositionParam.singlePosition.yPos
    const pageNum = singlePositionParam.singlePosition.pageNum
    const keyPIN = singlePositionParam.pin
    const fileName = singlePositionParam.fileName
    const fileId = singlePositionParam.fileId
    // 封装返回信息
    let resultMap

    let Dn
    let fileHash
    console.log(xPos + ':' + yPos + ':' + pageNum)
    // 校验钥匙Pin码
    const p3 = new Promise((resolve) => {
      UTCMiddleWare.OpenKey({
        pin: keyPIN,
        success: function() {
          // 获取证书信息
          singlePercentage.percentage = 20
          console.log('pin码正确')
          UTCMiddleWare.GetCertInfo({
            success(data) {
              console.log(JSON.stringify(data))
              const dataDN = JSON.stringify(data)
              const dataE = new Function('return' + dataDN)()
              Dn = dataE[0].DN
              console.log(Dn)
            },
            fail(message) {
              // 此处失败为整体失败
              SingleSignApi.failMessage(message)
              return
            },
            error(message) {
              // 此处失败为整体失败
              SingleSignApi.errorMessage(message)
              return
            }
          })
          const p2 = new Promise((resolve) => {
            // 获取印章/签名信息（需要加个判断，用户是点击的印章还是签名）
            UTCMiddleWare.GetSealInfo({
              pin: keyPIN,
              success: function(data) {
                singlePercentage.percentage = 50
                let signInfo = null
                // 11签章，12签字
                if (signFlag === '1') { // 签章
                  signType = '11'
                } else if (signFlag === '0') { // 签名
                  signType = '12'
                }
                for (let i = 0; i < data.length; i++) {
                  if (data[i].id === signType) {
                    signInfo = data[i].value
                    break
                  }
                }
                // 调用后台接口，根据位置或者关键字进行签章（需要加个判断，判断是位置还是关键字签章）
                // 按位置获取PDF摘要
                const param = {
                  x: xPos,
                  y: yPos,
                  sealInfoBase64: signInfo,
                  strReason: '',
                  strLocation: '',
                  fileName: fileName,
                  pageNo: pageNum
                }
                const p1 = new Promise((resolve) => {
                  SingleSignApi.getPdfStdDigest(param).then(res => {
                    if (res.status === 0) {
                      fileHash = res.data
                      singlePercentage.percentage = 75
                      // 生成签章数据
                      const p0 = new Promise((resolve) => {
                        UTCMiddleWare.GetPdfStdSealDataByKey({
                          hash: fileHash,
                          dn: Dn,
                          pin: keyPIN,
                          success: function(data) {
                            const param = {
                              fileName: fileName,
                              signInfo: data
                            }
                            // 生成签章数据
                            const p = new Promise((resolve) => {
                              // 需要在这个外面包装一层，在.then方法中resolve
                              SingleSignApi.sealStdPdfReturn(param, fileId, fileName, resultMap, singlePercentage).then(res => {
                                // 最终返回
                                console.log(res)
                                resolve(res)
                              })
                            })
                            resolve(p)
                          },
                          fail(message) {
                            // 此处失败为整体失败
                            SingleSignApi.failMessage(message)
                          },
                          error(message) {
                            // 此处失败为整体失败，整体失败的需要return
                            SingleSignApi.errorMessage(message)
                          }
                        })
                      })
                      resolve(p0)
                    } else {
                      // 全部失败，给出提示
                      SingleSignApi.failMessage('获取摘要信息，接口调用失败')
                    }
                  })
                })
                resolve(p1)
              },
              fail(message) {
                // 此处失败为整体失败
                SingleSignApi.failMessage(message)
              },
              error(message) {
                // 此处失败为整体失败，整体失败的需要return
                SingleSignApi.errorMessage(message)
              }
            })
          })
          resolve(p2)
        },
        fail(message) {
          // 此处失败为整体失败
          SingleSignApi.failMessage(message)
        },
        error(message) {
          // 此处失败为整体失败
          SingleSignApi.errorMessage(message)
        }
      })
    })
    return p3
  }
  /**
   * 按关键字单签
   * @param singleKeywordParam
   *              fileId: '',
   *              fileName: '',
   *              keyword: '',
   *              isDeviation: '',
   *              signMode: '',
   *              signType: '',
   *              pin: ''
   * @param singlePercentage
   *              percentage: 0, // 百分比
   *              signStatus: '' // 状态
   * @param callback
   */
  static singleSignKeyword(singleKeywordParam, singlePercentage, callback) {
    const signFlag = singleKeywordParam.signType
    const fileId = singleKeywordParam.fileId
    const fileName = singleKeywordParam.fileName
    const keyword = singleKeywordParam.keyword
    const isDeviation = singleKeywordParam.isDeviation
    const signMode = singleKeywordParam.signMode
    const keyPIN = singleKeywordParam.pin
    // 封装返回信息
    let resultMap

    let Dn
    let signType
    let fileHash
    // 校验钥匙Pin码
    const p3 = new Promise((resolve) => {
      UTCMiddleWare.OpenKey({
        pin: keyPIN,
        success: function() {
          // 获取证书信息
          singlePercentage.percentage = 20
          console.log('pin码正确')
          UTCMiddleWare.GetCertInfo({
            success(data) {
              console.log(JSON.stringify(data))
              const dataDN = JSON.stringify(data)
              const dataE = new Function('return' + dataDN)()
              Dn = dataE[0].DN
              console.log(Dn)
            },
            fail(message) {
              // 此处失败为整体失败
              SingleSignApi.failMessage(message)
              return
            },
            error(message) {
              // 此处失败为整体失败
              SingleSignApi.errorMessage(message)
              return
            }
          })
          const p2 = new Promise((resolve) => {
            // 获取印章/签名信息（需要加个判断，用户是点击的印章还是签名）
            UTCMiddleWare.GetSealInfo({
              pin: keyPIN,
              success: function(data) {
                singlePercentage.percentage = 50
                let signInfo = null
                // 11签章，12签字
                if (signFlag === '1') { // 签章
                  signType = '11'
                } else if (signFlag === '0') { // 签名
                  signType = '12'
                }
                for (let i = 0; i < data.length; i++) {
                  if (data[i].id === signType) {
                    signInfo = data[i].value
                    break
                  }
                }
                // 调用后台接口，根据位置或者关键字进行签章（需要加个判断，判断是位置还是关键字签章）
                // 按关键字获取PDF摘要
                let x = 0
                let y = 0
                if (isDeviation !== undefined && isDeviation != null) {
                  switch (isDeviation) {
                    case '0': // 不偏移
                      x = 0
                      y = 0
                      break
                    case '1': // 向上偏移
                      x = 0
                      y = -16
                      break
                    case '2': // 向下偏移
                      x = 0
                      y = 8
                      break
                    case '3': // 向左偏移
                      x = -10
                      y = 0
                      break
                    case '4': // 向右偏移
                      x = 10
                      y = 0
                      break
                    default: // 特殊情况不偏移
                      x = 0
                      y = 0
                      break
                  }
                }
                const param = {
                  x: x,
                  y: y,
                  sealInfoBase64: signInfo,
                  strReason: '',
                  strLocation: '',
                  fileName: fileName,
                  keyStr: keyword,
                  signMode: signMode
                }
                const p1 = new Promise((resolve) => {
                  SingleSignApi.getPdfStdDigestOnKw(param).then(res => {
                    if (res.status === 0) {
                      fileHash = res.data
                      singlePercentage.percentage = 75
                      // 生成签章数据
                      const p0 = new Promise((resolve) => {
                        UTCMiddleWare.GetPdfStdSealDataByKey({
                          hash: fileHash,
                          dn: Dn,
                          pin: keyPIN,
                          success: function(data) {
                            const param = {
                              fileName: fileName,
                              signInfo: data
                            }
                            // 生成签章数据
                            const p = new Promise((resolve) => {
                              // 需要在这个外面包装一层，在.then方法中resolve
                              SingleSignApi.sealStdPdfReturn(param, fileId, fileName, resultMap, singlePercentage).then(res => {
                                // 最终返回
                                resolve(res)
                              })
                            })
                            resolve(p)
                          },
                          fail(message) {
                            // 此处失败为整体失败
                            SingleSignApi.failMessage(message)
                          },
                          error(message) {
                            // 此处失败为整体失败，整体失败的需要return
                            SingleSignApi.errorMessage(message)
                          }
                        })
                      })
                      resolve(p0)
                    } else {
                      // 全部失败，给出提示
                      SingleSignApi.failMessage('获取摘要信息，接口调用失败')
                    }
                  })
                })
                resolve(p1)
              },
              fail(message) {
                // 此处失败为整体失败
                SingleSignApi.failMessage(message)
              },
              error(message) {
                // 此处失败为整体失败，整体失败的需要return
                SingleSignApi.errorMessage(message)
              }
            })
          })
          resolve(p2)
        },
        fail(message) {
          // 此处失败为整体失败
          SingleSignApi.failMessage(message)
        },
        error(message) {
          // 此处失败为整体失败
          SingleSignApi.errorMessage(message)
        }
      })
    })
    return p3
  }

  /**
   * 根据位置获取摘要
   * @param param
   */
  static getPdfStdDigest(param) {
    return request({
      url: '/px-common-signature/signSealOperator/getPdfStdDigest',
      method: 'post',
      data: param
    })
  }

  /**
   * 根据关键字获取摘要
   * @param param
   * @returns {AxiosPromise}
   */
  static getPdfStdDigestOnKw(param) {
    return request({
      url: '/px-common-signature/signSealOperator/getPdfStdDigestOnKw',
      method: 'post',
      data: param
    })
  }

  /**
   * 获取签章数据
   * @param param
   * @returns {AxiosPromise}
   */
  static sealStdPdfReturnByte(param) {
    return request({
      url: '/px-common-signature/signSealOperator/sealStdPdfReturnByte',
      method: 'post',
      data: param
    })
  }

  /**
   * 失败回调
   * @param message
   */
  static failMessage(message) {
    Message({
      message: '失败，原因：' + message,
      type: 'error',
      duration: 2 * 1000,
      center: true
    })
  }

  /**
   * 错误回调
   * @param message
   */
  static errorMessage(message) {
    Message({
      message: '失败，原因：' + message,
      type: 'error',
      duration: 2 * 1000,
      center: true
    })
  }

  /**
   * 封装一下，用于返回
   * @param param
   * @param fileId
   * @param fileName
   * @param resultMap
   * @param singlePercentage
   */
  static sealStdPdfReturn(param, fileId, fileName, resultMap, singlePercentage) {
    return new Promise((resolve) => {
      SingleSignApi.sealStdPdfReturnByte(param).then(res => {
        if (res.status === 0) {
          // 此接口调用成功，不代表签章成功，需要再判断内层status
          if (res.data.status === 0) {
            // TODO 记录成功的文件信息
            singlePercentage.percentage = 100
            singlePercentage.signStatus = 'success'
            Message({
              message: '签章成功',
              type: 'success',
              duration: 2 * 1000,
              center: true
            })
            // TODO 保存返回信息
            resultMap = {
              fileId: fileId,
              fileName: fileName,
              status: 0,
              message: '签章成功',
              signFileId: res.data.data
            }
            resolve(resultMap)
          } else {
            // 进入该else代表该文件签章失败，自动结束此次循环，并添加信息
            // TODO 记录失败的文件信息
            SingleSignApi.failMessage(res.data.message)
            // TODO 保存返回信息
            resultMap = {
              fileId: fileId,
              fileName: fileName,
              status: 1,
              message: res.data.message,
              signFileId: ''
            }
            resolve(resultMap)
          }
        } else {
          // 进入该else代表该文件签章失败，自动结束此次循环，并添加信息
          // TODO 记录失败的文件信息
          SingleSignApi.failMessage('生成签章数据接口调用失败')
          // TODO 保存返回信息
          resultMap = {
            fileId: fileId,
            fileName: fileName,
            status: 1,
            message: '生成签章数据接口调用失败',
            signFileId: ''
          }
          resolve(resultMap)
        }
      })
    })
  }
}
