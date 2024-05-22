const { Router } = require("express");
const router = Router();
const PromovidosController = require("./promovidos.controller");
const { validateToken } = require("../token/tokenController");

router.post('/',validateToken, PromovidosController.crearPromovido);
router.get('/',validateToken ,PromovidosController.getPromovidos);
router.get('/votos', validateToken, PromovidosController.getEstadisticaVotos)
router.put('/',validateToken,PromovidosController.actualizarPromovido);
router.delete('/:id',validateToken,PromovidosController.eliminarPromovido);
module.exports = router;