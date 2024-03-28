const CasillasDAO = require('../../DAO/casillasDAO')

class CasillasController {

    async crearCasilla(req, res) {
        try {
            let data = await CasillasDAO.crearCasilla(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async getCasillas(req, res) {
        try {
            let data = await CasillasDAO.obtenerCasillas(req.params)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarCasilla(req, res) {
        try {
            let data = await CasillasDAO.actualizarCasilla(req.body)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarCasilla(req, res) {
        try {
            let data = await CasillasDAO.eliminarCasilla(req.params.id)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new CasillasController()