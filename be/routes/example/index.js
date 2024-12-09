/*
 * @Author: Peihua
 * @Date: 2024-12-08 23:25:11
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-09 13:10:30
 * @FilePath: \be\routes\example\index.js
 * @Description: 
 */
'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      status: 200,
      data: 'string'
    }
  })
}
