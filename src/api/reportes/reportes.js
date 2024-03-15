const { Router } = require("express");
const router = Router();
const ReportesController = require("./reportes.controller");
const { validateToken } = require("../token/tokenController");


router.get('/promovidoPorPromotor/:id',validateToken ,ReportesController.obtenerPromovidosPorPromotor);
router.get('/obtenerTodosPromovidos',validateToken ,ReportesController.obtenerTodosPromovidos);
router.get('/obtenerTodosPromotores', validateToken, ReportesController.obtenerTodosPromotores);
router.get('/obtenerTodosEnlaces', validateToken, ReportesController.obtenerTodosEnlaces);
router.get('/obtenerTodosEnlaces/:id', validateToken, ReportesController.obtenerEnlacesPorPromotor);
module.exports = router;