const { Router } = require("express");
const router = Router();
const coalicionesPartidosController = require("./coalicionesPartidos.controller");
const { validateToken } = require("../token/tokenController");

router.get("/", validateToken, coalicionesPartidosController.getCoalicionesPartidos);
router.get("/:id", validateToken, coalicionesPartidosController.getCoalicionesPartidos);
module.exports = router;
