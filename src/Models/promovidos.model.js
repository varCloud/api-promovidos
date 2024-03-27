

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Promotores = require('./promotores.model');
const Usuarios = require('./usuario.model');

const   Promovidos = sequelizeCrm.define('Promovidos', {
    // Model attributes are defined here
    idPromovido: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey:true
    },

    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING
    },
    calle: {
        type: DataTypes.STRING
    },

    colonia: {
        type: DataTypes.STRING
    },

    cp: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    seccion: {
        type: DataTypes.STRING
    },
    redesSociales: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.STRING
    },
    fechaNacimiento: {
        type: DataTypes.DATE
    },
    fechaAlta: {
        type: DataTypes.DATE
    },
    vota: {
        type: DataTypes.BOOLEAN
    },
    activo: {
        type: DataTypes.BOOLEAN
    },
    idPromotor:{
        type: DataTypes.INTEGER
    },
    creadoPor:{
        type: DataTypes.INTEGER
    },
    latitud: {
        type: DataTypes.STRING
    },
    longitud: {
        type: DataTypes.STRING
    },
    direccionMapa: {
        type: DataTypes.STRING
    },
    placeId: {
        type: DataTypes.STRING
    },
    idRol: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
});


Promovidos.belongsTo(Promotores,{as: 'Promotor', foreignKey: 'idPromotor'});
Promovidos.belongsTo(Usuarios,{as: 'CreadoPor', foreignKey: 'creadoPor'});
module.exports = Promovidos;
