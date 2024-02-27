const cotizacionDAO = require('../../DAO/cotizacionesDAO')

class CotizacionesController {
    async crearCotizacion(req, res) {
        try {
            let data = await cotizacionDAO.crearCotizacion(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async obtenerCotizacion(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await cotizacionDAO.obtenerCotizacion(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarCotizacion(req, res) {
        try {
            let data = await cotizacionDAO.actualizarCotizacion(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarCotizacion(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await cotizacionDAO.eliminarCotizacion(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new CotizacionesController()