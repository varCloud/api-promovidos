const { Router } = require("express");
const router = Router();
const csv_tipoClienteController = require("./csv_tipoCliente.controller")

router.get('/', csv_tipoClienteController.obtenerTipoCliente);

module.exports = router;