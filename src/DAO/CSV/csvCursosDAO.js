const db = require("../../config/database");

class csvCursosDAO {
    async obtenerCursos() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_CURSOS()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.estatus == 200) {
                response.cursos = JSON.parse(JSON.stringify(result[1]));
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = new csvCursosDAO()