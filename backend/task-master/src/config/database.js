const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); 
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];


const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  logging: false,
  timezone: "-03:00",
});

module.exports = sequelize;
