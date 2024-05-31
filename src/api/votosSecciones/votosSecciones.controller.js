const VotosSeccionesDAO = require('../../DAO/votosSeccionesDAO')

class VotosSeccionesController {

  async obtenerVotosSecciones(req, res) {
    try {
      let data = await VotosSeccionesDAO.obtenerVotosSecciones(req.params)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  async obtenerVotosPorSecciones(req, res) {
    try {
      let data = await VotosSeccionesDAO.obtenerVotosPorSeccion(req.params.idSeccion)
      res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message })
    }
  }

  async crearVotoSecciones(req, res) {
    try {
      let data = await VotosSeccionesDAO.crearVotoSeccion(req.body);
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  async actualizarVotoSeccion(req, res) {
    try {
      let data = await VotosSeccionesDAO.actualizarVotoSeccion(req.body)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  async eliminarVotoSeccion(req, res) {
    try {
      let data = await VotosSeccionesDAO.eliminarVotoSeccion(req.params.idSeccion)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

}

module.exports = new VotosSeccionesController()