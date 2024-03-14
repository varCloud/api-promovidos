const Promovidos = require("../Models/promovidos.model");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const db = require("../config/database");
const Promotores = require("../Models/promotores.model");
const { Op } = require("sequelize");

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

            const datas = data.map((item) => {
                const _ = JSON.stringify(item,
                    (key, value) => (value === null) ? this.REPLACE_NULL : value
                );
                return JSON.parse(_)
            })


            let doc = new PDFDocument({ margin: 30, size: 'A4' });
            // doc.pipe(fs.createWriteStream(`${this.PATH_DIRECTORY}/PromovidoXPromotor.pdf`)); // PARA HACER PRUEBAS LOCALES
            
            await this.addHeaderDoc(doc)

            doc.on('pageAdded', async () => {
                await this.addHeaderDoc(doc)
            })

            doc.pipe(res)
            const table = {
                title: `Promovidos del promotor:  ${promotor.Usuario.nombres}`,
                headers: this.HEADERS_PROMOVIDOS,
                datas: datas
            };

            doc.on('pageAdded', async () => {
                await doc.image('./src/assets/logo.png', 420, 25, { width: 150, height: 50 })
            })

            await doc.table(table)
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
                    const datas = data.map((item) => {
                        const _ = JSON.stringify(item,
                            (key, value) => (value === null) ? this.REPLACE_NULL : value
                        );
                        return JSON.parse(_)
                    })

                    const table = {
                        title: `Promovidos del promotor: ${promotor.Usuario.nombres}`,
                        headers: this.HEADERS_PROMOVIDOS,
                        datas: datas,
                    };
                    await doc.table(table)
                    await doc.addPage()
                }
            }
            doc.end();
            return response;
        } catch (ex) {
            console.log(`error:::::::::::::::::::::`, ex.message)
            throw ex;
        }
    }
    async addHeaderDoc(doc) {
        await doc.image('./src/assets/logo.png', 420, 25, { width: 130, height: 50 })
    }
}

module.exports = new ReportesDAO();