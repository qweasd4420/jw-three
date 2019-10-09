import request from '../utils/request'
import UTCMiddleWare from './UTCMiddleWare'
import { Message } from 'element-ui'
/**
 * 批量签章js集合
 */
export default class PatchSignApi {
  /**
   * 批签
   * @param patchParam
   * @param singlePercentage
   * @param callback
   */
  static patchPositionOrKeyword(patchParam, singlePercentage, callback) {
    console.log('获取的值为:' + patchParam)
    console.log('检测钥匙Pin码，事件绑定成功')
    // 批量下载文件
    const fileMap = {
      fileIds: patchParam.selectFileIds
    }
    PatchSignApi.downloadFilesByIds(fileMap).then(res => {
      console.log('文件下载成功')
    })
    // 初始化参数
    const signFlag = patchParam.signType // 0 签名 1 签章
    let signType // 印章编号前两位
    const pin = patchParam.pin // PIN码

    // 需要解析 patchParam.selectFiles
    const fileInfo = patchParam.selectFiles // 文件名列表
    console.log('转化后的值为' + fileInfo)
    let fileInfos = '{'
    for (const fileInf of fileInfo.entries()) {
      fileInfos = fileInfos + '"' + fileInf[0] + '":' + '"' + fileInf[1] + '"' + ','
    }
    fileInfos = fileInfos.substr(0, fileInfos.length - 1) + '}'

    console.log('拼接后字符串为:' + fileInfos)

    // TODO 批签返回结果
    const patchSignRes = new Map()
    const success = []
    const error = []

    let Dn // 证书
    let filesHash // 所有文件的hash值
    // --------------------------------区分 初始化参数-------------------------------------
    let keyword // 关键字
    let signMode // 签署第几个关键字
    let isDeviation // 偏移方位

    let pageNum // 页码
    let xPos // x坐标
    let yPos // y坐标
    if (patchParam.keyword === undefined) { // 位置批签
      pageNum = patchParam.patchPosition.p // 页码
      xPos = patchParam.patchPosition.x // x坐标
      yPos = patchParam.patchPosition.y // y坐标
    } else { // 关键字批签
      keyword = patchParam.keyword // 关键字
      signMode = patchParam.signMode // 签署第几个关键字
      isDeviation = patchParam.isDeviation // 偏移方位
    }
    console.log('进入签章方法' + signFlag + ':' + xPos + ':' + yPos + ':' + pageNum)
    // 校验钥匙Pin码
    const p3 = new Promise((resolve) => {
      UTCMiddleWare.OpenKey({
        pin: pin,
        success(data) {
          // 获取证书信息
          /* 进度条提醒1 稍后加 */
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
              PatchSignApi.failMessage(message)
              return
            },
            error(message) {
              // 此处失败为整体失败
              PatchSignApi.errorMessage(message)
              return
            }
          })
          // 获取印章/签名信息（需要加个判断，用户是点击的印章还是签名）
          const p2 = new Promise((resolve) => {
            UTCMiddleWare.GetSealInfo({
              pin: pin,
              success(data) {
                let signInfo = null
                // 11签章，12签字
                if (signFlag === '1') { // 签章
                  signType = '11'
                } else if (signFlag === '0') { // 签名
                  signType = '12'
                }
                for (let i = 0; i < data.length; i++) {
                  // TODO 判断是印章还是签名--这个之后需要修改，目前测试印章是11代表签章，12代表签名，当然这个地方也可能出现异常
                  if (data[i].id === signType) {
                    signInfo = data[i].value
                    break
                  }
                }
                // 调用后台接口，根据位置或者关键字进行签章（需要加个判断，判断是位置还是关键字签章）
                if (keyword === undefined || keyword === null || keyword === '') {
                  // 按位置获取PDF摘要（这步在批签内要修改，以符合批签需求）
                  const param = {
                    x: xPos,
                    y: yPos,
                    sealInfoBase64: signInfo,
                    strReason: '',
                    strLocation: '',
                    fileInfos: {
                      fileInfos: fileInfos
                    },
                    pageNo: pageNum
                  }
                  // 此处异常处理需要，无论如何都会返回值，是否应该添加一个成功状态
                  const p1 = new Promise((resolve) => {
                    PatchSignApi.getPdfStdDigests(param).then(res => {
                      if (res.status === 0) {
                        filesHash = res.data
                      } else {
                        // 全部失败，给出提示
                        PatchSignApi.failMessage('获取摘要信息，接口调用失败')
                        return
                      }
                      const p = new Promise((resolve) => {
                        singlePercentage.percentage = 66
                        PatchSignApi.patchSign(patchSignRes, error, success, filesHash, pin, Dn, singlePercentage).then(res => {
                          // 返回参数
                          console.log(res)
                          resolve(res)
                        })
                      })
                      resolve(p)
                    })
                  })
                  resolve(p1)
                } else {
                  // 根据偏移方位修正xPos和yPos的值
                  let x
                  let y
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
                  } else {
                    x = 0
                    y = 0
                  }
                  const param = {
                    x: x,
                    y: y,
                    sealInfoBase64: signInfo,
                    strReason: '',
                    strLocation: '',
                    fileInfos: {
                      fileInfos: fileInfos
                    },
                    keyStr: keyword,
                    signMode: signMode
                  }
                  // 按关键字获取PDF摘要
                  const p1 = new Promise((resolve) => {
                    PatchSignApi.getPdfStdDigestOnKws(param).then(res => {
                      if (res.status === 0) {
                        filesHash = res.data
                      } else {
                        // 全部失败，给出提示
                        PatchSignApi.failMessage('获取摘要信息，接口调用失败')
                        return
                      }
                      const p = new Promise((resolve) => {
                        singlePercentage.percentage = 65
                        PatchSignApi.patchSign(patchSignRes, error, success, filesHash, pin, Dn, singlePercentage).then(res => {
                          console.log(res)
                          resolve(res)
                        })
                      })
                      resolve(p)
                    })
                  })
                  resolve(p1)
                }
              },
              fail(message) {
                // 此处失败为整体失败
                PatchSignApi.failMessage(message)
              },
              error(message) {
                // 此处失败为整体失败，整体失败的需要return
                PatchSignApi.errorMessage(message)
              }
            })
          })
          resolve(p2)
        },
        fail(message) {
          // 此处失败为整体失败
          PatchSignApi.failMessage(message)
        },
        error(message) {
          // 此处失败为整体失败
          PatchSignApi.errorMessage(message)
        }
      })
    })
    return p3
  }

  /**
   * 签署
   * @param filesHash
   * @param Dn
   * @param pin
   * @param success 成功文件
   * @param error 失败文件
   * @param patchSignRes
   * @param time
   * @param singlePercentage
   */
  static signPdf(filesHash, Dn, pin, success, error, patchSignRes, time, singlePercentage) {
    // 获取签章参数
    let fileHash
    let fileName
    let fileId
    if (filesHash[time].digestStatus === true) { // 通过定义一个局部变量i遍历获取map里面的所有key值
      fileHash = filesHash[time].digest
      fileName = filesHash[time].fileName
      fileId = filesHash[time].fileId
    } else {
      // TODO 记录失败的文件信息
      const param = {
        fileId: filesHash[time].fileId,
        fileName: filesHash[time].fileName,
        message: filesHash[time].digest
      }
      error.push(param)
    }
    // 生成签章数据
    UTCMiddleWare.GetPdfStdSealDataByKey({
      hash: fileHash,
      dn: Dn,
      pin: pin,
      success: function(data) {
        const param = {
          fileName: fileName,
          signInfo: data
        }
        // 签章
        PatchSignApi.sealStdPdfReturnByte(param).then(res => {
          time = time + 1
          if (res.status === 0) {
            // 此接口调用成功，不代表签章成功，需要再判断内层status
            if (res.data.status === 0) {
              // TODO 记录成功的文件信息
              const param = {
                fileId: fileId,
                fileName: fileName,
                message: '文件签章成功',
                signFileId: res.data.data
              }
              success.push(param)
            } else {
              // 进入该else代表该文件签章失败，自动结束此次循环，并添加信息
              // TODO 记录失败的文件信息
              const param = {
                fileId: fileId,
                fileName: fileName,
                message: res.data.message
              }
              error.push(param)
            }
          } else {
            // 进入该else代表该文件签章失败，自动结束此次循环，并添加信息
            // TODO 记录失败的文件信息
            const param = {
              fileId: fileId,
              fileName: fileName,
              message: '生成签章数据接口调用失败'
            }
            error.push(param)
            PatchSignApi.failMessage('生成签章数据接口调用失败')
          }
          // 当计的次数超过的时候执行
          if (time >= filesHash.length) {
            singlePercentage.percentage = 100
            // TODO 先设置2秒，后面对接文件接口后设置为1
            setTimeout(function() {
            }, 2000)
            return new Promise(resolve => {
              patchSignRes.set('success', success)
              patchSignRes.set('error', error)
              resolve(patchSignRes)
            })
          }
          // 递归
          PatchSignApi.signPdf(filesHash, Dn, pin, success, error, patchSignRes, time, singlePercentage)
        }).catch(res => {
          console.log('阻止事件冒泡' + res)
          // TODO 记录失败的文件信息
          const param = {
            fileId: fileId,
            fileName: fileName,
            message: res
          }
          error.push(param)
        }).then((e) => {
          // 阻止事件冒泡
          console.log(e)
          // 递归
          // return new Promise(resolve => {
          //   resolve(e)
          // })
          // console.log('阻止promise冒泡')
        })
      },
      fail(message) {
        time = time + 1
        // 进入该fail代表该文件签章失败，自动结束此次循环，并添加信息
        // TODO 记录失败的文件信息
        const param = {
          fileId: fileId,
          fileName: fileName,
          message: message
        }
        error.push(param)
        // PatchSignApi.failMessage(message)
        // 当计的次数超过的时候执行
        if (time >= filesHash.length) {
          singlePercentage.percentage = 100
          // TODO 先设置2秒，后面对接文件接口后设置为1
          setTimeout(function() {
          }, 2000)
          return new Promise(resolve => {
            patchSignRes.set('success', success)
            patchSignRes.set('error', error)
            resolve(patchSignRes)
          })
        }
        // 递归
        PatchSignApi.signPdf(filesHash, Dn, pin, success, error, patchSignRes, time, singlePercentage)
      },
      error(message) {
        // 进入该error代表该文件签章失败，自动结束此次循环，并添加信息
        time = time + 1
        // TODO 记录失败的文件信息
        const param = {
          fileId: fileId,
          fileName: fileName,
          message: message
        }
        error.push(param)
        // 当计的次数超过的时候执行
        if (time >= filesHash.length) {
          singlePercentage.percentage = 100
          // TODO 先设置2秒，后面对接文件接口后设置为1
          setTimeout(function() {
          }, 2000)
          return new Promise(resolve => {
            patchSignRes.set('success', success)
            patchSignRes.set('error', error)
            resolve(patchSignRes)
          })
        }
        // PatchSignApi.errorMessage(message)
        // 递归
        PatchSignApi.signPdf(filesHash, Dn, pin, success, error, patchSignRes, time, singlePercentage)
      }
    })
  }
  /**
   * 根据位置获取摘要
   * @param param
   * @returns {AxiosPromise}
   */
  static getPdfStdDigests(param) {
    return request({
      url: '/px-common-signature/signSealOperator/getPdfStdDigests',
      method: 'post',
      data: param
    })
  }
  /**
   * 根据关键字获取摘要
   * @param param
   * @returns {AxiosPromise}
   */
  static getPdfStdDigestOnKws(param) {
    return request({
      url: '/px-common-signature/signSealOperator/getPdfStdDigestOnKws',
      method: 'post',
      data: param
    })
  }
  /**
   * 签章最后步骤
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
   * 签章最后公用处理方法
   * @param patchSignRes
   * @param error
   * @param success
   * @param filesHash
   * @param pin
   * @param Dn
   * @param singlePercentage
   * @returns {Promise<any>}
   */
  static patchSign(patchSignRes, error, success, filesHash, pin, Dn, singlePercentage) {
    let time = 0
    // TODO 最后再装载
    // 处理这个里的异常
    return new Promise((resolve) => {
      PatchSignApi.signPdf(filesHash, Dn, pin, success, error, patchSignRes, time, singlePercentage).then(res => {
        console.log(res)
      })
    })
    // for (let i = 0; i < filesHash.length; i++) {
    //   let fileHash
    //   let fileName
    //   let fileId
    //   // time = time + 1
    //   if (i !== filesHash.length) { // 轮询次数 +1
    //     if (filesHash[i].digestStatus === true) { // 通过定义一个局部变量i遍历获取map里面的所有key值
    //       fileHash = filesHash[i].digest
    //       fileName = filesHash[i].fileName
    //       fileId = filesHash[i].fileId
    //     } else {
    //       // TODO 记录失败的文件信息
    //       const param = {
    //         fileId: filesHash[i].fileId,
    //         fileName: filesHash[i].fileName,
    //         message: filesHash[i].digest
    //       }
    //       error.push(param)
    //       continue
    //     }
    //     // TODO 最后再装载
    //     // 处理这个里的异常
    //     PatchSignApi.signPdf(fileId, fileName, fileHash, Dn, pin, success, error, time, filesHash, patchSignRes, singlePercentage)
    //   } else {
    //     // 最后一次轮询条件：i === filesHash.length，这个时候数组已空
    //   }
    // }
    // // 当计的次数超过的时候执行
    // if (time >= filesHash.length) {
    //   singlePercentage.percentage = 100
    //   // TODO 先设置2秒，后面对接文件接口后设置为1
    //   setTimeout(function() {
    //   }, 2000)
    //   return new Promise(resolve => {
    //     patchSignRes.set('success', success)
    //     patchSignRes.set('error', error)
    //     resolve(patchSignRes)
    //   })
    // }
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

  /**
   * 根据文件id批量下载文件
   * @param selectFileIds 文件id数组
   */
  static downloadFilesByIds(selectFileIds) {
    return request({
      url: '/px-common-signature/downloadFilesByIds',
      method: 'post',
      data: selectFileIds
    })
  }
}
