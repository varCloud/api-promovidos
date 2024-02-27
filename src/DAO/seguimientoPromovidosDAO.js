const PromotorModel = require('../Models/promotores.model');
const Promovidos = require('../Models/promovidos.model');
const SeguimientosPromovidos = require('../Models/seguimientosPromovidos.model');
const UsuarioModel = require('../Models/usuario.model');
const { Op } = require("sequelize");
class SeguimientoPromovidosDAO {

    async crearSegumientoPromovido(seguimiento) {
        try {
            await SeguimientosPromovidos.create(seguimiento, { isNewRecord: true , logging:true })
            const currentSeguimiento = await SeguimientosPromovidos.findOne({
                order: [
                    ['idSeguimientoPromovido', 'DESC']
                ],
                include: [
                    {
                        association: 'Promovido'
                    },
                    {
                        association: 'Usuario'
                    }
                ],
                logging:true
            })

            return currentSeguimiento;
        } catch (error) {
            throw error;
        }
    }

    async obtenerSeguimientosPromovidos(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idSeguimientoPromovido: options }
            const promotores = await SeguimientosPromovidos.findAll({
                order: [
                    ['idSeguimientoPromovido', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [
                    {
                        association: 'Promovido'
                    },
                    {
                        association: 'Usuario'
                    }
                ]
            })
            return promotores;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPromotor(promotor) {
        try {
            let promotorActual = await promotorModel.update({ ...promotor }, { logging: true, where: { idpromotor: promotor.idpromotor } })
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

module.exports = new SeguimientoPromovidosDAO();