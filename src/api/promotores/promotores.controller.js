const PromotoresDAO = require('../../DAO/promotorDAO')

class PromotoresController {

    async crearPromotor(req, res) {
        try {
            console.log(req.body)
            let data = await PromotoresDAO.crearPromotor(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async getPromotores(req, res) {
        try {
            let data = await PromotoresDAO.obtenerPromotores()
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarPromotor(req, res) {
        try {
            let data = await PromotoresDAO.actualizarPromotor(req.body)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarPromotor(req, res) {
        try {
            let data = await PromotoresDAO.eliminarPromotor(req.params.id)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new PromotoresController()