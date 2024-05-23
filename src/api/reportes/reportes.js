const { Router } = require("express");
const router = Router();
const ReportesController = require("./reportes.controller");
const { validateToken } = require("../token/tokenController");


router.get('/promovidoPorPromotor/:id',validateToken ,ReportesController.obtenerPromovidosPorPromotor);
router.get('/obtenerPromovidosPorPromotor',validateToken ,ReportesController.obtenerPromovidosPorPromotor);
router.get('/obtenerTodosPromotores', validateToken, ReportesController.obtenerTodosPromotores);
router.get('/obtenerTodosEnlaces', validateToken, ReportesController.obtenerTodosEnlaces);
router.get('/obtenerTodosEnlaces/:id', validateToken, ReportesController.obtenerEnlacesPorPromotor);
router.get('/obtenerPromovidos', validateToken, ReportesController.obtenerPromovidos);

module.exports = router;