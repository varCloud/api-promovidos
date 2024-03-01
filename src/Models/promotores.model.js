

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Usuarios = require('./usuario.model');

const Promotores = sequelizeCrm.define('promotores', {
    // Model attributes are defined here
    idPromotor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
    },

    seccion: {
        type: DataTypes.STRING,
    },
    genero: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    fechaNacimiento: {
        type: DataTypes.DATE
    },
    redesSociales: {
        type: DataTypes.DATE
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    creadoPor:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});


Promotores.belongsTo(Usuarios,{as: 'Usuario', foreignKey: 'idUsuario'});
Promotores.belongsTo(Usuarios,{as: 'CreadoPor', foreignKey: 'creadoPor'});
module.exports = Promotores;
