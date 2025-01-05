/*
 * @Author: Peihua
 * @Date: 2025-01-04 19:47:11
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-06 00:28:20
 * @FilePath: \be\routes\users\index.js
 * @Description: 
 */
const S = require('fluent-json-schema')
const User = require('../../models/User.model')
const { Op } = require("sequelize")

module.exports = async function (fastify, opts) {
  fastify.post('/login', async function (request, reply) {
    const { account, password } = request.body;

    // 校验输入
    if (!account) {
      return reply.send({
        code: -1,
        message: '请输入账号',
        data: null
      });
    }
    if (!password) {
      return reply.send({
        code: -1,
        message: '请输入密码',
        data: null
      });
    }

    try {
      // 从数据库中查找用户
      const user = await User.findOne({
        where: { account }
      });

      // 检查用户是否存在
      if (!user) {
        return reply.send({
          code: -1,
          message: '账号不存在',
          data: null
        });
      }

      // 检查密码是否正确（假设密码是明文存储，实际应用中应使用加密比较）
      if (user.password !== password) {
        return reply.send({
          code: -1,
          message: '账号或密码错误',
          data: null
        });
      }

      // 生成 JWT 令牌
      const token = fastify.jwt.sign({ userId: user.id, account: user.account });

      // 返回成功响应
      reply.send({
        code: 0,
        message: '登录成功！',
        data: {
          token,
          username: user?.username,
          account: user?.account
        }
      });
    } catch (error) {
      console.log(error)
      fastify.log.error('登录时出错：', JSON.stringify(error));
      reply.status(500).send({
        code: -1,
        message: '服务器内部错误',
        data: null
      });
    }
  });

  fastify.route({
    url: '/list',
    method: 'get',
    schema: {
      querystring: S.object()
        .prop('username', S.string().description('用户名（模糊查询）'))
        .prop('account', S.string().description('账号（模糊查询）'))
        .prop('page', S.number().minimum(1).default(1).description('当前页码'))
        .prop('pageSize', S.number().minimum(1).maximum(100).default(20).description('每页条数')),
      response: {
        200: S.object()
          .prop('code', S.number().description('状态码（0 表示成功）'))
          .prop('data', S.object()
            .prop('rows', S.array().items(
              S.object()
                .prop('id', S.number().description('用户ID'))
                .prop('username', S.string().description('用户名'))
                .prop('account', S.string().description('账号'))
                .prop('createdAt', S.string().format('date-time').description('创建时间'))
                .prop('updatedAt', S.string().format('date-time').description('更新时间'))
            ))
            .prop('count', S.number().description('总条数'))
            .prop('page', S.number().description('当前页码'))
            .prop('pageSize', S.number().description('每页条数'))
          )
          .prop('message', S.string().description('响应消息')),
        500: S.object()
          .prop('code', S.number().description('状态码（-1 表示失败）'))
          .prop('message', S.string().description('错误消息'))
      }
    },
    handler: async (request, reply) => {
      const query = request.query;
      request.log.info({ query }); // 记录查询参数

      // 分页参数
      const page = query.page ? Number(query.page) : 1; // 当前页码，默认为 1
      const pageSize = query.pageSize ? Number(query.pageSize) : 20; // 每页条数，默认为 20

      // 查询条件
      const where = {};

      if (query.username) {
        where.username = { [Op.like]: `%${query.username}%` }; // 模糊查询 username
      }
      if (query.account) {
        where.account = { [Op.like]: `%${query.account}%` }; // 模糊查询 account
      }

      try {
        // 查询用户列表
        const userData = await User.findAndCountAll({
          where, // 查询条件
          limit: pageSize, // 每页条数
          offset: pageSize * (page - 1), // 偏移量
          order: [['createdAt', 'DESC']], // 按创建时间倒序排列
        });

        // 返回结果
        reply.send({
          code: 0,
          data: {
            rows: userData.rows, // 当前页的用户数据
            count: userData.count, // 总条数
            page, // 当前页码
            pageSize, // 每页条数
          },
          message: 'success',
        });
      } catch (error) {
        request.log.error('查询用户列表时出错：', error); // 记录错误日志
        reply.status(500).send({
          code: -1,
          data: null,
          message: '服务器内部错误',
        });
      }
    },
  });

  fastify.route({
    method: 'POST',
    url: '/add',
    schema: {
      body: S.object()
        .prop('username', S.string().required().description('用户名'))
        .prop('account', S.string().required().description('账号'))
        .prop('password', S.string().required().description('密码')),
      response: {
        200: S.object()
          .prop('code', S.number().description('状态码（0 表示成功）'))
          .prop('message', S.string().description('响应消息'))
          .prop('data', S.object()
            .prop('id', S.number().description('用户ID'))
            .prop('username', S.string().description('用户名'))
            .prop('account', S.string().description('账号'))
            .prop('createdAt', S.string().format('date-time').description('创建时间'))
          ),
        400: S.object()
          .prop('code', S.number().description('状态码（-1 表示失败）'))
          .prop('message', S.string().description('错误消息')),
        500: S.object()
          .prop('code', S.number().description('状态码（-1 表示失败）'))
          .prop('message', S.string().description('错误消息'))
      }
    },
    handler: async (request, reply) => {
      const { username, account, password } = request.body;

      try {
        // 检查账号是否已存在
        const existingUser = await User.findOne({
          where: { account }
        });

        if (existingUser) {
          return reply.status(400).send({
            code: -1,
            message: '账号已存在',
            data: null
          });
        }

        // 检查用户名是否已存在
        const existingUsername = await User.findOne({
          where: { username }
        });

        if (existingUsername) {
          return reply.status(400).send({
            code: -1,
            message: '用户名已存在',
            data: null
          });
        }

        // 创建新用户
        const newUser = await User.create({
          username,
          account,
          password // 注意：实际应用中密码应加密存储
        });

        // 返回成功响应
        reply.send({
          code: 0,
          message: '用户创建成功',
          data: {
            id: newUser.id,
            username: newUser.username,
            account: newUser.account,
            createdAt: newUser.createdAt
          }
        });
      } catch (error) {
        fastify.log.error('创建用户时出错：', error);
        reply.status(500).send({
          code: -1,
          message: '服务器内部错误',
          data: null
        });
      }
    }
  });
};