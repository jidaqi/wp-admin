/*
 * @Author: Peihua
 * @Date: 2024-12-22 20:47:05
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-22 22:07:42
 * @FilePath: \be\plugins\jwt.js
 * @Description: 
 */
const fp = require("fastify-plugin")

const whiteRoute = [
  'users/login'
]

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/jwt"), {
    secret: "hanyial-admin"
  })

  // fastify.decorate("authenticate", async function(request, reply) {
  //   try {
  //     await request.jwtVerify()
  //   } catch (err) {
  //     reply.send(err)
  //   }
  // })

  fastify.addHook("onRequest", async (request, reply) => {
    if (whiteRoute.findIndex(route => request.url.includes(route)) === -1) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply
          .code(err.statusCode)
          .send({
            code: err.code,
            message: err.message,
            data: null
          })
      }
    }

  })
})