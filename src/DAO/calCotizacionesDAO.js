const calCotizacionesModel = require('../Models/calCotizaciones.model')
const { Op } = require("sequelize")

class calCotizacionesDAO {
    async crearCalCotizacion(calCotizaciones) {
        try {
            await calCotizacionesModel.create(calCotizaciones)
            let calCotizacionesActual = await calCotizacionesModel.findOne({
                order: [
                    ['idCalculoCotizacion', 'DESC']
                ]
            })
            return calCotizacionesActual
        } catch (error) {
            throw error
        }
    }
    async obtenerCalCotizacion(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idCalculoCotizacion: options }
            let calCotizaciones = await calCotizacionesModel.findAll({
                logging: true,
                where: filter,
                include: [{
                        association: 'cotizacion'
                    },
                    {
                        association: 'usuario'
                    }
                ]
            })
            return calCotizaciones
        } catch (error) {
            throw error
        }
    }
    async actualizarCalCotizacion(calCotizaciones) {
        try {
            let calCotizacionesActual = await calCotizacionesModel.update({...calCotizaciones }, { logging: true, where: { idCalculoCotizacion: calCotizaciones.idCalculoCotizacion } })
            return calCotizacionesActual
        } catch (error) {
            throw error
        }
    }
    async eliminarCalCotizacion(calCotizaciones) {
        try {
            let calCotizacionesActual = await calCotizacionesModel.update({ activo: 0 }, { logging: true, where: { idCalculoCotizacion: calCotizaciones.idCalculoCotizacion } })
            return calCotizacionesActual
        } catch (error) {
            throw error
        }
    }
}

module.exports = new calCotizacionesDAO()