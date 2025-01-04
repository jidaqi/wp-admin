/*
 * @Author: Peihua
 * @Date: 2024-12-15 12:32:22
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-04 22:04:02
 * @FilePath: \be\models\Logistics.model.js
 * @Description: 
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Address = require("./Address.model.js");
const User = require("./User.model.js");

const Logistics = sequelize.define('Logistics', {
  outOrderId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '菜鸟外单id'
  },
  solutionCode: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '解决方案信息'
  },
  packageParams: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '包裹信息'
  },
  orderCode: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '菜鸟订单号',
  },
  trackingNumber: {
    type: DataTypes.STRING,
    comment: '末公里运单号',
  },
  userSortCode: {
    type: DataTypes.STRING,
    comment: '组包码',
  },
  sortCode: {
    type: DataTypes.STRING,
    comment: '分拣码',
  },
  laneCode: {
    type: DataTypes.STRING,
    comment: '渠道code',
  },
  laneName: {
    type: DataTypes.STRING,
    comment: '渠道name',
  },
  laneLastMileCP: {
    type: DataTypes.STRING,
    comment: '渠道末公里cp',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '关联的用户ID'
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
});

Logistics.belongsTo(Address, { as: 'doorPickupParam' });
Logistics.belongsTo(Address, { as: 'senderParam' });
Logistics.belongsTo(Address, { as: 'receiverParam' });
Logistics.belongsTo(Address, { as: 'returnerParam' });

User.hasMany(Logistics, { foreignKey: 'userId' });
Logistics.belongsTo(User, { foreignKey: 'userId' });

module.exports = Logistics;