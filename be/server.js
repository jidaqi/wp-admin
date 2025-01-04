/*
 * @Author: Peihua
 * @Date: 2024-12-14 23:28:20
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-04 21:45:27
 * @FilePath: \be\server.js
 * @Description: 
 */
'use strict'

// Read the .env file.
require('dotenv').config()
const path = require('node:path')
const fs = require('fs')
const db = require('./db/database')
const User = require('./models/User.model.js');

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

// 同步数据库并创建默认用户
async function initializeDatabase(fastify) {
  try {
    await db.sync({ force: true }); // 同步数据库，force: false 表示不删除现有表
    fastify.log.info('数据库同步成功！'); // 使用 Fastify 日志记录

    // 检查并创建默认用户
    await User.createDefaultUser(fastify);
  } catch (error) {
    fastify.log.error('数据库初始化失败：', error); // 使用 Fastify 日志记录
  }
}

// Start listening.
app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, async (err) => {
  initializeDatabase(app); // 初始化数据库
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})