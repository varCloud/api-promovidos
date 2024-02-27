const { Sequelize, DataTypes } = require('sequelize')
const sequelizeCrm = require('../config/sequelize.crm')
const Cliente = require('./clientes.model')
const TipoServicio = require('./tiposervicios.model')
const Usuario = require('./usuario.model')
const TipoSeguimiento = require('./tipoSeguimiento.model')
const Instructor = require('./instructores.model')
const Curso = require('./cursos.model')

const Cotizaciones = sequelizeCrm.define('cotizaciones', {
    idCotizacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    Cotizacionescol: {
        type: DataTypes.STRING,
    },
    contactoInicial: {
        type: DataTypes.STRING,
    },
    datosFormalizacion: {
        type: DataTypes.STRING,
    },
    anticipo: {
        type: DataTypes.INTEGER
    },
    cantidadAnticipo: {
        type: DataTypes.STRING,
    },
    montoServicio: {
        type: DataTypes.FLOAT
    },
    requiereFactura: {
        type: DataTypes.INTEGER
    },
    observaciobesBiaticos: {
        type: DataTypes.STRING,
    },
    observacionesGastos: {
        type: DataTypes.STRING,
    },
    observacionesObsequios: {
        type: DataTypes.STRING,
    },
    observaciobesOtros: {
        type: DataTypes.STRING,
    },
    nosConoce: {
        type: DataTypes.STRING,
    },
    referencia: {
        type: DataTypes.STRING,
    },
    visitoWeb: {
        type: DataTypes.INTEGER
    },
    idCliente: {
        type: DataTypes.INTEGER
    },
    idTipoServicio: {
        type: DataTypes.INTEGER
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    idTipoSeguimiento: {
        type: DataTypes.INTEGER
    },
    idInstructor: {
        type: DataTypes.INTEGER
    },
    idCurso: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
})

Cotizaciones.belongsTo(Cliente, { as: 'Cliente', foreignKey: 'idCliente' })
Cotizaciones.belongsTo(TipoServicio, { as: 'TipoServicio', foreignKey: 'idTipoServicio' })
Cotizaciones.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'idUsuario' })
Cotizaciones.belongsTo(TipoSeguimiento, { as: 'TipoSeguimiento', foreignKey: 'idTipoSeguimiento' })
Cotizaciones.belongsTo(Instructor, { as: 'Instructor', foreignKey: 'idInstructor' })
Cotizaciones.belongsTo(Curso, { as: 'Curso', foreignKey: 'idCurso' })

module.exports = Cotizaciones;