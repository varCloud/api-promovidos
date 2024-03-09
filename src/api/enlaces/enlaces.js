const { Router } = require("express");
const router = Router();
const EnlacesController = require("./enlaces.controller");
const { validateToken } = require("../token/tokenController");

router.post('/',validateToken, EnlacesController.crearEnlace);
router.get('/',validateToken ,EnlacesController.getEnlaces);
router.put('/',validateToken,EnlacesController.actualizarEnlace);
router.delete('/:id',validateToken,EnlacesController.eliminarEnlace);
module.exports = router;