/*
 * @Author: Peihua
 * @Date: 2024-12-15 09:18:51
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 13:49:55
 * @FilePath: \be\db\database.js
 * @Description: 数据库配置
 */
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('node:path');

const logStream = fs.createWriteStream(path.join(__dirname, '../logs/db.log'), { flags: 'a' })

const sequelize = new Sequelize('admin', 'admin', 'admin', {
  host: 'db',
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
  logging: msg => {
    logStream.write(`DB Log: ${new Date().toISOString()} - ${msg}\n`);
  }
});

module.exports = sequelize;