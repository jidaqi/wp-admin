// import S from "fluent-json-schema";
const S = require('fluent-json-schema')
const { dev, prod } = require('../../config')
const crypto = require('crypto')
const { URLSearchParams } = require('url')

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

module.exports = async function (
  fastify,
  opts
) {
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
              addressSchema.required()
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
          addressSchema.required()
        )
        .prop(
          "receiverParam", // 收件人信息
          addressSchema.required()
        )
        .prop(
          "returnerParam", // 退件人信息
          addressSchema.required()
        ),
    },
    handler: async (request, reply) => {
      const body = request.body

      const timestamp = Date.now()

      const logistics_interface = JSON.stringify({
        outOrderId: `hanyial_${timestamp}`,
        ...body
      })

      const data_digest = md5(logistics_interface, prod.appSecret)


      const reqData = {
        logistic_provider_id: prod.logistic_provider_id,
        msg_type: 'cnge.order.create',
        from_code: 'SANDBOX477847',
        to_code: 'CNGCP-OPEN',
        data_digest,
        logistics_interface
      }

      const params = new URLSearchParams()
      params.append('from_code', '477847')
      params.append('to_code', 'CNGCP-OPEN')
      params.append('data_digest', data_digest)

      const url = prod.url
      // + `?${params.toString()}`
      const { status, data } = await fastify.axios.post(url, { ...reqData }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      return {
        status,
        data,
        reqData,
        url
      }
    },
  });
};