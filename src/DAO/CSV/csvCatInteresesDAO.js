const db = require("../../config/database");

class csvCatInteresesDAO {
    async obtenerCatIntereses() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_TIPO_INTERESES()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.estatus == 200) {
                response.CatIntereses = JSON.parse(JSON.stringify(result[1]));
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = new csvCatInteresesDAO()