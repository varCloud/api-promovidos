const { Router } = require("express");
const router = Router();
const SeguimientoPromovidos = require("./seguimientoPromovidos.controller");
const { validateToken } = require("../token/tokenController");

router.post('/',validateToken, SeguimientoPromovidos.crearSeguimiento);
router.get('/', validateToken,  SeguimientoPromovidos.obtenerSeguimientos);
router.get('/:id', validateToken,  SeguimientoPromovidos.obtenerSeguimientosByPromovido);


module.exports = router;