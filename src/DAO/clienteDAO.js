const clienteModel = require('./../Models/clientes.model');
const { Op } = require("sequelize");
class ClienteDAO {

    async crearCliente(cliente) {
        try {
            await clienteModel.create(cliente)
            let clienteActual = await clienteModel.findOne({
                order: [
                    ['idCliente', 'DESC']
                ],
                include: [{
                    association: 'TipoClientes'
                }]
            })
            return clienteActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCliente(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idcliente: options }
            let clientes = await clienteModel.findAll({
                order: [
                    ['idCliente', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [{
                    association: 'TipoClientes',
                }]
            })
            return clientes;
        } catch (error) {
            throw error;
        }
    }

    async actualizarCliente(cliente) {
        try {
            let clienteActual = await clienteModel.update({...cliente }, { logging: true, where: { idcliente: cliente.idCliente } })
            return clienteActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarCliente(cliente) {
        try {
            let clienteActual = await clienteModel.update({ activo: 0 }, { logging: true, where: { idcliente: cliente.idCliente } })
            return clienteActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ClienteDAO();