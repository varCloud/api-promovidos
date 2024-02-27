const { Sequelize, DataTypes } = require('sequelize')
const sequelizeCrm = require('../config/sequelize.crm')
const cotizacion = require('./cotizaciones.model')
const usuario = require('./usuario.model')

const calCotizaciones = sequelizeCrm.define('calculo_cotizaciones', {
    idCalculoCotizacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.STRING
    },
    requiereFactura: {
        type: DataTypes.INTEGER
    },
    fechaAlta: {
        type: DataTypes.DATE
    },
    idCotizacion: {
        type: DataTypes.INTEGER
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
})

calCotizaciones.belongsTo(cotizacion, { as: 'cotizacion', foreignKey: 'idCotizacion' })
calCotizaciones.belongsTo(usuario, { as: 'usuario', foreignKey: 'idUsuario' })
module.exports = calCotizaciones