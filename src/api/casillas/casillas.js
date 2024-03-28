const { Router } = require("express");
const router = Router();
const CasillasController = require("./casillas.controller");
const { validateToken } = require("../token/tokenController");

router.post("/", validateToken, CasillasController.crearCasilla);
router.get("/", validateToken, CasillasController.getCasillas);
router.get("/:id", validateToken, CasillasController.getCasillas);
router.put("/", validateToken, CasillasController.actualizarCasilla);
router.delete("/:id", validateToken, CasillasController.eliminarCasilla);
module.exports = router;
