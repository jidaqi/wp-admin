const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户ID'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '账号'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户密码'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: '创建时间'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    comment: '更新时间'
  }
})

// 静态方法：检查并创建默认用户
User.createDefaultUser = async function (fastify) {
  try {
    const userCount = await this.count(); // 检查 User 表是否为空
    if (userCount === 0) {
      // 如果 User 表为空，创建默认用户
      await this.create({
        username: 'Admin',
        account: 'admin',
        password: 'Admin##hanyial..' // 注意：实际应用中密码应该加密存储
      });
      fastify.log.info('默认用户创建成功！'); // 使用 Fastify 日志记录
    } else {
      fastify.log.info('User 表中已有数据，无需创建默认用户。'); // 使用 Fastify 日志记录
    }
  } catch (error) {
    fastify.log.error('创建默认用户时出错：', error); // 使用 Fastify 日志记录
  }
};


module.exports = User;