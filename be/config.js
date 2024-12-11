/*
 * @Author: Peihua
 * @Date: 2024-12-10 10:30:00
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-11 15:56:36
 * @FilePath: \be\config.js
 * @Description: 菜鸟api配置
 */
module.exports = {
  dev: {
    url: 'https://link.cainiao.com/gateway/custom/open_integration_test_env',
    logistic_provider_id: 'SANDBOX_RESOURCE_477847',
    appSecret: '27K1318Y39481CL5s2m2tm0Jp58iu43Y'
  },
  prod: {
    url: 'https://link.cainiao.com/gateway/custom/open_integration_test_env',
    // url: 'https://link.cainiao.com/gateway/link.do',
    logistic_provider_id: '70a9f5a9a219d7ae220fc0a38ef15ce0',
    appSecret: 'm61CmJF1A92HX8RKRMGO1p6KNY9agzBk'
  }
}