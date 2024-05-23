const Votos = require('../Models/votos.model')
const { Op } = require('sequelize')

class VotosDAO {

  async crearVoto(votos){
    try{
      
      await Votos.bulkCreate(votos)
      return votos
    }
    catch( error){
      throw error
    }
  }
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
            association: 'Coaliciones',
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

  async obtenerVotoPorCasilla(params) {
    try { 
      let filter = { idCasilla: params.idCasilla, activo: 1 }
      console.log(filter);
      const votos = await Votos.findAll({
        order: [
          ['idVoto', 'ASC']
        ],
        logging: true,
        where: filter,
      })
      return votos;
    } catch (error) {
      throw error
    }
  }

  async actualizarVoto(params, votos) {
    try {
      const idCasilla = params.idCasilla
      await Votos.update({ activo: 0 }, { where: { idCasilla: idCasilla } })
      const _votos = await this.crearVoto(votos)
      return _votos;
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