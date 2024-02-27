const csvTipoServiciosDAO = require('../../../DAO/CSV/csvTipoServiciosDAO')

class csv_tipoServiciosController {
    async obtenerTipoServicios(req, res) {
        try {
            let data = await csvTipoServiciosDAO.obtenerTipoServicios();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_tipoServiciosController()