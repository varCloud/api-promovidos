const tipoSeguimientoDAO = require('../../DAO/tipoSeguimientoDAO')

class TipoSeguimientoController {
    async crearTipoSeguimiento(req, res) {
        try {
            let data = await tipoSeguimientoDAO.crearTipoSeguimiento(req.body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
    async obtenerTipoSeguimiento(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body
            let data = await tipoSeguimientoDAO.obtenerTipoSeguimiento(body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
    async actualizarTipoSeguimiento(req, res) {
        try {
            let data = await tipoSeguimientoDAO.actualizarTipoSeguimiento(req.body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
    async eliminarTipoSeguimiento(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body
            let data = await tipoSeguimientoDAO.eliminarTipoSeguimiento(body)
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
}

module.exports = new TipoSeguimientoController();