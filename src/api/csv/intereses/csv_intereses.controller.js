const csvInteresesDAO = require('../../../DAO/CSV/csvInteresesDAO')

class csv_interesesController {
    async obtenerIntereses(req, res) {
        try {
            let data = await csvInteresesDAO.obtenerIntereses();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
        }
    }
}

module.exports = new csv_interesesController()