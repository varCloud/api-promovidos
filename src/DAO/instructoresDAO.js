const instructorModel = require('./../Models/instructores.model');
const { Op } = require('sequelize');

class InstructoresDAO {

    async crearInstructor(instructor) {
        try {
            await instructorModel.create(instructor)
            let instructorActual = await instructorModel.findOne({
                order: [
                    ['idInstructor', 'DESC']
                ]
            })
            return instructorActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerInstructor(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idInstructor: options }
            let instructores = await instructorModel.findAll({
                logging: true,
                where: filter
            })
            return instructores;
        } catch (error) {
            throw error;
        }
    }

    async actualizarInstructor(instructor) {
        try {
            let instructorActual = await instructorModel.update({...instructor }, { logging: true, where: { idInstructor: instructor.idInstructor } })
            return instructorActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarInstructor(instructor) {
        try {
            let instructorActual = await instructorModel.update({ activo: 0 }, { logging: true, where: { idInstructor: instructor.idInstructor } })
            return instructorActual;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new InstructoresDAO();