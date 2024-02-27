const winston = require("../../config/winston");
const tokenDAO = require("../../DAO/tokenDAO");

var jwt = require('jsonwebtoken');
const configGlobal = require('../../config/config');
var jwtClave = configGlobal.JWT_KEY;
var jwtTiempoToken = 60 * 60 * 24; // expires in 24 hours

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


async function validateToken(request, response, next) {
    try {
        winston.info("Token: " + request.headers['authorization-pp']);
        var token = request.headers['authorization-pp']
        var result = { estatus: -1, mensaje: " " }
        let usuario = {}
        if (!token) {
            result.mensaje = "Es necesario el token de autenticación"
            return response.status(401).json(result);
        }
        if (!token.includes("Bearer-PP")) {
            result.mensaje = "Es necesario el portador de autenticación"
            return response.status(401).json(result);
        }
        token = token.replace('Bearer-PP ', '')
        jwt.verify(token, jwtClave, function (err, user) {
            if (err) {
                result.mensaje = "JWT Token invalido";
                return response.status(401).json(result);
            } else {
                usuario = user
                usuario.postData = request.body
                result.mensaje = "JWT Token valido"
                result.estatus = 200;
            }
        });
        request.usuario = usuario;
        return next();
    } catch (err) {
        return response.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
}

module.exports = {
    generateToken,
    validateToken
}