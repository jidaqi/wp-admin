// import S from "fluent-json-schema";
const S = require('fluent-json-schema')

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

      return {
        status: 200,
        body
      }
    },
  });
};
