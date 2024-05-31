const { Router } = require("express");
const router = Router();
const SeccionesController = require("./secciones.controller")

router.get('/', SeccionesController.obtenerSecciones);

module.exports = router;