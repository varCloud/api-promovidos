const Enlaces = require('../Models/enlaces.model');
const PromotorModel = require('../Models/promotores.model');
const Promovidos = require('../Models/promovidos.model');
const UsuarioModel = require('../Models/usuario.model');
const { Op } = require("sequelize");
class EnlaceDAO {

    async crearEnlace(enlace) {
        try {
            enlace.activo = 1;
            enlace.idUsuario = enlace.usuarioSession.idUsuario;
            await Enlaces.create(enlace, { isNewRecord: true })
            const enlaceActual = await Enlaces.findOne({
                order: [
                    ['idEnlace', 'DESC']
                ],
                include: [{
                    association: 'Promotor'
                }]
            })

            return enlaceActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerEnlaces(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idEnlace: options, activo: 1 }
            const enlaceActual = await Enlaces.findAll({
                order: [
                    ['idEnlace', 'Desc']
                ],
                where: filter,
                include: [
                    {
                        association: 'Promotor',
                        include: [
                            { association: 'Usuario' }
                        ]
                    }
                ]
            })
            return enlaceActual;
        } catch (error) {
            throw error;
        }
    }

    async actualizarEnlace(enlace) {
        try {
            let enlaceActual = await Enlaces.update({ ...enlace }, { logging:true, where: { idEnlace: enlace.idEnlace } })
            return enlaceActual;
        } catch (error) {
            console.log(error.message)
            throw error;
        }
    }

    async eliminarEnlace(idEnlace) {
        try {
            let enlaceActual = await Enlaces.update({ activo: 0 }, { where: { idEnlace: idEnlace } })
            return enlaceActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new EnlaceDAO();