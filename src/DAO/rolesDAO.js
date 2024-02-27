const RolesModel = require('../Models/roles.model');
const { Op, sequelize } = require("sequelize");

class RolesDAO {
    async obtenerRoles(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idRol: options }
            let catInteres = await RolesModel.findAll({
                logging: true,
                where: filter
            })
            return catInteres;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RolesDAO();