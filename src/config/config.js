const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env')
});



module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3008,
  /*BD*/
  HOST_BD: process.env.HOST_BD,
  USER_BD: process.env.USER_BD,
  PASSWORD_BD: process.env.PASSWORD_BD,
  DATABASE: process.env.DATABASE,
  PORT_BD: process.env.PORT_BD,
  /*Token */
  JWT_KEY: process.env.JWT_KEY || 'Ultr4GriD_dev',
  /*API_WEBHOOK*/
  API_WEBHOOK: process.env.API_WEBHOOK
}

console.log("variables de entorno ::::",module.exports);