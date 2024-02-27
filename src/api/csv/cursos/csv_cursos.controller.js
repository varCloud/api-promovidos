const csvCursosDAO = require('../../../DAO/CSV/csvCursosDAO')

class csv_cursosController {
    async obtenerCursos(req, res) {
        try {
            let data = await csvCursosDAO.obtenerCursos();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_cursosController()