/*
 * @Author: Peihua
 * @Date: 2024-12-15 12:32:22
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 14:20:50
 * @FilePath: \be\models\Logistics.model.js
 * @Description: 
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Address = require("./Address.model.js");

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
});

Logistics.belongsTo(Address, { as: 'doorPickupParam' });
Logistics.belongsTo(Address, { as: 'senderParam' });
Logistics.belongsTo(Address, { as: 'receiverParam' });
Logistics.belongsTo(Address, { as: 'returnerParam' });

module.exports = Logistics;