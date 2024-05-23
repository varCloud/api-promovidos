const ReportesDAO = require('../../DAO/reportesDAO')

class ReportesController {

    async obtenerPromovidosPorPromotor(req, res) {
        try {
            await ReportesDAO.obtenerPromovidosPorPromotor(req.params.id, res);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerPromovidosPorPromotor(req, res) {
        try {
            await ReportesDAO.obtenerPromovidosPorPromotor(res);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerTodosPromotores(req, res) {
        try {
            await ReportesDAO.obtenerTodosPromotores(res);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerTodosEnlaces(req, res) {
        try {
            await ReportesDAO.obtenerTodosEnlaces(res)
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    
   async obtenerEnlacesPorPromotor(req, res) {
        try {
            await ReportesDAO.obtenerEnlacesPorPromotor(req.params.id, res);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
   }
   async obtenerPromovidos(req, res) {
    try {
        await ReportesDAO.obtenerPromovidos(res)
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}

}

module.exports = new ReportesController()