const ventasModel = require('./../Models/ventas.model')
const { Op } = require("sequelize")

class VentasDAO {

    async crearVenta(venta) {
        try {
            await ventasModel.create(venta)
            let ventaActual = await ventasModel.findOne({
                order: [
                    ['idVenta', 'DESC']
                ]
            })
            return ventaActual
        } catch (error) {
            throw error
        }
    }

    async obtenerVenta(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idVenta: options }
            let ventas = await ventasModel.findAll({
                logging: true,
                where: filter,
                include: [{
                        association: 'Instructor'
                    },
                    {
                        association: 'Cotizacion'
                    },
                    {
                        association: 'Usuario'
                    }
                ]
            })
            return ventas
        } catch (error) {
            throw error
        }
    }

    async actualizarVenta(venta) {
        try {
            let ventaActual = await ventasModel.update({...venta }, { logging: true, where: { idVenta: venta.idVenta } })
            return ventaActual
        } catch (error) {
            throw error
        }
    }

    async eliminarVenta(params) {
        try {
            let ventaActual = await ventasModel.update({ activo: 0 }, { logging: true, where: { idVenta: params.idVenta } })
            return ventaActual
        } catch (error) {
            throw error
        }
    }
}

module.exports = new VentasDAO()