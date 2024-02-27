const csvTipoSeguimientoDAO = require('../../../DAO/CSV/csvTipoSeguimientoDAO')

class csv_tipoSeguimientoController {
    async obtenertipoSeguimiento(req, res) {
        try {
            let data = await csvTipoSeguimientoDAO.obtenertipoSeguimiento();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_tipoSeguimientoController()