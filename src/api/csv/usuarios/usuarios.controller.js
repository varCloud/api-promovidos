const csvUsuariosDAO = require('../../../DAO/CSV/csvUsuariosDAO')

class csv_UsuariosController {
    async obtenerUsuarios(req, res) {
        try {
            let data = await csvUsuariosDAO.obtenerUsuarios();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_UsuariosController()