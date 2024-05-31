const VotosSeccionesModel = require('../Models/votosSecciones.model');
const { Op, sequelize } = require("sequelize");

class VotosSeccionesDAO {

  obtenerAsociacionesVotosSecciones() {
    return [
      {
        association: 'Coalicion'
      }, {
        association: 'Elecciones'
      }, {
        association: 'Seccion'
      }
    ]
  }

  async obtenerVotosSecciones() {
    try {
      let votosSecciones = await VotosSeccionesModel.findAll({
        logging: true,
        where: { activo: 1 },
        include: this.obtenerAsociacionesVotosSecciones()
      })
      return votosSecciones;
    } catch (error) {
      throw error;
    }
  }

  async obtenerVotosPorSeccion(idSeccion) {
    try {
      const filter = { activo: 1, idSeccion: idSeccion }
      let votosSecciones = await VotosSeccionesModel.findAll({
        logging: true,
        where: filter,
        include: this.obtenerAsociacionesVotosSecciones()
      })
      return votosSecciones;
    } catch (error) {
      throw error;
    }
  }

  async crearVotoSeccion(votoSeccion) {
    try {
      votoSeccion.activo = 1;
      await VotosSeccionesModel.create({ ...votoSeccion })
      let votosSeccionActual = await VotosSeccionesModel.findOne({
        order: [
          ['idVoto', 'DESC']
        ],
      })
      return votosSeccionActual;
    } catch (error) {
      throw error
    }
  }

  async actualizarVotoSeccion(votoSeccion) {
    try {
      await VotosSeccionesModel.update({ activo: 0 }, { where: { idSeccion: votoSeccion.idSeccion } })
      let votosSeccionActual = await this.crearVotoSeccion(votoSeccion)
      return votosSeccionActual;
    } catch (error) {
      throw error
    }
  }

  async eliminarVotoSeccion(idVoto) {
    try {
      let votosSeccionActual = await VotosSeccionesModel.update({ activo: 0 }, { where: { idVoto: idVoto } })
      return votosSeccionActual;
    } catch (error) {
      throw error
    }
  }

}

module.exports = new VotosSeccionesDAO();