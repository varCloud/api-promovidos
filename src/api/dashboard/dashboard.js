const { Router } = require("express");
const router = Router();
const { validateToken } = require("../token/tokenController");
const dashboardController = require("./dashboard.controller");

router.get('/indicadores',validateToken,dashboardController.obtenerIndicadores);
router.get('/obtenerDataGraficoGenero',validateToken,dashboardController.obtenerDataGraficoGenero);


module.exports = router;