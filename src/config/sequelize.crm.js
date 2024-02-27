const { Sequelize } = require('sequelize');


const config = require('./config');

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

Sequelize.prototype.close = function () {
  this.connectionManager.close();
};

console.log(`${JSON.stringify(config.HOST_BD)}`)
const sequelizeCrm=new Sequelize(config.DATABASE, config.USER_BD, config.PASSWORD_BD, {
  host: config.HOST_BD,
  port:config.PORT_BD,
  dialect: 'mysql',
  dialectOptions: {
    encrypt: true,
    options: {
      validateBulkLoadParameters: true
    },
  },
  logging: false,
  omitNull: true,
  timestamps: false
});


async function check(){

    try {
        await sequelizeCrm.authenticate();
        console.log('Connection has been established successfully. by Sequalize CRM ...');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    

}
check();
module.exports = sequelizeCrm
