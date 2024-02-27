const interesesDAO = require("../../DAO/interesesDAO");

class InteresesController {

    async crearIntereses(req, res) {
        try {
            let data = await interesesDAO.crearIntereses(req.body);
            res.status(200).json(data);

        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerIntereses(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await interesesDAO.obtenerIntereses(body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
        }
    }

    async actualizarIntereses(req, res) {
        try {
            let data = await interesesDAO.actualizarIntereses(req.body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
        }
    }

    async eliminarIntereses(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await interesesDAO.eliminarIntereses(body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
        }
    }
}
module.exports = new InteresesController()