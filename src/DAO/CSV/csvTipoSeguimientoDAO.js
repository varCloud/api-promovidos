const db = require("../../config/database");

class csvTipoSeguimientoDAO {
    async obtenertipoSeguimiento() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_TIPO_SEGUIMIENTO()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.estatus == 200) {
                response.tipoSeguimiento = JSON.parse(JSON.stringify(result[1]));
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = new csvTipoSeguimientoDAO()