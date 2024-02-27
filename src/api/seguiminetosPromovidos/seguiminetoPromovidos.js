const { Router } = require("express");
const router = Router();
const SeguimientoPromovidos = require("./seguimientoPromovidos.controller")

router.post('/', SeguimientoPromovidos.crearSeguimiento);
router.get('/', SeguimientoPromovidos.obtenerSeguimientos);

module.exports = router;