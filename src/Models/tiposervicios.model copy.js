const { Sequelize, DataTypes } = require('sequelize')
const sequelizeCrm = require('../config/sequelize.crm')

const Tiposervicios = sequelizeCrm.define('cat_tipo_servicios', {
    idTipoServicios: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
})

module.exports = Tiposervicios;