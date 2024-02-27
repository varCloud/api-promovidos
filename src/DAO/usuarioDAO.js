const usuarioModel = require('./../Models/usuario.model');
const { Op } = require("sequelize");
class UsarioDAO {

    async crearUsuario(usuario) {
        try {
            await usuarioModel.create(usuario)
            let usuarioActual = await usuarioModel.findOne({
                order: [
                    ['idUsuario', 'DESC']
                ]
            })
            return usuarioActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarios(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idUsuario: options }
            let usuarios = await usuarioModel.findAll({
                logging: true,
                where: filter,
                include: [{
                    association: 'Roles',
                }]
            })
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    async actualizarUsuario(usuario) {
        try {
            let usuarioActual = await usuarioModel.update({...usuario }, { logging: true, where: { idUsuario: usuario.idUsuario } })
            return usuarioActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarUsuario(params) {
        try {
            let usuarioActual = await usuarioModel.update({ activo: 0 }, { logging: true, where: { idUsuario: params.idUsuario } })
            return usuarioActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new UsarioDAO();