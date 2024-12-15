/*
 * @Author: Peihua
 * @Date: 2024-12-10 10:30:00
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 15:15:55
 * @FilePath: \be\config.js
 * @Description: 菜鸟api配置
 */
const dev = {
  url: 'https://link.cainiao.com/gateway/custom/open_integration_test_env',
  logistic_provider_id: '70a9f5a9a219d7ae220fc0a38ef15ce0',
  appSecret: 'm61CmJF1A92HX8RKRMGO1p6KNY9agzBk'
}
const prod = {
  url: 'https://link.cainiao.com/gateway/link.do',
  logistic_provider_id: '70a9f5a9a219d7ae220fc0a38ef15ce0',
  appSecret: 'm61CmJF1A92HX8RKRMGO1p6KNY9agzBk'
}

const _config = { dev, prod }

module.exports = _config[process.env.CAINIAOENV]