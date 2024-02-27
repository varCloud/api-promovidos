const db = require("../config/database");

async function nacionalidades() {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_NACIONALIDADES ()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.nacionalidades = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function ocupaciones() {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_OCUPACIONES ()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.ocupaciones = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function tiposIdentificaciones() {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_TIPOS_IDENTIFICACIONES ()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.tiposIdentificaciones = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function genero() {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_GENERO ()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.generos = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function cadenasComerciales() {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_CADENAS_COMERCIALES ()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.cadenasComerciales = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function sucursalesCadenaComercial(postData) {
    let response = {};
    try {

        let sql = `CALL ENVNAC_SP_OBTENER_SUCURSALES_CADENA_COMERCIAL (?)`;
        let result = await db.query(sql,[postData.idCadenaComercial]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.sucursales = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}



module.exports = {
    nacionalidades,
    ocupaciones,
    tiposIdentificaciones,
    genero,
    cadenasComerciales,
    sucursalesCadenaComercial
}