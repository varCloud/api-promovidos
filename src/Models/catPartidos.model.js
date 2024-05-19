const sequelizeCrm = require("../config/sequelize.crm");
const { DataTypes } = require('sequelize');

const catPartidos = sequelizeCrm.define('catpartidos', {
  idPartido: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.TEXT
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  logo: {
    type: DataTypes.BLOB
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

module.exports = catPartidos
