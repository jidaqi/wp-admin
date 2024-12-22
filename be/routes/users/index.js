/*
 * @Author: Peihua
 * @Date: 2024-12-22 20:49:43
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-22 22:09:12
 * @FilePath: \be\routes\users\index.js
 * @Description: 
 */
const userInfo = {
  account: 'admin',
  password: 'Admin##hanyial..'
}

module.exports = async function (fastify, opts) {
  fastify.post('/login', async function (request, reply) {
    const body = request.body

    if (!body.account) {
      reply.send({
        code: -1,
        message: '请输入账号',
        data: null
      })
    } else if (!body.password) {
      reply.send({
        code: -1,
        message: '请输入密码'
      })
    }

    if (userInfo.account === body.account && userInfo.password === body.password) {
      const payload = body
      const token = fastify.jwt.sign({ payload })
      reply.send({
        code: 0,
        message: '登录成功！',
        data: token
      })
    } else {
      reply.send({
        code: -1,
        message: '账号密码错误'
      })
    }
  })
}
