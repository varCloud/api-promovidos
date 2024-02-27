const catInteresesModel = require('../Models/catIntereses.model');
const { Op, sequelize } = require("sequelize");

class CatInteresesDAO {

    async crearCatInteres(catInteres) {
        try {
            await catInteresesModel.create(catInteres)
            let catInteresActual = await catInteresesModel.findOne({
                order: [
                    ['idCatInteres', 'DESC']
                ]
            })
            return catInteresActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCatInteres(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idCatInteres: options }
            let catInteres = await catInteresesModel.findAll({
                logging: true,
                where: filter
            })
            return catInteres;
        } catch (error) {
            throw error;
        }
    }

    async actualizarCatInteres(catInteres) {
        try {
            let catInteresActual = await catInteresesModel.update({...catInteres }, { logging: true, where: { idCatInteres: catInteres.idCatInteres } })
            return catInteresActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarCatInteres(catInteres) {
        try {
            let interesActual = await catInteresesModel.update({ activo: 0 }, { logging: true, where: { idCatInteres: catInteres.idCatInteres } })
            return interesActual;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CatInteresesDAO();