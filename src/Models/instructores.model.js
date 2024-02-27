const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');

const Instructores = sequelizeCrm.define('instructores', {
    idInstructor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING
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
    observaciones: {
        type: DataTypes.STRING
    },

    activo: {
        type: DataTypes.INTEGER
    },

    fechaAlta: {
        type: DataTypes.DATE
    }

}, {
    timestamps: false
});

module.exports = Instructores;