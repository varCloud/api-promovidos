const { Sequelize, Op } = require("sequelize");
const Promotores = require("../Models/promotores.model");
const Promovidos = require("../Models/promovidos.model");
const Enlaces = require("../Models/enlaces.model");


class DashboardPromovidosDAO {

    async obtenerIndicadores() {
        try {


            const countPromovidos = await Promovidos.count({
                where: {
                    activo: 1
                }
            })

            const countPromotores = await Promotores.count({
                where: {
                    activo: 1
                }
            })

            const countEnalces = await Enlaces.count({
                where: {
                    activo: 1
                }
            })

            const registroMasRecientePromotores = await Promotores.findOne({
                where: {
                    activo: 1
                },
                order: [
                    ['idPromotor', 'DESC']
                ],
                include: [{
                    association: 'Usuario',
                }]
            })

            const registroMasRecientePromovidos = await Promovidos.findOne({
                where: {
                    activo: 1
                },
                order: [
                    ['fechaAlta', 'DESC']
                ]
            })

            const registroMasRecienteEnlaces = await Enlaces.findOne({
                where: {
                    activo: 1
                },
                order: [
                    ['fechaAlta', 'DESC']
                ]
            })

            var dashboardData = []

            dashboardData.push({
                title: "Promovidos",
                icon: "HeroUsers",
                fechaUltimoRegistro: this.dateFormat(registroMasRecientePromovidos.fechaAlta),
                totalRegistros: countPromovidos,
                css: 'bg-blue-500'
            })

            dashboardData.push({
                title: "Promotores",
                icon: "HeroUser",
                fechaUltimoRegistro: this.dateFormat(registroMasRecientePromotores.Usuario.fechaAlta),
                totalRegistros: countPromotores,
                css: 'bg-amber-500'
            })

            dashboardData.push({
                title: "Enlaces",
                icon: "HeroArrowsPointingIn",
                fechaUltimoRegistro: this.dateFormat(registroMasRecienteEnlaces.fechaAlta),
                totalRegistros: countEnalces,
                css: 'bg-sky-500'
            })

            return dashboardData

        } catch (error) {
            throw error;
        }
    }

    async obtenerDataGraficoGenero() {
        try {

            const seriesGenero = await Promovidos.findAll({
                where: {
                    activo: 1
                },
                attributes: ['genero', [Sequelize.fn('COUNT', Sequelize.col('idPromovido')), 'cantidad']],
                group: ['genero'],
            })
            return this.buildSeriesGenero(seriesGenero)

        } catch (error) {
            throw error;
        }
    }

    async obtenerDataGraficoEdades() {
        try {

            var series =
            {
                name: 'Percentage',
                colorByPoint: true,
                data:{}
            }
            let dataEdad = await this.obtenerPromovidosPorEdad(18, 25)
            series.data = this.buildSeriesWithName(dataEdad, "18 a 25")

             dataEdad = await this.obtenerPromovidosPorEdad(26, 35)
             series.data = series.data.concat(this.buildSeriesWithName(dataEdad, "26 a 35"))

            dataEdad = await this.obtenerPromovidosPorEdad(36, 45)
             series.data = series.data.concat(this.buildSeriesWithName(dataEdad, "36 a 45"))

            dataEdad = await this.obtenerPromovidosPorEdad(46, 55)
            series.data = series.data.concat(this.buildSeriesWithName(dataEdad, "46 a 55"))

            dataEdad = await this.obtenerPromovidosPorEdad(55, 115)
            series.data = series.data.concat(this.buildSeriesWithName(dataEdad, "55 o más"))

            return series

        } catch (error) {
            throw error;
        }
    }

    async obtenerCoberturaPromovidos() {
        try {

            const seriesGenero = await Promovidos.findAll({
                where: {
                    activo: 1
                },
                attributes: ['seccion', [Sequelize.fn('COUNT', Sequelize.col('idPromovido')), 'cantidad']],
                group: ['seccion'],
            })
            return this.buildSeriesCoberturaPromovidos(seriesGenero)

        } catch (error) {
            throw error;
        }
    }

    async obtenerPromovidosPorEdad(edadMin, edadMax) {
        try {
            const seriesGraficoEdad = await Promovidos.findAll({
                where: {
                    activo: 1,
                    edad: {
                        [Op.and]:{

                            [Op.gte]: edadMin,
                            [Op.lte]: edadMax
                        }
                    }
                },
                logging:true,
                attributes: ['idPromovido', [Sequelize.fn('COUNT', Sequelize.col('idPromovido')), 'cantidad']],
            })
            console.log(`seriesGraficoEdad`,seriesGraficoEdad)
            return seriesGraficoEdad

        } catch (error) {
            console.log(`error ================ `,JSON.stringify(error.messagge))
        }

    }

    dateFormat(fecha) {
        if (fecha) {
            return fecha.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
        return ''
    }

    buildSeriesWithName(data, seriesName) {
        var series
        if(data)
        {
            series = data.map((s) => {
                return {
                    y: s.dataValues.cantidad,
                    name: seriesName.toString().toUpperCase(),
                }
            })
        }else
        {
            return {
                y:0,
                name:seriesName.toString().toUpperCase()
            }
        }
        

        return series
    }

    buildSeriesGenero(data) {
        var series =
        {
            name: 'Percentage',
            colorByPoint: true,
        }

        series.data = data.map((s) => {
            return {
                y: s.dataValues.cantidad,
                name: s.genero.toUpperCase(),
            }
        })

        return series
    }

    buildSeriesCoberturaPromovidos(data) {
        const _data = data.map((s) => {
            return {
                value : s.dataValues.cantidad,
                seccion: parseInt(s.seccion),
            }
        })

        return _data
    }
}

module.exports = new DashboardPromovidosDAO()