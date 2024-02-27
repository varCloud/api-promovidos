const cursosModel = require('../Models/cursos.model');
const { Op } = require("sequelize");
class CursosDAO {

    async crearCurso(curso) {
        try {
            await cursosModel.create(curso);
            let cursoActual = await cursosModel.findOne({
                order: [
                    ['idCurso', 'DESC']
                ]
            });
            return cursoActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerCursos(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idCurso: options }
            let cursos = await cursosModel.findAll({
                logging: true,
                where: filter
            })
            return cursos
        } catch (error) {
            throw error;
        }
    }

    async actualizarCurso(curso) {
        try {

            let cursoActual = await cursosModel.update({...curso }, { logging: true, where: { idCurso: curso.idCurso } })
            return cursoActual;

        } catch (error) {
            throw error;
        }
    }

    async eliminarCurso(curso) {
        try {

            let cursoActual = await cursosModel.update({ activo: 0 }, { logging: true, where: { idCurso: curso.idCurso } })
            return cursoActual;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = new CursosDAO();