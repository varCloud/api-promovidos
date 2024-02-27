const csvCatInteresesDAO = require('../../../DAO/CSV/csvCatInteresesDAO')

class csv_catInteresesController {
    async obtenerCatIntereses(req, res) {
        try {
            let data = await csvCatInteresesDAO.obtenerCatIntereses();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new csv_catInteresesController()