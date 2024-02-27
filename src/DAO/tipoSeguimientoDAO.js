const tipoSeguimientoModel = require('../Models/tipoSeguimiento.model')
const { Op } = require('sequelize')

class TipoSeguimiento {

    async crearTipoSeguimiento(tipoSeguimiento) {
        try {
            await tipoSeguimientoModel.create(tipoSeguimiento)
            let tipoSeguimientoActual = await tipoSeguimientoModel.findOne({
                order: [
                    ['idtipoSeguimiento', 'DESC']
                ]
            })
            return tipoSeguimientoActual
        } catch (error) {
            throw error;
        }
    }
    async obtenerTipoSeguimiento(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idTipoSeguimiento: options }
            let tipoSeguimiento = await tipoSeguimientoModel.findAll({
                logging: true,
                where: filter
            })
            return tipoSeguimiento
        } catch (error) {
            throw error;
        }
    }
    async actualizarTipoSeguimiento(tipoSeguimiento) {
        try {
            let tipoSeguimientoActual = await tipoSeguimientoModel.update({...tipoSeguimiento }, { logging: true, where: { idTipoSeguimiento: tipoSeguimiento.idTipoSeguimiento } })
            return tipoSeguimientoActual
        } catch (error) {
            throw error;
        }
    }
    async eliminarTipoSeguimiento(tipoSeguimiento) {
        try {
            let tipoSeguimientoActual = await tipoSeguimientoModel.update({ activo: 0 }, { logging: true, where: { idTipoSeguimiento: tipoSeguimiento.idTipoSeguimiento } })
            return tipoSeguimientoActual
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TipoSeguimiento();