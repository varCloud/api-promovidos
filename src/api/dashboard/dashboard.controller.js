const dashboardPromovidosDAO = require('../../DAO/dashboardPromovidosDAO');
const PromotoresDAO = require('../../DAO/promotorDAO')

class DashboardController {

    async obtenerIndicadores(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerIndicadores();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
   
}

module.exports = new DashboardController()