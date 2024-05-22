const Promovidos = require('../Models/promovidos.model');
const { Op } = require("sequelize");
class PromovidoDAO {

    async crearPromovido(promovido) {
        try {
            promovido.activo = 1;
            promovido.creadoPor = promovido.usuarioSession.idUsuario;
            await Promovidos.create(promovido, { isNewRecord: true })
            const promotorActual = await Promovidos.findOne({
                order: [
                    ['idPromovido', 'DESC']
                ],
                include: [{
                    association: 'Promotor'
                }]
            })

            return promotorActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPromovidos(params) {
        try {
            let options = params ? {
                [Op.eq]: params.id
            } : {
                [Op.notIn]: 0
            }
            let filter = { idPromovido: options, activo: 1 }
            const promovidos = await Promovidos.findAll({
                order: [
                    ['idPromovido', 'ASC']
                ],
                logging: true,
                where: filter,
                include: [
                    {
                        association: 'Promotor',
                        include: [
                            { association: 'Usuario' }
                        ]
                    }
                ]
            })
            return promovidos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerVotantesPromovidos() {
        try {
            var series =
            {
                name: 'Percentage',
                colorByPoint: true,
                data: {}
            }
            let vota = await this.obtenerVotantes()
            series.data = this.buildSeriesWithName(vota, "Si")
            console.log(series.data);
            let noVota = await this.obtenerNoVotantes()
            series.data = series.data.concat(this.buildSeriesWithName(noVota, "No"))
            let noSabe = await this.obtenerNoSabeVotantes()
            series.data = series.data.concat(this.buildSeriesWithName(noSabe, "No Sabe"))
            console.log(series.data, noSabe);
            return series
        } catch (error) {
            throw error;
        }
    }

    async actualizarPromovido(promovido) {
        try {
            let promovidoActual = await Promovidos.update({ ...promovido }, { where: { idPromovido: promovido.idPromovido } })
            return promovidoActual;
        } catch (error) {
            throw error;
        }
    }

    async eliminarPromovido(idPromovido) {
        try {
            let promovidoActual = await Promovidos.update({ activo: 0 }, { where: { idPromovido: idPromovido } })
            return promovidoActual;
        } catch (error) {
            throw error;
        }
    }

    async obtenerVotantes() {
        let filter = { activo: 1, vota: 1 }
        return await Promovidos.count({
            order: [
                ['idPromovido', 'ASC']
            ],
            logging: true,
            where: filter,
        })
    }
    async obtenerNoVotantes() {
        let filter = { activo: 1, vota: 0 }
        return await Promovidos.count({
            order: [
                ['idPromovido', 'ASC']
            ],
            logging: true,
            where: filter,
        })
    }
    async obtenerNoSabeVotantes() {
        let filter = { activo: 1, vota: 2 }
        return await Promovidos.count({
            order: [
                ['idPromovido', 'ASC']
            ],
            logging: true,
            where: filter,
        })
    }

    buildSeriesWithName(data, text) {
        return [{
            y: data,
            name: text.toString().toUpperCase(),
        }]
    }

}

module.exports = new PromovidoDAO();