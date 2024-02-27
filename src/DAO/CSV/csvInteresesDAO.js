const db = require("../../config/database");

class csvInteresesDAO {
    async obtenerIntereses() {
        let response = {};
        try {
            let sql = `CALL SP_CSV_INTERESES()`;
            let result = await db.query(sql);
            response = JSON.parse(JSON.stringify(result[0]));
            if (response.status == 200)
                response.intereses = JSON.parse(JSON.stringify(result[1]));
            return response
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new csvInteresesDAO()