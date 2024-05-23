const { DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const catPartidos = require('./catPartidos.model')
const coaliciones = require('./coaliciones.model')
const votos = require('./votos.model')

const coalicionesPartidos = sequelizeCrm.define('coalicionespartidos', {
  idCoalicionPartido: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  idCoalicion: {
    type: DataTypes.INTEGER,
  },
  idPartido: {
    type: DataTypes.INTEGER,
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

coalicionesPartidos.belongsTo(catPartidos, { as: 'Partidos' , foreignKey: 'idPartido' })
coalicionesPartidos.belongsTo(coaliciones, { as: 'Coaliciones', foreignKey: 'idCoalicion' })
coalicionesPartidos.belongsTo(votos, {as: 'Votos', foreignKey: 'idCoalicion', targetKey:'idCoalicion'})


module.exports = coalicionesPartidos