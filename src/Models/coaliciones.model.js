const sequelizeCrm = require("../config/sequelize.crm");
const { DataTypes } = require('sequelize');
const elecciones = require('./elecciones.model')


const coaliciones = sequelizeCrm.define('coaliciones', {
  idCoalicion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fechaAlta: {
    type: DataTypes.DATE
  },
  activo: {
    type: DataTypes.INTEGER
  },
  idEleccion: {
    type: DataTypes.INTEGER
  },
  order: {
    type: DataTypes.INTEGER
  },
}, {
  timestamps: false
})

coaliciones.belongsTo(elecciones, { as: 'elecciones', foreignKey: 'idEleccion' })

module.exports = coaliciones