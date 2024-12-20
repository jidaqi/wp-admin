/*
 * @Author: Peihua
 * @Date: 2024-12-08 23:25:11
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-20 14:19:42
 * @FilePath: \be\app.js
 * @Description: 
 */
const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')

// import path from 'node:path'
// import AutoLoad from '@fastify/autoload'

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.register(cors, {
    origin: ['http://localhost:3002', 'https://admin.hanyial.com/', 'http://admin.hanyial.com/'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true // 允许携带凭证
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({
      prefix: '/api'
    }, opts)
  })
}

module.exports.options = options
