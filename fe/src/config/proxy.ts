/*
 * @Author: Peihua
 * @Date: 2024-12-08 23:32:11
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-16 09:38:56
 * @FilePath: \fe\src\config\proxy.ts
 * @Description:
 */
export default {
  isRequestProxy: true,
  development: {
    // 开发环境接口请求
    host: 'http://localhost:3000',
    // 开发环境 cdn 路径
    cdn: '',
  },
  test: {
    // 测试环境接口地址
    host: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
    // 测试环境 cdn 路径
    cdn: '',
  },
  release: {
    // 正式环境接口地址
    host: 'https://api-admin.hanyial.com',
    // 正式环境 cdn 路径
    cdn: '',
  },
};
