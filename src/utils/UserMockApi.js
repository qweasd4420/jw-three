// const UserBaseApi = 'http://localhost:9527/mock'
// const UserBaseApi = 'http://localhost:9527/mock'
/**
 * 课程Api
 * @author 杨文培
 */
export default class UserMockApi {
  /**
   * mock地址
   */
  static getUserMockApi() {
    const ip_addr = document.location.hostname
    const port = document.location.port
    if (process.env.NODE_ENV === 'development') {
      console.log('development')
      return 'http://' + ip_addr + ':' + port + '/mock'
    } else {
      console.log('production')
      return '/px-common-admin'
    }
  }
  // static getUserMockApi() {
  //   const url = 'http://192.100.2.49:10002/px-common-admin'
  //   return url
  // }
}
