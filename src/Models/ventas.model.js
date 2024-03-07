const { Sequelize, DataTypes } = require('sequelize')
const sequelizeCrm = require('../config/sequelize.crm')

const Instructor = require('./instructores.model')
const Usuario = require('./usuario.model')

const Ventas = sequelizeCrm.define('ventas', {
    idVenta: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    fechaAlta: {
        type: DataTypes.DATE
    },
    fechaEjecucion: {
        type: DataTypes.DATE
    },
    resultadoCalidad: {
        type: DataTypes.STRING
    },
    contactoPosterior: {
        type: DataTypes.STRING
    },
    idInstructor: {
        type: DataTypes.INTEGER
    },
    idCotizacion: {
        type: DataTypes.INTEGER
    },
    Usuarios_idUsuario: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
})

Ventas.belongsTo(Instructor, { as: 'Instructor', foreignKey: 'idInstructor' })
Ventas.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'Usuarios_idUsuario' })

module.exports = Ventas