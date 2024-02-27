const { Router } = require("express");
const router = Router();
const csv_clientesController = require('./csv_clientes.controller')

router.get('/', csv_clientesController.obtenerClientes);

module.exports = router;