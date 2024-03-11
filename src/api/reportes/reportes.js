const { Router } = require("express");
const router = Router();
const ReportesController = require("./reportes.controller");
const { validateToken } = require("../token/tokenController");


router.get('/promovidoPorPromotor/:id',validateToken ,ReportesController.obtenerPromovidosPorPromotor);
router.get('/obtenerTodosPromovidos',validateToken ,ReportesController.obtenerTodosPromovidos);
module.exports = router;