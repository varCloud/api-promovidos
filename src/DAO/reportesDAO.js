const Promovidos = require("../Models/promovidos.model");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const db = require("../config/database");
const Promotores = require("../Models/promotores.model");
const { Op } = require("sequelize");
const Enlaces = require("../Models/enlaces.model");

class ReportesDAO {
    REPLACE_NULL = ' - - - ';
    HEADERS_PROMOVIDOS = [
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

            const datas = this.remplazarNulos(data)


            let doc = new PDFDocument({ margin: {...this.MARGIN_DOC}, size: 'A4' });
            // doc.pipe(fs.createWriteStream(`${this.PATH_DIRECTORY}/PromovidoXPromotor.pdf`)); // PARA HACER PRUEBAS LOCALES
            
            await this.addHeaderDoc(doc)

            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })

            doc.pipe(res)
            await this.addTable(doc, datas, `Promovidos del promotor:  ${promotor.Usuario.nombres}`, this.HEADERS_PROMOVIDOS)
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
                    const datas = this.remplazarNulos(data)
                    await this.addTable(doc, datas, `Promovidos del promotor: ${promotor.Usuario.nombres}`, this.HEADERS_PROMOVIDOS)
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
                const datas = this.remplazarNulos(data)
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

                await this.addTable(doc, dataTable, `Promotores`, this.HEADERS_PROMOVIDOS)
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
                    association: 'Usuario',
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
                const datas = this.remplazarNulos(data)
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
                await this.addTable(doc, dataTable, `Enlaces`, this.HEADERS_PROMOVIDOS )
            }

            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }

    remplazarNulos(data) {
        data = data.map((item) => {
            const _ = JSON.stringify(item,
                (key, value) => (value === null) ? this.REPLACE_NULL : value
            );
            return JSON.parse(_)
        })
        return data
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