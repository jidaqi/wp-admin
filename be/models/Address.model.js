const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Address = sequelize.define('Address', {
  name: {
    type: DataTypes.TEXT,
    comment: '姓名'
  },
  zipCode: {
    type: DataTypes.TEXT,
    comment: '邮编'
  },
  countryCode: {
    type: DataTypes.TEXT,
    comment: '国家ISO码'
  },
  state: {
    type: DataTypes.TEXT,
    comment: '州/省'
  },
  city: {
    type: DataTypes.TEXT,
    comment: '城市'
  },
  detailAddress: {
    type: DataTypes.TEXT,
    comment: '详细地址'
  },
  telephone: {
    type: DataTypes.TEXT,
    comment: '电话'
  },
  district: {
    type: DataTypes.TEXT,
    comment: '区级'
  },
  street: {
    type: DataTypes.TEXT,
    comment: '街道'
  },
});

module.exports = Address;