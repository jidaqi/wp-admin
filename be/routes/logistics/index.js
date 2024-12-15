const S = require('fluent-json-schema')
const cainiaoConfig = require('../../config')
const crypto = require('crypto')
const Logistics = require('../../models/Logistics.model.js')
const Address = require('../../models/Address.model.js')
const { Op } = require("sequelize")

function md5(content, keys, charset = 'utf-8') {
  let sign = null;
  content = content + keys;

  try {
    const md5sum = crypto.createHash('md5');
    md5sum.update(content, charset);
    sign = md5sum.digest('base64');
  } catch (e) {
    throw new Error(e);
  }

  return sign;
}


const addressSchema =
  S.object()
    .prop("name", S.string()) // 姓名
    .prop("zipCode", S.string()) // 邮编
    .prop("countryCode", S.string()) // 两位ISO国家码
    .prop("state", S.string()) // 州/省
    .prop("city", S.string()) // 城市
    .prop("detailAddress", S.string()) // 详细地址
    .prop("telephone", S.string()) // 电话
    .prop("district", S.string()) // 区级
    .prop("street", S.string()) // 街道

module.exports = async function (
  fastify,
  opts
) {

  // 创建物流单
  fastify.route({
    method: "post",
    url: "/add",
    schema: {
      body: S.object()
        .prop(
          "solutionParam", // 解决方案信息
          S.object()
            .prop("solutionCode", S.string())
            .required()
            .prop(
              "doorPickupParam", // 上门揽收信息
              addressSchema
            )
        )
        .required()
        .prop(
          "packageParams",
          S.array().items(
            S.object()
              .prop("weight", S.number()).required()
              .prop(
                "itemParams",
                S.array().items(
                  S.object()
                    .prop("quantity", S.number()) // 数量
                    .prop("englishName", S.string()) // 商品英文名
                    .prop("unitPrice", S.number()) // 单价/分
                    .prop("unitPriceCurrency", S.string()) // 单位单价币种
                )
              )
          ).required()
        )
        .prop(
          "senderParam", // 发件人信息
          addressSchema
        )
        .prop(
          "receiverParam", // 收件人信息
          addressSchema
        )
        .prop(
          "returnerParam", // 退件人信息
          addressSchema
        ),
    },
    handler: async (request, reply) => {
      const body = request.body

      const timestamp = Date.now()

      const logistics_interface = {
        outOrderId: `hanyial_${timestamp}`,
        ...body
      }

      request.log.info({ cainiaoEnv: cainiaoConfig })

      const data_digest = md5(JSON.stringify(logistics_interface), cainiaoConfig.appSecret)

      const reqData = {
        logistic_provider_id: cainiaoConfig.logistic_provider_id,
        msg_type: 'cnge.order.create',
        to_code: 'CNGCP-OPEN',
        data_digest,
        logistics_interface: JSON.stringify(logistics_interface)
      }

      const url = cainiaoConfig.url
      const { status, data } = await fastify.axios.post(url, { ...reqData }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (status !== 200) {
        reply.send({
          code: -1,
          data: null,
          message: '第三方服务调用失败'
        })
      }

      if (data && data?.data && data?.success === 'true') {
        await Logistics.create(
          {
            outOrderId: logistics_interface.outOrderId,
            solutionCode: body.solutionParam.solutionCode,
            packageParams: body.packageParams,
            doorPickupParam: body.solutionParam.doorPickupParam,
            senderParam: body.senderParam,
            receiverParam: body.receiverParam,
            returnerParam: body.returnerParam,
            ...data.data
          }, {
            include: [
              { model: Address, as: 'senderParam' },
              { model: Address, as: 'doorPickupParam' },
              { model: Address, as: 'receiverParam' },
              { model: Address, as: 'returnerParam' },
            ]
          })
        const LogisticsData = await Logistics.findAll({
          include: [
            { model: Address, as: 'senderParam' },
            { model: Address, as: 'doorPickupParam' },
            { model: Address, as: 'receiverParam' },
            { model: Address, as: 'returnerParam' },
          ]
        })
        reply.send({
          code: 0,
          data: null,
          message: '订单创建成功',
          database: LogisticsData
        })
      } else {
        request.log.error({ 'CreateLogisticsError': data })
        reply.send({
          code: -1,
          data: null,
          message: `errorCode: ${data.errorCode} errorMsg: ${data.errorMsg}`
        })
      }
    },
  });

  // 查询物流单列表
  fastify.route({
    url: '/list',
    method: 'get',
    handler: async (request, reply) => {
      const query = request.query
      request.log.info({ query })

      const page = query.page ? Number(query.page) : 1
      const pageSize = query.pageSize ? Number(query.pageSize) : 20

      const where = {}

      if (query.orderCode) {
        where.orderCode = { [Op.eq]: query.orderCode }
      }
      if (query.solutionCode) {
        where.solutionCode = { [Op.eq]: query.solutionCode }
      }

      const LogisticsData = await Logistics.findAndCountAll({
        where,
        include: [
          { model: Address, as: 'senderParam' },
          { model: Address, as: 'doorPickupParam' },
          { model: Address, as: 'receiverParam' },
          { model: Address, as: 'returnerParam' },
        ],
        limit: pageSize,
        offset: pageSize * (page - 1),
        order: [ [ 'createdAt', 'DESC' ]]
      })

      reply.send({
        code: 0,
        data: {
          ...LogisticsData,
          page,
          pageSize
        },
        message: 'success'
      })
    }
  })

  // 取消物流单
  fastify.route({
    method: 'post',
    url: '/cancel',
    schema: {
      body: S.object()
        .prop("orderCode", S.string()) // 物流订单号
        .required()
    },
    handler: async (request, reply) => {
      const body = request.body

      const logistics_interface = {
        orderCode: body.orderCode,
        locale: 'zh_CN'
      }

      request.log.info({ cainiaoEnv: cainiaoConfig })

      const data_digest = md5(JSON.stringify(logistics_interface), cainiaoConfig.appSecret)

      const reqData = {
        logistic_provider_id: cainiaoConfig.logistic_provider_id,
        msg_type: 'cnge.order.cancel',
        to_code: 'CNGCP-OPEN',
        data_digest,
        logistics_interface: JSON.stringify(logistics_interface)
      }

      const url = cainiaoConfig.url
      const { status, data } = await fastify.axios.post(url, { ...reqData }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (status !== 200) {
        reply.send({
          code: -1,
          data: null,
          message: '第三方服务调用失败'
        })
      }

      if (data && data?.success === 'true') {
        reply.send({
          code: 0,
          data: null,
          message: '取消成功'
        })
      } else {
        request.log.error({ 'CancelLogisticsError': data })
        reply.send({
          code: -1,
          data: null,
          message: `errorCode: ${data.errorCode} errorMsg: ${data.errorMsg}`
        })
      }
    }
  })

  fastify.route({
    url: '/callback',
    method: 'post',
    handler: (request, reply) => {
      const body = request.body
      request.log.info({ cainiaoCALLBACK: body })
    }
  })

  fastify.route({
    url: '/track',
    method: 'get',
    schema: {
      query: S.object()
        .prop("orderCode", S.string()) // 物流订单号
        .required()
    },
    handler: async (request, reply) => {
      const body = request.query

      const logistics_interface = {
        orderCode: body.orderCode,
        locale: 'zh_CN',
        onlyOfficialNode: true
      }

      request.log.info({ cainiaoEnv: cainiaoConfig })

      const data_digest = md5(JSON.stringify(logistics_interface), cainiaoConfig.appSecret)

      const reqData = {
        logistic_provider_id: cainiaoConfig.logistic_provider_id,
        msg_type: 'cnge.track.get',
        to_code: 'TRACK',
        data_digest,
        logistics_interface: JSON.stringify(logistics_interface)
      }

      const url = cainiaoConfig.url
      const { status, data } = await fastify.axios.post(url, { ...reqData }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (status !== 200) {
        reply.send({
          code: -1,
          data: null,
          message: '第三方服务调用失败'
        })
      }

      if (data && data.data && data?.success === 'true') {
        reply.send({
          code: 0,
          data: data.data,
          message: 'Success'
        })
      } else {
        request.log.error({ 'CancelLogisticsError': data })
        reply.send({
          code: -1,
          data: null,
          message: `errorCode: ${data.errorCode} errorMsg: ${data.errorMsg}`
        })
      }
    }
  })
};