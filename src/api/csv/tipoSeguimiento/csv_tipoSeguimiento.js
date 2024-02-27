const { Router } = require("express");
const router = Router();
const csv_TipoSeguimientoController = require("./csv_tipoSeguimiento.controller")

router.get('/', csv_TipoSeguimientoController.obtenertipoSeguimiento);

module.exports = router;