const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const coalicion = require('./coaliciones.model')
const elecciones = require('./elecciones.model')
const seccion = require('./secciones.model')

const VotosSecciones = sequelizeCrm.define('votossecciones', {
  idVoto: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idCoalicion: {
    type: DataTypes.INTEGER,
  },
  numeroVotos: {
    type: DataTypes.INTEGER
  },
  idElecciones:{
    type: DataTypes.INTEGER
  },
  fechaAlta: {
    type: DataTypes.DATE
  },
  activo: {
    type: DataTypes.BOOLEAN
  },
  idSeccion: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: false
});

VotosSecciones.belongsTo(coalicion, {as: 'Coalicion', foreignKey: 'idCoalicion'})
VotosSecciones.belongsTo(elecciones, {as: 'Elecciones', foreignKey: 'idElecciones'})
VotosSecciones.belongsTo(seccion, {as: 'Seccion', foreignKey: 'idSeccion'})

module.exports = VotosSecciones;