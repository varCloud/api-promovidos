const cotizacionModel = require('./../Models/cotizaciones.model');
const { Op } = require("sequelize");

class CotizacionesDAO {
    async crearCotizacion(cotizacion) {
        try {
            await cotizacionModel.create(cotizacion)
            let cotizacionActual = await cotizacionModel.findOne({
                order: [
                    ['idCotizacion', 'DESC']
                ]
            })
            return cotizacionActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCotizacion(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idCotizacion: options }
            let cotizacion = await cotizacionModel.findAll({
                logging: true,
                where: filter,
                include: [{
                        association: 'Cliente'
                    },
                    {
                        association: 'TipoServicio'
                    },
                    {
                        association: 'Usuario'
                    },
                    {
                        association: 'TipoSeguimiento'
                    },
                    {
                        association: 'Instructor'
                    },
                    {
                        association: 'Curso'
                    }
                ]
            })
            return cotizacion
        } catch (error) {
            throw error;
        }
    }

    async actualizarCotizacion(cotizacion) {
        try {
            let cotizacionActual = await cotizacionModel.update({...cotizacion }, { logging: true, where: { idCotizacion: cotizacion.idCotizacion } })
            return cotizacionActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarCotizacion(cotizacion) {
        try {
            let cotizacionActual = await cotizacionModel.update({ activo: 0 }, { logging: true, where: { idCotizacion: cotizacion.idCotizacion } })
            return cotizacionActual;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CotizacionesDAO()