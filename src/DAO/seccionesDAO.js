const SeccionesModel = require('../Models/secciones.model');
const { Op, sequelize } = require("sequelize");

class SeccionesDAO {
  async obtenerSecciones() {
    try {
      let Secciones = await SeccionesModel.findAll({
        logging: true,
      })
      return Secciones;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SeccionesDAO();