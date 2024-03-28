const { DataTypes } = require("sequelize");
const sequelizeCrm = require("../config/sequelize.crm");
const Usuarios = require("./usuario.model");

const Enlaces = sequelizeCrm.define(
  "Enlaces",
  {
    // Model attributes are defined here
    idCasilla: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },

    padronElectoral: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    listadoNominal: {
      type: DataTypes.STRING,
    },

    casilla: {
      type: DataTypes.STRING,
    },

    tipoCasilla: {
      type: DataTypes.STRING,
    },

    domicilio: {
      type: DataTypes.STRING,
    },

    latitud: {
      type: DataTypes.NUMBER,
    },

    longitud: {
      type: DataTypes.NUMBER,
    },
    localidadManzana: {
      type: DataTypes.STRING,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    referencia: {
      type: DataTypes.STRING,
    },
    tipoDomicilio: {
      type: DataTypes.STRING,
    },
    fechaAlta: {
      type: DataTypes.DATE,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Enlaces.belongsTo(Usuarios, { as: "CreadoPor", foreignKey: "idUsuario" });
module.exports = Enlaces;
