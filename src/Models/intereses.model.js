const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');
const CatIntereses = require('./catIntereses.model');
const Clientes = require('./clientes.model');

const Intereses = sequelizeCrm.define('intereses_clientes', {
    idIntereseCliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    fechaAlta: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    },
    idInteres: {
        type: DataTypes.INTEGER
    },
    idCliente: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: false
});

Intereses.belongsTo(CatIntereses, { as: 'CatIntereses', foreignKey: 'idInteres' });
Intereses.belongsTo(Clientes, { as: 'Clientes', foreignKey: 'idCliente' })
module.exports = Intereses;