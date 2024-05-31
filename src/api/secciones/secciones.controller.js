const SeccionesDAO = require('../../DAO/seccionesDAO')

class SeccionesController {

  async obtenerSecciones(req, res) {
    try {
      let data = await SeccionesDAO.obtenerSecciones();
      res.status(200).json(data);
    }
    catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

}

module.exports = new SeccionesController()