const coalicionesPartidos = require('../Models/coaliconesPartidos.model')
const { Op } = require('sequelize')

class coalicionesPartidosDAO {

  async obtenerCoalicionesPartidos(params) {
    try {
      let options = params.id
        ? {
          [Op.eq]: params.id,
        }
        : {
          [Op.notIn]: 0,
        };
      let filter = { idCoalicionPartido: options, activo: 1 };
      const coalicionPartidoActual = await coalicionesPartidos.findAll({
        order: [["idCoalicionPartido", "Desc"]],
        where: filter,
        include: [
          {
            association: "Partidos",
          },
          {
            association: "Coaliciones",
          },
        ],
      });
      return coalicionPartidoActual;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new coalicionesPartidosDAO()