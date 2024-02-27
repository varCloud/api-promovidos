const csvTipoClienteDAO = require('../../../DAO/CSV/csvTipoClienteDAO')

class csv_tipoClienteController {
    async obtenerTipoCliente(req, res) {
        try {
            let data = await csvTipoClienteDAO.obtenerTipoCliente();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_tipoClienteController()