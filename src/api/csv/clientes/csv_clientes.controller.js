const csvClientesDAO = require('../../../DAO/CSV/csvClientesDAO')

class csv_ClientesController {
    async obtenerClientes(req, res) {
        try {
            let data = await csvClientesDAO.obtenerClientes();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_ClientesController()