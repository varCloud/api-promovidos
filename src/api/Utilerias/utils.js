const winston = require("../../config/winston");
const pathDestino = "src/imgs/eventos";
const pathImagenDefault = "src/imgs/eventos/default.jpg";
const db = require("../../config/database");
const  {authenticator} = require('otplib');

REPLACE_NULL = ' - - - ';

function postDataInvalido(postData) {
    return {
        status: -1,
        message: "Por favor revisa el parametro de entrada.",
        error: postData
    }
}

function errorGenerico(ex) {
    winston.error(ex);
    return {
        status: -1,
        message: "Ocurrio un error interno, por favor contactar a soporte tecnico.",
        error: ex
    }
}

async function getCredentialsOperatorByCustomer(idCustomer) {

    let response = {};
    try {

        let sql = `CALL PP_SP_GET_OPERATOR_CREDENTIALS_BY_CUSTOMER`;
        let result = await db.query(sql, [idCustomer]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        console.log("Respuesta del GET getCredentialsOperatorByCustomer ::::::::::::::::::::::::::", response)
        if (response.status == 200) {
            response.Modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

function getIdService(url) {
    console.log("url:::", url)
    switch (url) {
        case '/generateToken':
            return 1;
            break;
        case '/getIntegrationChannel':
            return 2;
            break;
        case '/getOperators':
            return 3;
            break;
        case '/getOffersByOperator':
            return 4;
            break;
        case '/sendPurchase':
            return 5;
        case '/getStatusMsisdn':
            return 6;
            break;
        case '/getStatusPurchase':
            return 7;
            break;
        case '/getTicketPurchase':
            return 8;
            break;
        case '/getLastPurchases':
            return 9;
            break;
        case '/getPaymentMethodPurchase':
            return 10;
            break;
        case '/getOffService':
            return 11;
            break;
        case '/sendReactivateService':
            return 12;
            break;
        case '/sendLayOffService':
            return 13;
            break;

        default:
            break;
    }
}

function generarOTP() {
    const secret = 'pagaphone2021';
    authenticator.options = {
        digits: 6,
        window:1
    };
    return authenticator.generate(secret);
}

function remplazarNulos(data) {
    data = data.map((item) => {
        const _ = JSON.stringify(item,
            (key, value) => (value === null) ? this.REPLACE_NULL : value
        );
        return JSON.parse(_)
    })
    return data
}


enumGatewayProvider = {
    ALTAN: 1,
    NETWEY: 2
}

module.exports = {
    postDataInvalido,
    errorGenerico,
    getIdService,
    getCredentialsOperatorByCustomer,
    generarOTP,
    enumGatewayProvider,
    remplazarNulos,
}