const PromotorModel = require('../Models/promotores.model');
const UsuarioModel = require('../Models/usuario.model');
const { Op } = require("sequelize");
var jwt = require('jsonwebtoken');
const configGlobal = require('../config/config');
var jwtClave = configGlobal.JWT_KEY;
var jwtTiempoToken = 60 * 60 * 360; // expires in 24 hours

class LoginDAO {

    async iniciaSesion(usuario) {
        try {
            const currentUser = await UsuarioModel.findOne({
                logging: true,
                where: { usuario: usuario.usuario, contrasena: usuario.contrasena },
            })
            if (currentUser) {
                var tokenData = {
                    usuario:{...currentUser},
                }
                var token = jwt.sign(tokenData, jwtClave, {
                    expiresIn: jwtTiempoToken
                })

                return {...currentUser.dataValues, token}
            } else {
                const error = new Error('Usuario o Contrasena no son validas');
                error.code = 404;
                throw error
            }

        } catch (error) {
            throw error;
        }
    }

}

module.exports = new LoginDAO();