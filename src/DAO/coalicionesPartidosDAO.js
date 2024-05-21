const coalicionesPartidos = require('../Models/coaliconesPartidos.model')
const Partido = require('../Models/catPartidos.model')
const { Op } = require('sequelize')

class coalicionesPartidosDAO {

  async obtenerCoalicionesPartidos(params) {
    try {
      const coaliciones = await coalicionesPartidos.findAll({
        attributes: ['idCoalicion'],
        group: ['idCoalicion']
      });

      // Iterar sobre cada coalición y encontrar sus partidos asociados
      const partidosPorCoalicion = await Promise.all(coaliciones.map(async (coalicion) => {
        const idCoalicion = coalicion.idCoalicion;

        // Encontrar todos los partidos asociados a esta coalición
        const partidos = await coalicionesPartidos.findAll({
          where: {
            idCoalicion: idCoalicion
          },
          include: [{
            model: Partido,
            required: true
          }
            ,
          {
            association: "Coaliciones",
          },]
        });
        // Construir objeto de salida para esta coalición
        return {
          ...partidos[0].Coaliciones.dataValues,
          partidos: partidos.map(partido => partido.catpartido)
        };
      }));
      return partidosPorCoalicion
      // let options = params.id
      //   ? {
      //     [Op.eq]: params.id,
      //   }
      //   : {
      //     [Op.notIn]: 0,
      //   };
      // let filter = { idCoalicionPartido: options, activo: 1 };
      // const coalicionPartidoActual = await coalicionesPartidos.findAll({
      //   order: [["idCoalicionPartido", "Desc"]],
      //   where: filter,
      //   include: [
      //     {
      //       association: "Partidos",
      //     },
      //     {
      //       association: "Coaliciones",
      //     },
      //   ],
      // });
      // return coalicionPartidoActual;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new coalicionesPartidosDAO()