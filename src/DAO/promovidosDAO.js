const Promovidos = require('../Models/promovidos.model');
const { Op } = require("sequelize");
class PromovidoDAO {

    async crearPromovido(promovido) {
        try {
            promovido.activo = 1;
            promovido.creadoPor = promovido.usuarioSession.idUsuario;
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
            let filter = { idPromovido: options , activo:1 }
            const promovidos = await Promovidos.findAll({
                order: [
                    ['idPromovido', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [
                    {
                    association: 'Promotor',
                    include:[
                        {association:'Usuario'}
                    ]
                    }
                ]
            })
            return promovidos;
        } catch (error) {
            throw error;
        }
    }

    async actualizarPromovido(promovido) {
        try {
            let promovidoActual = await Promovidos.update({...promovido }, { where: { idPromovido: promovido.idPromovido } })
            return promovidoActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPromovido(idPromovido) {
        try {
            let promovidoActual = await Promovidos.update({ activo: 0 }, { where: { idPromovido: idPromovido } })
            return promovidoActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new PromovidoDAO();