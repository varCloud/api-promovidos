const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const casillas = require('./casillas.model');
const coaliciones = require('./coaliciones.model');

const Votos = sequelizeCrm.define('votos', {
  idVoto: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },

  idCoalicion: {
    type: DataTypes.INTEGER
  },
  numeroVotos: {
    type: DataTypes.FLOAT
  },
  idElecciones: {
    type: DataTypes.INTEGER
  },
  fechaAlta: {
    type: DataTypes.DATE
  },
  activo: {
    type: DataTypes.TINYINT
  },
  idCasilla: {
    type: DataTypes.INTEGER
  },
}, {
  timestamps: false
})

Votos.belongsTo(coaliciones, { as: 'Coaliciones', foreignKey: 'idCoalicion' })
Votos.belongsTo(casillas, { as: 'Casilla', foreignKey: 'idCasilla' })

module.exports = Votos