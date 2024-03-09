

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Promotores = require('./promotores.model');
const Usuarios = require('./usuario.model');

const Enlaces = sequelizeCrm.define('Enlaces', {
    // Model attributes are defined here
    idEnlace: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey:true
    },

    nombres: {
        type: DataTypes.STRING,
        allowNull: false
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

    problematica: {
        type: DataTypes.STRING
    },
   
    fechaAlta: {
        type: DataTypes.DATE
    },

    activo: {
        type: DataTypes.BOOLEAN
    },

    idPromotorEnalce:{
        type: DataTypes.INTEGER
    },

    idUsuario:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});


Enlaces.belongsTo(Promotores,{as: 'Promotor', foreignKey: 'idPromotorEnalce'});
Enlaces.belongsTo(Usuarios,{as: 'CreadoPor', foreignKey: 'idUsuario'});
module.exports = Enlaces;
