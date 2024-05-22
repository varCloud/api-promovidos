const { Router } = require("express");
const router = Router();
const VotosController = require("./votos.controller");
const { validateToken } = require("../token/tokenController");

router.post('/',validateToken, VotosController.crearVoto);
router.get('/', validateToken, VotosController.getVotos);
router.get("/:id", validateToken, VotosController.getVotos);
router.get("/votosPorCasilla/:idCasilla", validateToken, VotosController.getVotosPorCasilla);
router.put('/:id', validateToken, VotosController.actualizarVoto);
router.delete('/:id', validateToken, VotosController.eliminarVoto);

module.exports = router;