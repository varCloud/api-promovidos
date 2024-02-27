const db = require("../config/database");

async function generateToken(postData) {
    let response = {};
    try {
        let sql = `CALL ENVNAC_SP_GENERAR_TOKEN (?,?)`;
        let result = await db.query(sql, [postData.user, postData.password]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.model = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        console.log("ex:::::", ex)
        throw ex;
    }
}

async function validateToken(usuario) {
    let response = {};
    try {
        let sql = `CALL PP_SP_VALIDATE_TOKEN (?)`;
        let result = await db.query(sql, [usuario.middlewareApiKey]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        return response;
    } catch (ex) {
        response.estatus=500
        response.status=ex.message
        return response;
    }
}

module.exports = {
    generateToken,
    validateToken
}