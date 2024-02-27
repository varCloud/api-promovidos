const PromotorModel = require('../Models/promotores.model');
const Promovidos = require('../Models/promovidos.model');
const UsuarioModel = require('../Models/usuario.model');
const { Op } = require("sequelize");
class PromovidoDAO {

    async crearPromovido(promovido) {
        try {
            await Promovidos.create(promovido,{isNewRecord:true})
            const promotorActual = await Promovidos.findOne({
                order: [
                    ['idPromovido', 'DESC']
                ],
                include: [{
                    association: 'Promotor'
                }]
            })

            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPromovidos(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idPromovido: options }
            const promotores = await Promovidos.findAll({
                order: [
                    ['idPromovido', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [{
                    association: 'Promotor'
                }]
            })
            return promotores;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPromotor(promotor) {
        try {
            let promotorActual = await promotorModel.update({...promotor }, { logging: true, where: { idpromotor: promotor.idpromotor } })
            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPromotor(promotor) {
        try {
            let promotorActual = await promotorModel.update({ activo: 0 }, { logging: true, where: { idpromotor: promotor.idpromotor } })
            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new PromovidoDAO();