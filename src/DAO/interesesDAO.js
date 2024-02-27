const interesesModel = require('../Models/intereses.model');
const { Op, sequelize } = require("sequelize");

class interesesDAO {

    async crearIntereses(interes) {
        try {
            await interesesModel.create(interes)
            let interesActual = await interesesModel.findOne({
                order: [
                    ['idIntereseCliente', 'DESC']
                ]
            })
            return interesActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerIntereses(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            };
            let filter = { idIntereseCliente: options };
            let intereses = await interesesModel.findAll({
                logging: true,
                where: filter,
                order: [
                    ['idIntereseCliente', 'ASC']
                ],
                include: [{
                        association: 'Clientes'
                    },
                    {
                        association: 'CatIntereses'
                    }
                ]
            });
            return intereses;
        } catch (error) {
            throw error;
        }
    }

    async actualizarIntereses(intereses) {
        try {
            let interesActual = await interesesModel.update({...intereses }, { logging: true, where: { idIntereseCliente: intereses.idIntereseCliente } })
            return interesActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarIntereses(intereses) {
        try {
            let interesActual = await interesesModel.update({ activo: 0 }, { logging: true, where: { idIntereseCliente: intereses.idIntereseCliente } })
            return interesActual;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new interesesDAO();