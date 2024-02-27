const { Sequelize, DataTypes } = require('sequelize')
const sequelizeCrm = require('../config/sequelize.crm')
const TipoClientes = require('./tipoClientes.model')

const Clientes = sequelizeCrm.define('clientes', {
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    razonSocial: {
        type: DataTypes.STRING
    },
    contacto: {
        type: DataTypes.STRING
    },
    esPersonaMoral: {
        type: DataTypes.INTEGER
    },
    telefono: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    },
    fechaAlta: {
        type: DataTypes.DATE
    },
    fechaActualizacion: {
        type: DataTypes.DATE
    },
    idTipoCliente: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
})

Clientes.belongsTo(TipoClientes, { as: 'TipoClientes', foreignKey: 'idTipoCliente' })
module.exports = Clientes