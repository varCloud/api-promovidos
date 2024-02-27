const calCotizacionesDAO = require('../../DAO/calCotizacionesDAO')

class calCotizacionesController {
    async crearCalCotizacion(req, res) {
        try {
            let data = await calCotizacionesDAO.crearCalCotizacion(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async obtenerCalCotizacion(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await calCotizacionesDAO.obtenerCalCotizacion(body);
            res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async actualizarCalCotizacion(req, res) {
        try {
            let data = await calCotizacionesDAO.actualizarCalCotizacion(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async eliminarCalCotizacion(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await calCotizacionesDAO.eliminarCalCotizacion(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}
module.exports = new calCotizacionesController()