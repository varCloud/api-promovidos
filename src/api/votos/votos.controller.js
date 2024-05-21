const VotosDAO = require('../../DAO/votosDAO')

class VotosController {

  async getVotos(req, res) {
    try {
      let data = await VotosDAO.obtenerVoto(req.params)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  async crearVoto(req, res) {
    try {
        let data = await VotosDAO.crearVoto(req.body);
        res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}

  async actualizarVoto(req, res) {
    try {
      let data = await VotosDAO.actualizarVoto(req.body)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  async eliminarVoto(req, res) {
    try {
      let data = await VotosDAO.eliminarVoto(req.params.id)
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

}

module.exports = new VotosController()