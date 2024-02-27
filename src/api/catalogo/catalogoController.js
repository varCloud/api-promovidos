const catalogoDAO = require("../../DAO/catalogoDAO");

async function nacionalidades(req, res) {
    try {
        let data = await catalogoDAO.nacionalidades();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

async function ocupaciones(req, res) {
    try {
        let data = await catalogoDAO.ocupaciones();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

async function tiposIdentificaciones(req, res) {
    try {
        let data = await catalogoDAO.tiposIdentificaciones();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

async function genero(req, res) {
    try {
        let data = await catalogoDAO.genero();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

async function cadenasComerciales(req, res) {
    try {
        let data = await catalogoDAO.cadenasComerciales();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

async function sucursalesCadenaComercial(req, res) {
    try {
        let postData = req.body;
        if (Object.keys(postData).length != 0) {
            let data = await catalogoDAO.sucursalesCadenaComercial(postData);
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ status: 500, message: "Error al consumir el api, verifique los datos enviados." })
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: "Error internal server" });
    }
}

module.exports = {
    nacionalidades,
    ocupaciones,
    tiposIdentificaciones,
    genero,
    cadenasComerciales,
    sucursalesCadenaComercial
}