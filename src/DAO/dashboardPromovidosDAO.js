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

            const dashboardData ={
                countPromovidos,
                registroMasRecientePromovidos,
                countPromotores,
                registroMasRecientePromotores,
            }
            return dashboardData

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DashboardPromovidosDAO()