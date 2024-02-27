const { Sequelize, DataTypes } = require('sequelize');
const sequelizeCrm = require('../config/sequelize.crm');

const Cursos = sequelizeCrm.define('cursos', {
    idCurso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    },
    fechaAlta: {
        type: DataTypes.DATE
    },
    nombreCurso: {
        type: DataTypes.STRING
    },
    costo: {
        type: DataTypes.INTEGER
    },
    capacidad: {
        type: DataTypes.INTEGER
    },
    lugar: {
        type: DataTypes.STRING
    },
    horario: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
});

module.exports = Cursos;