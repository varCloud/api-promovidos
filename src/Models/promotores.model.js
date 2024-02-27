

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

    distritoSeccion: {
        type: DataTypes.STRING,
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
    idUsuario: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
});


Promotores.belongsTo(Usuarios,{as: 'Usuario', foreignKey: 'idUsuario'});
module.exports = Promotores;
