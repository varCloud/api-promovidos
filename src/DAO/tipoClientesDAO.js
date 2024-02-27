const tipoClienteModel = require('./../Models/tipoClientes.model');
const { Op } = require("sequelize");
class TipoClienteDAO {

    async crearTipoCliente(tipoCliente) {
        try {
            await tipoClienteModel.create(tipoCliente)
            let tipoClienteActual = await tipoClienteModel.findOne({
                order: [
                    ['idTipoCliente', 'DESC']
                ]
            })
            return tipoClienteActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerTipoCliente(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idtipoCliente: options }
            let tipoClientes = await tipoClienteModel.findAll({
                logging: true,
                where: filter
            })
            return tipoClientes;
        } catch (error) {
            throw error;
        }
    }

    async actualizarTipoCliente(tipoCliente) {
        try {
            let tipoClienteActual = await tipoClienteModel.update({...tipoCliente }, { logging: true, where: { idTipoCliente: tipoCliente.idTipoCliente } })
            return tipoClienteActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarTipoCliente(tipoCliente) {
        try {
            let tipoClienteActual = await tipoClienteModel.update({ activo: 0 }, { logging: true, where: { idTipoCliente: tipoCliente.idTipoCliente } })
            return tipoClienteActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TipoClienteDAO();