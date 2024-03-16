const Promovidos = require("../Models/promovidos.model");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const db = require("../config/database");
const Promotores = require("../Models/promotores.model");
const { Op } = require("sequelize");
const Enlaces = require("../Models/enlaces.model");
const { remplazarNulos } = require("../api/Utilerias/utils")
const EnlaceDAO = require("./enlacesDAO")
class ReportesDAO {
    HEADERS_PROMOTORES = [
        { label: 'Nombres', property: 'nombres', renderer: null },
        { label: 'Apellidos', property: 'apellidos', renderer: null },
        { label: 'Calle', property: 'calle', renderer: null },
        { label: 'Colonia', property: 'colonia', renderer: null },
        { label: 'C.P.', property: 'cp', renderer: null },
        { label: 'Teléfono', property: 'telefono', renderer: null },
        { label: 'Mail', property: 'mail', renderer: null },
        { label: 'Sección', property: 'seccion', renderer: null },
        { label: 'Edad', property: 'edad', renderer: null }
    ];
    HEADERS_ENLACES = [
        { label: 'Nombres del Enlace', property: 'nombresEnlace', renderer: null },
        { label: 'Nombres del Promotor', property: 'nombresPromotor', renderer: null },
        { label: 'Calle', property: 'calle', renderer: null },
        { label: 'Colonia', property: 'colonia', renderer: null },
        { label: 'Teléfono', property: 'telefono', renderer: null },
        { label: 'Mail', property: 'mail', renderer: null },
        { label: 'Problematica', property: 'problematica', renderer: null},
    ]
    HEADERS_ENLACES_POR_PROMOTOR = [
        { label: 'Nombres del Enlace', property: 'nombresEnlace', renderer: null },
        { label: 'Calle', property: 'calle', renderer: null },
        { label: 'Colonia', property: 'colonia', renderer: null },
        { label: 'Teléfono', property: 'telefono', renderer: null },
        { label: 'Mail', property: 'mail', renderer: null },
        { label: 'Problematica', property: 'problematica', renderer: null},
    ]
    HEADERS_PROMOVIDOS = [
        { label: 'Nombre Promovido', property: 'nombrePromovido', renderer: null },
        { label: 'Nombre Promotor', property: 'nombrePromotor', renderer: null },
        { label: 'Calle', property: 'calle', renderer: null },
        { label: 'Colonia', property: 'colonia', renderer: null },
        { label: 'C.P.', property: 'cp', renderer: null },
        { label: 'Teléfono', property: 'telefono', renderer: null },
        { label: 'Mail', property: 'mail', renderer: null },
        { label: 'Seccion', property: 'seccion', renderer: null },
        { label: 'Genero', property: 'genero', renderer: null },
        { label: 'Edad', property: 'edad', renderer: null },
        { label: 'Vota', property: 'vota', renderer: null },
    ]
    FIELDS = [
        'nombres',
        'apellidos',
        'calle',
        'colonia',
        'cp',
        'telefono',
        'mail',
        'seccion',
        `edad`
    ];
    PATH_DIRECTORY = 'src/reportes/promovidos'
    MARGIN_DOC = {
        top: 85,
        bottom: 30,
        left: 30,
        right: 30
    }

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


            let doc = new PDFDocument({ margin: {...this.MARGIN_DOC}, size: 'A4' });
            // doc.pipe(fs.createWriteStream(`${this.PATH_DIRECTORY}/PromovidoXPromotor.pdf`)); // PARA HACER PRUEBAS LOCALES
            
            await this.addHeaderDoc(doc)

            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })

            doc.pipe(res)
            await this.addTable(doc, datas, `Promovidos del promotor:  ${promotor.Usuario.nombres}`, this.HEADERS_PROMOTORES)
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

            let doc = new PDFDocument({ margins: { ...this.MARGIN_DOC }, size: 'A4' });
            doc.pipe(res);

            await this.addHeaderDoc(doc)

            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })

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
                    await this.addTable(doc, datas, `Promovidos del promotor: ${promotor.Usuario.nombres}`, this.HEADERS_PROMOTORES)
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
            let doc = new PDFDocument({ margins: { ...this.MARGIN_DOC }, size: 'A4' });
            doc.pipe(res);

            await this.addHeaderDoc(doc)

            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })

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
                await this.addTable(doc, dataTable, `Promotores`, this.HEADERS_PROMOTORES)
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
            let doc = new PDFDocument({ margins: { ...this.MARGIN_DOC }, size: 'A4' });
            doc.pipe(res);
            
            await this.addHeaderDoc(doc)
            
            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })
            
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
                await this.addTable(doc, dataTable, `Enlaces`, this.HEADERS_ENLACES )
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
            let doc = new PDFDocument({ margins: { ...this.MARGIN_DOC }, size: 'A4' });
            doc.pipe(res);
            
            await this.addHeaderDoc(doc)
            
            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })
            
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
                await this.addTable(doc, dataTable, `Enlaces de: ${data[0].Promotor.Usuario.nombres}`, this.HEADERS_ENLACES_POR_PROMOTOR )
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
            let doc = new PDFDocument({ margins: { ...this.MARGIN_DOC }, size: 'A4' });
            doc.pipe(res);
            
            await this.addHeaderDoc(doc)
            
            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })
            
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
                        vota: data.vota,
                    }
                })
                // datas.nombrePromovido = data.nombres + ' ' + data.apellidos
                // datas.nombrePromotor = data.Promotor.Usuario.nombres + ' ' + data.Promotor.Usuario.apellidos
                await this.addTable(doc, dataTable, `Promovidos`, this.HEADERS_PROMOVIDOS)
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }
    async addTable(doc, dataTable, title, headers) {
        const table = {
            title: title,
            headers: headers,
            datas: dataTable,
        };
        await doc.table(table)
        await doc.addPage()
    }

    async addHeaderDoc(doc) {
        await doc.image('./src/assets/logo.png', 420, 25, { width: 130, height: 50 })
    }
}

module.exports = new ReportesDAO();