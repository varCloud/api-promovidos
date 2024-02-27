

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Promotores = require('./promotores.model');

const Promovidos = sequelizeCrm.define('Promovidos', {
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
    direccion: {
        type: DataTypes.STRING
    },
    celular: {
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
    vota: {
        type: DataTypes.BOOLEAN
    },
    activo: {
        type: DataTypes.BOOLEAN
    },
    idPromotor:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});


Promovidos.belongsTo(Promotores,{as: 'Promotor', foreignKey: 'idPromotor'});
module.exports = Promovidos;
