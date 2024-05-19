const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const coalicionesPartidos = require('./coaliconesPartidos.model')
const casillas = require('./casillas.model')

const Votos = sequelizeCrm.define('votos', {
  idVoto: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  idCoalicionPartido: {
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

Votos.belongsTo(coalicionesPartidos, { as: 'CoalicionPartido', foreignKey: 'idCoalicionPartido' })
Votos.belongsTo(casillas, { as: 'Casilla', foreignKey: 'idCasilla' })

module.exports = Votos