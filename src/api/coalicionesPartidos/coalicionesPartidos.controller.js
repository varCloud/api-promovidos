const coalicionesPartidosDAO = require('../../DAO/coalicionesPartidosDAO');

class coalicionesPartidosController {
    async getCoalicionesPartidos(req, res) {
        try {
            let data = await coalicionesPartidosDAO.obtenerCoalicionesPartidos(req.params)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new coalicionesPartidosController()