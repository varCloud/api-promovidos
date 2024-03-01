const PromotorModel = require('../Models/promotores.model');
const UsuarioModel = require('../Models/usuario.model');
const { Op } = require("sequelize");
class PromotorDAO {

    async crearPromotor(promotor) {
        try {

            const newUsuer = await UsuarioModel.create(promotor, { isNewRecord: true })
            await PromotorModel.create({ ...promotor, idUsuario: newUsuer.idUsuario, creadoPor: promotor.usuarioSession.idUsuario })

            let promotorActual = await PromotorModel.findOne({
                order: [
                    ['idPromotor', 'DESC']
                ],
                include: [{
                    association: 'Usuario'
                }]
            })

            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPromotores(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idPromotor: options }
            const promotores = await PromotorModel.findAll({
                order: [
                    ['idPromotor', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [{
                    association: 'Usuario',
                }]
            })
            return promotores;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPromotor(promotor) {
        try {
            await UsuarioModel.update({ ...promotor }, { where: { idUsuario: promotor.idUsuario } })
            await PromotorModel.update({ ...promotor }, { where: { idPromotor: promotor.idPromotor } })
            return promotor;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPromotor(idPromotor) {
        try {
            let promotorActual = await PromotorModel.update({ activo: 0 }, { where: { idPromotor: idPromotor } })
            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new PromotorDAO();