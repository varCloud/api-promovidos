const ventasDAO = require('../../DAO/ventasDAO')

class VentasController {
    async crearVenta(req, res) {
        try {
            let data = await ventasDAO.crearVenta(req.body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }

    async obtenerVenta(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body
            let data = await ventasDAO.obtenerVenta(body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }

    async actualizarVenta(req, res) {
        try {
            let data = await ventasDAO.actualizarVenta(req.body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }

    async eliminarVenta(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body
            let data = await ventasDAO.eliminarVenta(body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
}

module.exports = new VentasController()