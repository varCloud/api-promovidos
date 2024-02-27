const axios = require("axios");
const configGlobal = require('./../config/config');

async function notificar(postData) {
    let messageClient = "High level error in integration, please report to PagaPhone."
    return new Promise((resolve, reject) => {
        axios.post(`${configGlobal.API_WEBHOOK}`, postData, null)
            .then(function (response) {})
            .catch(function (error) {
                data = { "status": error, "message": error, "messageClient": messageClient }
                return resolve(data);
            });
    });
}


module.exports={
    notificar
}