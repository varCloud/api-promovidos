const SeguimientosPromovidos = require('../Models/seguimientosPromovidos.model');
const PromovidosDAO = require('./promovidosDAO')
const { Op } = require("sequelize");
class SeguimientoPromovidosDAO {

    async crearSegumientoPromovido(seguimiento) {
        try {
            seguimiento.activo = 1
            await SeguimientosPromovidos.create({ ...seguimiento, creadoPor: seguimiento.usuarioSession.idUsuario }, { isNewRecord: true, logging: true })
            await PromovidosDAO.actualizarPromovido({
                "idPromovido": seguimiento.idPromovido,
                "vota": seguimiento.vota
            })
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
                logging: true
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
                    ['idSeguimientoPromovido', 'DESC']
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

    async obtenerSeguimientosByPromovido(idPromovido) {
        try {

            let filter = { idPromovido: idPromovido, activo: 1 }
            const promotores = await SeguimientosPromovidos.findAll({
                order: [
                    ['idSeguimientoPromovido', 'DESC']
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

}

module.exports = new SeguimientoPromovidosDAO();