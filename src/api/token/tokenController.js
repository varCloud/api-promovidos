const winston = require("../../config/winston");
const tokenDAO = require("../../DAO/tokenDAO");

var jwt = require('jsonwebtoken');
const configGlobal = require('../../config/config');
var jwtClave = configGlobal.JWT_KEY;
var jwtTiempoToken = 60 * 60 * 360; // expires in 24 hours

async function generateToken(req, res) {
    try {
        const { user, password } = req.body;
        const postData = req.body;
        if (Object.keys(postData).length != 0) {
            var usuarioKey = await tokenDAO.generateToken(req.body)
            console.log("usuario key ::::::::", usuarioKey)

            if (usuarioKey.estatus == 200) { //si las contraseñas son validas a nivel de base de datos
                var tokenData = {
                    usuario: user,
                    contrasena: password,
                    idCliente: usuarioKey.model.idCliente,
                    middlewareApiKey: usuarioKey.model.middlewareApiKey
                }
                var token = jwt.sign(tokenData, jwtClave, {
                    expiresIn: jwtTiempoToken
                })
                return res.status(200).json({ status: 200, token: token, message: "Token generado correctamente." });
            }
            else {
                return res.status(401).json({ estatus: 401, mensaje: "Credenciales incorrectas o vencidas." });
            }
        }
        else {
            return res.status(404).json({ status: 500, message: "Error al consumir el api, verifique los datos enviados." })
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
}


async function validateToken(req, res, next) {
    try {
        winston.info("Token: " + req.headers['authorization']);
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)
        

        jwt.verify(token, jwtClave, function (err, user) {
            if (err) return res.sendStatus(403)
            req.usuarioSession = user;
            req.body.usuarioSession = {...user.usuario.dataValues};
        })

        return next();
    } catch (err) {
        return res.status(500).json({ status: 500, message: `Error interno del servidor ${err.message}` });
    }
}

module.exports = {
    generateToken,
    validateToken
}