/*
 * @Author: Peihua
 * @Date: 2024-12-08 23:25:11
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-09 23:43:02
 * @FilePath: \be\plugins\support.js
 * @Description: 
 */
const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })
})
