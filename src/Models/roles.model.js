const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const Roles = sequelizeCrm.define('roles', {
    // Model attributes are defined here
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
        
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

module.exports = Roles;