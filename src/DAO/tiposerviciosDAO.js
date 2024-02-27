const tiposerviciosModel = require("./../Models/tiposervicios.model")
const { Op } = require('sequelize')
const { route } = require("../api/tiposervicios/tiposervicios")

class TiposerviciosDAO {
    async crearTiposervicios(tiposervicio) {
        try {
            await tiposerviciosModel.create(tiposervicio)
            let tiposervicioActual = await tiposerviciosModel.findOne({
                order: [
                    ['idTipoServicios', 'DESC']
                ]
            })
            return tiposervicioActual
        } catch (error) {
            throw error;
        }
    }
    async obtenerTiposervicios(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idTipoServicios: options }
            let tiposervicios = await tiposerviciosModel.findAll({
                logging: true,
                where: filter
            })
            return tiposervicios
        } catch (error) {
            throw error;
        }
    }
    async actualizarTiposervicios(tiposervicio) {
        try {
            let tiposervicioActual = await tiposerviciosModel.update({...tiposervicio }, { logging: true, where: { idTipoServicios: tiposervicio.idTipoServicios } })
            return tiposervicioActual
        } catch (error) {
            throw error;
        }
    }
    async eliminarTiposervicios(tiposervicio) {
        try {
            let tiposervicioActual = await tiposerviciosModel.update({ activo: 0 }, { logging: true, where: { idTipoServicios: tiposervicio.idTipoServicios } })
            return tiposervicioActual
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TiposerviciosDAO();