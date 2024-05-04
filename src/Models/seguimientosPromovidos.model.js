

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Promovidos = require('./promovidos.model');
const Usuarios = require('./usuario.model');

const SeguimientosPromovidos = sequelizeCrm.define('seguimientospromovidos', {
    // Model attributes are defined here
    idSeguimientoPromovido: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
    },
    
    observaciones: {
        type: DataTypes.STRING,
    },

    vota: {
        type: DataTypes.BOOLEAN,    
    },


    fechaAlta: {
        type: DataTypes.DATE,
        allowNull:true
    },

    activo: {
        type: DataTypes.BOOLEAN,
        allowNull:true
    },

    idPromovido:{
        type: DataTypes.INTEGER
    },

    creadoPor:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});


SeguimientosPromovidos.belongsTo(Promovidos,{as: 'Promovido', foreignKey: 'idPromovido'});
SeguimientosPromovidos.belongsTo(Usuarios,{as: 'Usuario', foreignKey: 'creadoPor'});
module.exports = SeguimientosPromovidos;
