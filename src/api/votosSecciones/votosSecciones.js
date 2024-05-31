const { Router } = require("express");
const router = Router();
const VotosSeccionesController = require("./votosSecciones.controller");
const { validateToken } = require("../token/tokenController");

router.get('/', validateToken, VotosSeccionesController.obtenerVotosSecciones);
router.get("/:idSeccion", validateToken, VotosSeccionesController.obtenerVotosPorSecciones);
router.post('/',validateToken, VotosSeccionesController.crearVotoSecciones);
router.put('/', validateToken, VotosSeccionesController.actualizarVotoSeccion);
router.delete('/:idSeccion', validateToken, VotosSeccionesController.eliminarVotoSeccion);

module.exports = router;