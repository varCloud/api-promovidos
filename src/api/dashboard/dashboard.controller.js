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

    async obtenerDataGraficoGenero(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerDataGraficoGenero();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerDataGraficoVotara(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerVotantesPromovidos()
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }

    async obtenerVotosDeCoaliciones(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerVotosDeCoaliciones()
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }

    async obtenerDataGraficoEdades(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerDataGraficoEdades();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerCoberturaPromovidos(req, res) {
        try {
            let data = await dashboardPromovidosDAO.obtenerCoberturaPromovidos();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
   
}

module.exports = new DashboardController()