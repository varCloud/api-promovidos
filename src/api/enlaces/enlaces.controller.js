const EnlacesDAO = require('../../DAO/enlacesDAO')

class EnlacesController {

    async crearEnlace(req, res) {
        try {
            let data = await EnlacesDAO.crearEnlace(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async getEnlaces(req, res) {
        try {
            let data = await EnlacesDAO.obtenerEnlaces()
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarEnlace(req, res) {
        try {
            let data = await EnlacesDAO.actualizarEnlace(req.body)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarEnlace(req, res) {
        try {
            let data = await EnlacesDAO.eliminarEnlace(req.params.id)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new EnlacesController()