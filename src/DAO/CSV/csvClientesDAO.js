const db = require("../../config/database");

class csvClientesDAO {
    async obtenerClientes() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_CLIENTES()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.estatus == 200) {
                response.clientes = JSON.parse(JSON.stringify(result[1]));
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }
}
module.exports = new csvClientesDAO()