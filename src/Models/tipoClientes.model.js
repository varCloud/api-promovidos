const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');

const tipoClientes = sequelizeCrm.define('cat_tipo_clientes', {
    idTipoCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true
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

module.exports = tipoClientes;