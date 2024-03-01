const PromovidosDAO = require('../../DAO/promovidosDAO')

class PromovidosController {

    async crearPromovido(req, res) {
        try {
            let data = await PromovidosDAO.crearPromovido(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
    async getPromovidos(req, res) {
        try {
            let data = await PromovidosDAO.obtenerPromovidos()
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarPromovido(req, res) {
        try {
            let data = await PromovidosDAO.actualizarPromovido  (req.body)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarPromovido(req, res) {
        try {
            let data = await PromovidosDAO.eliminarPromovido(req.params.id)
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new PromovidosController()