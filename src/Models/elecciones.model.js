const sequelizeCrm = require("../config/sequelize.crm");
const { DataTypes } = require('sequelize');

const elecciones = sequelizeCrm.define('elecciones', {
  idElecciones: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  anio: {
    type: DataTypes.INTEGER
  },
  fechaAlta: {
    type: DataTypes.DATE
  },
  activo: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
})

module.exports = elecciones
