const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');

const Roles = require('./roles.model');

const Usuarios = sequelizeCrm.define('usuarios', {
    // Model attributes are defined here
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
    },

    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
     apellidos: {
         type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    usuario: {
        type: DataTypes.STRING
    },
    contrasena: {
        type: DataTypes.STRING
    },
    idRol: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
});


Usuarios.belongsTo(Roles,{as: 'Roles', foreignKey: 'idRol'});
module.exports = Usuarios;
