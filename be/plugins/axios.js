const fp = require('fastify-plugin')
const axios = require('fastify-axios')
const { dev, prod } = require('../config')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-axios'))
})
