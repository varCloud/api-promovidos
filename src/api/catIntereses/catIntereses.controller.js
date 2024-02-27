const catInteresesDAO = require("../../DAO/catInteresesDAO");

class CatInteresController {
    async crearCatInteres(req, res) {
        try {
            let data = await catInteresesDAO.crearCatInteres(req.body);
            res.status(200).json(data);

        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async obtenerCatInteres(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await catInteresesDAO.obtenerCatInteres(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async actualizarCatInteres(req, res) {
        try {
            let data = await catInteresesDAO.actualizarCatInteres(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarCatInteres(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await catInteresesDAO.eliminarCatInteres(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}
module.exports = new CatInteresController()