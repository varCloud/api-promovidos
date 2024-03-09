const { Sequelize } = require("sequelize");
const Promotores = require("../Models/promotores.model");
const Promovidos = require("../Models/promovidos.model");


class DashboardPromovidosDAO {

    async obtenerIndicadores() {
        try {

            
            const countPromovidos =  await Promovidos.count({
                where:{
                    activo : 1
                }
            })

            const countPromotores = await Promotores.count({
                where:{
                    activo : 1
                }
            })

            const registroMasRecientePromotores = await Promotores.findOne({
                where:{
                    activo : 1
                },  
                order:[
                    ['idPromotor','DESC']
                ],
                include: [{
                    association: 'Usuario',
                }]
            })

            const registroMasRecientePromovidos = await Promovidos.findOne({
                where:{
                    activo : 1
                },  
                order:[
                    ['fechaAlta','DESC']
                ]
            })

            var dashboardData  = []

            dashboardData.push({
                title: "Promovidos",
                icon: "HeroUsers",
                fechaUltimoRegistro: this.dateFormat(registroMasRecientePromovidos.fechaAlta),
                totalRegistros: countPromovidos,
                css:'bg-blue-500'
            })

            dashboardData.push({
                title:"Promotores",
                icon:"HeroUser",
                fechaUltimoRegistro: this.dateFormat(registroMasRecientePromotores.Usuario.fechaAlta),
                totalRegistros: countPromotores,
                css:'bg-amber-500'
            })

            return dashboardData

        } catch (error) {
            throw error;
        }
    }

    async obtenerDataGraficoGenero() {
        try {

            const seriesGenero = await Promovidos.findAll({
                where:{
                    activo : 1
                },  
                attributes: ['genero' , [Sequelize.fn('COUNT', Sequelize.col('idPromovido')), 'cantidad']],
                group:['genero'],
            })
            return this.buildSeriesGenero(seriesGenero)

        } catch (error) {
            throw error;
        }
    }

    async obtenerDataGraficoEdad() {
        try {

            const seriesGenero = await Promovidos.findAll({
                where:{
                    activo : 1
                },  
                attributes: ['genero' , [Sequelize.fn('COUNT', Sequelize.col('idPromovido')), 'cantidad']],
            })
            return this.buildSeriesGenero(seriesGenero)

        } catch (error) {
            throw error;
        }
    }

    dateFormat(fecha){
        if(fecha){
            return fecha.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
        return ''
    }
    
    buildSeriesGenero(data){
       var series =
        { 
            name: 'Percentage',
            colorByPoint: true,
        }

        series.data = data.map((s) => {
            return {
                y:s.dataValues.cantidad,
                name:s.genero.toUpperCase(),
            }
        })

        return series
    }
}

module.exports = new DashboardPromovidosDAO()