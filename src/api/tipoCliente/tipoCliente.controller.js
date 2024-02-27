const tipoClientesDAO = require("../../DAO/tipoClientesDAO");

class TipoClienteController {
    async crearTipoCliente(req, res) {
        try {
            let data = await tipoClientesDAO.crearTipoCliente(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerTipoCliente(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await tipoClientesDAO.obtenerTipoCliente(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarTipoCliente(req, res) {
        try {
            let data = await tipoClientesDAO.actualizarTipoCliente(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarTipoCliente(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await tipoClientesDAO.eliminarTipoCliente(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new TipoClienteController();