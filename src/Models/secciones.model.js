const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');

const Secciones = sequelizeCrm.define('secciones', {
  idSeccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  seccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Secciones;