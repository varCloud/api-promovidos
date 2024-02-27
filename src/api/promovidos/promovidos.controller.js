const PromovidosDAO = require('../../DAO/promovidosDAO')

class PromovidosController {

    async crearPromotor(req, res) {
        try {
            let data = await PromovidosDAO.crearPromovido(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async getPromotores(req, res) {
        try {
            let data = await PromovidosDAO.obtenerPromovidos()
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new PromovidosController()