const db = require("../../config/database");

class csvUsuariosDAO {
    async obtenerUsuarios() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_USUARIOS()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.estatus == 200) {
                response.usuarios = JSON.parse(JSON.stringify(result[1]));
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = new csvUsuariosDAO()