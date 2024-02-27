const SeguimientosPromovidosDAO = require('../../DAO/seguimientoPromovidosDAO')

class SeguimientoPromovidoController {

    async crearSeguimiento(req, res) {
        try {
            let data = await SeguimientosPromovidosDAO.crearSegumientoPromovido(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async obtenerSeguimientos(req, res) {
        try {
            let data = await SeguimientosPromovidosDAO.obtenerSeguimientosPromovidos()
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new SeguimientoPromovidoController()