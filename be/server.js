/*
 * @Author: Peihua
 * @Date: 2024-12-14 23:28:20
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 14:28:48
 * @FilePath: \be\server.js
 * @Description: 
 */
'use strict'

// Read the .env file.
require('dotenv').config()
const path = require('node:path')
const fs = require('fs')
const db = require('./db/database')

const logStream = fs.createWriteStream(path.join(__dirname, 'logs/fastify.log'), { flags: 'a' })

// Require the framework
const Fastify = require('fastify')

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    level: 'info',
    stream: logStream,
    redact: ['req.headers.authorization'], // 需要隐藏的字段
  },
})

// Register parent error handler
app.setErrorHandler((error, request, reply) => {
  request.log.error({ error })
  throw new Error(error)
})


// Register a plugin for request-specific logging
app.addHook('preHandler', (request, reply, done) => {
  if (request.body) {
    request.log.info('Parsed body')
    request.log.info({ body: request.body })
  } else {
    request.log.info('Request received');
    request.log.info({ url: request.url, method: request.method })
  }
  
  done();
})

// Register your application as a normal plugin.
const appService = require('./app.js')
app.register(appService)

// delay is the number of milliseconds for the graceful close to finish
closeWithGrace({ delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

// Start listening.
app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, async (err) => {
  await db.sync({ 
    // force: true // 危险！将清空数据库
   })
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})