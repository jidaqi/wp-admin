/*
 * @Author: Peihua
 * @Date: 2024-12-15 14:32:18
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 14:36:31
 * @FilePath: \be\routes\common\index.js
 * @Description: 
 */
module.exports = async function (
  fastify,
  opts
) {
  fastify.route({
    url: '/solution',
    method: 'get',
    handler: async (request, reply) => {
      const MAP = [
        { label: '菜鸟国际快递_快线_普货', value: 'CN_GLO_EXP' },
        { label: '菜鸟国际快递_快线_带电', value: 'CN_GLO_EXP_BAT' },
        { label: '菜鸟国际快递_标准_普货', value: 'CN_GLO_STD' },
        { label: '菜鸟国际快递_标准_带电', value: 'CN_GLO_STD_BAT' },
        { label: '菜鸟国际快递_简易_普货', value: 'CN_GLO_SAV' },
        { label: '菜鸟国际快递_简易_带电', value: 'CN_GLO_SAV_BAT' },
        { label: '菜鸟国际快递_美妆专线', value: 'CN_GLO_BEAUTY' },
        { label: '菜鸟国际快递_服装专线', value: 'CN_GLO_CLOTHES' },
      ]

      reply.send({
        code: 0,
        data: MAP,
        message: 'success'
      })
    }
  })
}