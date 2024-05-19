const Votos = require('../Models/votos.model')
const { Op } = require('sequelize')

class VotosDAO {

  async obtenerVoto(params) {
    try {
      let options = params.id ? {
        [Op.eq]: params.id
      } : {
        [Op.notIn]: 0
      }
      let filter = { idVoto: options, activo: 1 }
      const votos = await Votos.findAll({
        order: [
          ['idVoto', 'ASC']
        ],
        logging: true,
        where: filter,
        include: [
          {
            association: 'CoalicionPartido',
          },
          {
            association: 'Casilla',
          }
        ]
      })
      return votos;
    } catch (error) {
      throw error
    }
  }

  async actualizarVoto(voto) {
    try {
      let votoActual = await Votos.update({ ...voto }, { where: { idVoto: voto.idVoto } })
      return votoActual;
    } catch (error) {
      throw error;
    }
  }

  async eliminarVoto(idVoto) {
    try {
      let votoActual = await Votos.update({ activo: 0 }, { where: { idVoto: idVoto } })
      return votoActual;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new VotosDAO()