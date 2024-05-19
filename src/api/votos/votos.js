const { Router } = require("express");
const router = Router();
const VotosController = require("./votos.controller");
const { validateToken } = require("../token/tokenController");

router.get('/', validateToken, VotosController.getVotos);
router.get("/:id", validateToken, VotosController.getVotos);
router.put('/', validateToken, VotosController.actualizarVoto);
router.delete('/:id', validateToken, VotosController.eliminarVoto);

module.exports = router;