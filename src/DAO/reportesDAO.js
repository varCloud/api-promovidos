const Promovidos = require("../Models/promovidos.model");
const Promotores = require("../Models/promotores.model");
const { Op } = require("sequelize");
const Enlaces = require("../Models/enlaces.model");
const { remplazarNulos, initDoc, addTable } = require("../api/Utilerias/utils")
const HEADERS_CONSTANTS = require('../constants/headersTable')
class ReportesDAO {
    
    PATH_DIRECTORY = 'src/reportes/promovidos'
    
    async obtenerPromovidosPorPromotor(idPromotor, res) {
        let response = {};
        try {
            var promotor = await Promotores.findOne({
                where: { idPromotor: idPromotor },
                include: [{
                    association: 'Usuario',
                }]
            })
            var promovidos = await Promovidos.findAll({
                where: {
                    idPromotor: idPromotor
                },
                attributes: this.FIELDS
            })


            const data = JSON.parse(JSON.stringify(promovidos))
            //LAS SIGUIENTES LINEAS QUITAN LOS NULL Y LOS REMPLAZA POR LOS 3 GUINES

            const datas = remplazarNulos(data)
            let doc = await initDoc(res)
            await addTable(doc, datas, `Promovidos del promotor:  ${promotor.Usuario.nombres}`, HEADERS_CONSTANTS.HEADERS_PROMOTORES)
            doc.end();


            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

    async obtenerTodosPromovidos(res) {
        let response = {};
        try {
            var _promotores = await Promotores.findAll({
                where: { activo: 1 },
                include: [{
                    association: 'Usuario',
                }]
            })
            const lstPromotores = JSON.parse(JSON.stringify(_promotores))

            let doc = await initDoc(res)

            for (const promotor of lstPromotores) {
                var promovidos = await Promovidos.findAll({
                    where: {
                        [Op.and]: [
                            { idPromotor: promotor.idPromotor },
                            { activo: 1 },
                        ]
                    },
                    attributes: this.FIELDS
                })

                const data = JSON.parse(JSON.stringify(promovidos))
                if (data.length > 0) {
                    //LAS SIGUIENTES LINEAS QUITAN LOS NULL Y LOS REMPLAZA POR LOS 3 GUINES
                    const datas = remplazarNulos(data)
                    await addTable(doc, datas, `Promovidos del promotor: ${promotor.Usuario.nombres}`, HEADERS_CONSTANTS.HEADERS_PROMOTORES)
                }
            }
            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

    async obtenerTodosPromotores(res) {
        let response = {};
        try {
            var _promotores = await Promotores.findAll({
                where: { activo: 1 },
                include: [{
                    association: 'Usuario',
                }]
            })
            const lstPromotores = JSON.parse(JSON.stringify(_promotores))
            console.log(_promotores)
            let doc = await initDoc(res)

            const data = JSON.parse(JSON.stringify(lstPromotores))
            if (data.length > 0) {
                //LAS SIGUIENTES LINEAS QUITAN LOS NULL Y LOS REMPLAZA POR LOS 3 GUINES
                const datas = remplazarNulos(data)
                const dataTable = datas.map(data => {
                    return {
                        nombres: data.Usuario.nombres,
                        apellidos: data.Usuario.apellidos,
                        calle: data.calle,
                        colonia: data.colonia,
                        cp: data.cp,
                        telefono: data.Usuario.telefono,
                        mail: data.Usuario.mail,
                        seccion: data.seccion,
                        edad: data.edad,
                    }
                });
                await addTable(doc, dataTable, `Promotores`, HEADERS_CONSTANTS.HEADERS_PROMOTORES)
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

    async obtenerTodosEnlaces(res) {
        let response = {};
        try {
            var _enlaces = await Enlaces.findAll({
                where: { activo: 1 },
                include: [{
                    association: 'Promotor',
                    include: [
                        { association: 'Usuario' }
                    ]
                }]
            })
            const lstEnlaces = JSON.parse(JSON.stringify(_enlaces))
            let doc = await initDoc(res)

            const data = JSON.parse(JSON.stringify(lstEnlaces))
            if (data.length > 0) {
                const datas = remplazarNulos(data)
                const dataTable = datas.map(data => {
                    console.log(data)
                    return {
                        nombresEnlace: data.nombres,
                        nombresPromotor: data.Promotor.Usuario.nombres + ' ' +data.Promotor.Usuario.apellidos,
                        calle: data.calle,
                        colonia: data.colonia,
                        telefono: data.telefono,
                        mail: data.mail,
                        problematica: data.problematica
                    }
                });
                await addTable(doc, dataTable, `Enlaces`, HEADERS_CONSTANTS.HEADERS_ENLACES )
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }
    async obtenerEnlacesPorPromotor(idPromotor, res) {
        let response = {};
        try {
            var _enlaces = await Enlaces.findAll({
                where: { activo: 1, idPromotorEnlace: idPromotor  },
                include: [{
                    association: 'Promotor',
                    include: [
                        { association: 'Usuario' }
                    ]
                }]
            })
            const lstEnlaces = JSON.parse(JSON.stringify(_enlaces))
            let doc = await initDoc(res)
            
            const data = JSON.parse(JSON.stringify(lstEnlaces))
            if (data.length > 0) {
                const datas = remplazarNulos(data)
                const dataTable = datas.map(data => {
                    console.log(data)
                    return {
                        nombresEnlace: data.nombres,
                        calle: data.calle,
                        colonia: data.colonia,
                        telefono: data.telefono,
                        mail: data.mail,
                        problematica: data.problematica
                    }
                });
                await addTable(doc, dataTable, `Enlaces de: ${data[0].Promotor.Usuario.nombres}`, HEADERS_CONSTANTS.HEADERS_ENLACES_POR_PROMOTOR )
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

    async obtenerPromovidos(res) {
        let response = {};
        try {
            var _promovidos = await Promovidos.findAll({
                where: { activo: 1 },
                include: [
                    {
                        association: 'Promotor',
                        include:[
                            {association:'Usuario'}
                        ]
                    }
                ]
            })
            const lstPromovidos = JSON.parse(JSON.stringify(_promovidos))
            let doc = await initDoc(res)
            
            const data = JSON.parse(JSON.stringify(lstPromovidos))
            if (data.length > 0) {
                const datas = remplazarNulos(data)
                const dataTable = datas.map((data) => {
                    return {
                        nombrePromovido: data.nombres + ' ' + data.apellidos,
                        nombrePromotor: data.Promotor.Usuario.nombres + ' ' + data.Promotor.Usuario.apellidos,
                        calle: data.calle,
                        colonia: data.colonia,
                        cp: data.cp,
                        telefono: data.telefono,
                        mail: data.mail,
                        seccion: data.seccion,
                        genero: data.genero,
                        edad: data.edad,
                    }
                })
                // datas.nombrePromovido = data.nombres + ' ' + data.apellidos
                // datas.nombrePromotor = data.Promotor.Usuario.nombres + ' ' + data.Promotor.Usuario.apellidos
                await addTable(doc, dataTable, `Promovidos`, HEADERS_CONSTANTS.HEADERS_PROMOVIDOS)
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

}

module.exports = new ReportesDAO();