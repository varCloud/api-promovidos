const Casillas = require("../Models/casillas.model");
const { Op } = require("sequelize");

class CasillasDAO {
  async crearCasilla(casilla) {
    try {
      casilla.activo = 1;
      casilla.idUsuario = casilla.usuarioSession.idUsuario;
      await Casillas.create(casilla, { isNewRecord: true });
      const casillaActual = await Casillas.findOne({
        order: [["idCasilla", "DESC"]],
      });
      return casillaActual;
    } catch (error) {
      throw error;
    }
  }

  async obtenerCasillas(params) {
    console.log('params<><><><>',params.id)
    try {
      let options = params.id
        ? {
            [Op.eq]: params.id,
          }
        : {
            [Op.notIn]: 0,
          };
      let filter = { idCasilla: options, activo: 1 };
      const casillaActual = await Casillas.findAll({
        order: [["idCasilla", "Desc"]],
        where: filter,
        include: [
          {
            association: "CreadoPor",
          },
        ],
      });
      return casillaActual;
    } catch (error) {
      throw error;
    }
  }

  async actualizarCasilla(casilla) {
    try {
      let casillaActual = await Casillas.update(
        { ...casilla },
        { logging: true, where: { idCasilla: casilla.idCasilla } }
      );
      return casillaActual;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async eliminarCasilla(idCasilla) {
    try {
      let casillaActual = await Casillas.update(
        { activo: 0 },
        { where: { idCasilla: idCasilla } }
      );
      return casillaActual;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CasillasDAO();
