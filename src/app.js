const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser')
var winston = require('./config/winston');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const configGlobal = require('./config/config');
//const swaggerDocument = require('./swagger.json');

const app = express();

//Configuración 
app.set("puerto", configGlobal.PORT);
app.set("json spaces", 2);


//Middleware
app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Mensaje de Entrada |  Metodo Api: ' + req.url + ' - Ip Request: ' + req.ip + ' - Metodo HTTP: ' + req.method + ' - Body Request: ' + JSON.stringify(req.body));
    let respuesta = res.send;
    res.send = function(data) {
        respuesta.apply(res, arguments);
        console.log('Mensaje de salida : ' + data)
    }
    next();
});


app.get('/', function(req, res) {
    res.send('Ready for TO DO APi...!! XD');
});

app.use("/promotores", require("./api/promotores/promotores"))
app.use("/promovidos", require("./api/promovidos/promovidos"))
app.use("/segumientosPromovidos", require("./api/seguiminetosPromovidos/seguiminetoPromovidos"))
app.use("/login", require("./api/login/login"))
app.use("/dashboard", require("./api/dashboard/dashboard"))
app.use("/enlaces", require("./api/enlaces/enlaces"))
app.use("/reportes", require("./api/reportes/reportes"))
app.use("/casillas", require("./api/casillas/casillas"))
app.use("/coalicionesPartidos", require("./api/coalicionesPartidos/coalicionesPartidos"))

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'api para el envio de dinero nacionales',
            version: '1.0.0'
        }
    },
    apis: ['./src/api/echo/echo.js', './src/api/token/token.js', './src/api/catalogo/catalogo.js', './src/api/giro/giro.js'],
    host: 'localhost:3008',
    definitions: {
        resp: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    format: "int64"
                },
                petId: {
                    type: "integer",
                    format: "int64"
                },
                quantity: {
                    type: "integer",
                    format: "int32"
                },
                status: {
                    type: "string",
                    description: "asdasdsd"
                }
            },
            xml: { name: "resp" }
        }
    },


});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//inicio de servicio
app.listen(process.env.PORT || app.get("puerto"), () => {
    console.log("Inicio de servidor:", process.env.PORT || app.get("puerto"));
});