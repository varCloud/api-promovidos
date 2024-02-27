const { Router } = require("express");
const router = Router();
const csv_tipoServiciosController = require("./csv_tipoServicios.controller")

router.get('/', csv_tipoServiciosController.obtenerTipoServicios);

module.exports = router;