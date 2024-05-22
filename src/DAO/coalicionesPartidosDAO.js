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

      let partidosPorCoalicion = coaliciones.map((col) => col.get({ plain: true }))

      partidosPorCoalicion = await Promise.all(partidosPorCoalicion.map(async (item) => {
        const partidosFind = await coalicionesPartidos.findAll({
          where: { idCoalicion: item.idCoalicion },
          include: [{
            association: 'Partidos'
          }]
       })

       const coalicionesFind = await coalicionesPartidos.findOne({
          where: { idCoalicion: item.idCoalicion },
          include: [{
            association: 'Coaliciones'
          }]
       })
        const p = partidosFind.map((i) => i.get({ plain: true }))
        const coal = coalicionesFind.get(({ plain: true }))
        item.partidos = p.map((item)=> item.Partidos)
        item = {...item , ...coal.Coaliciones , idCoalicionPartido :coal.idCoalicionPartido}

        return item
      }))

      return partidosPorCoalicion
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new coalicionesPartidosDAO()