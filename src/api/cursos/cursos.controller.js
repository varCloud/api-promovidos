const cursosDAO = require('../../DAO/cursosDAO');

class CursosController {
    async crearCurso(req, res) {
        try {
            let data = await cursosDAO.crearCurso(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async obtenerCursos(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await cursosDAO.obtenerCursos(body);
            res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
    async actualizarCurso(req, res) {
        try {
            let data = await cursosDAO.actualizarCurso(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }

    async eliminarCurso(req, res) {
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await cursosDAO.eliminarCurso(body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}
module.exports = new CursosController();