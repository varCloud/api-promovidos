const { Router } = require("express");
const router = Router();
const controller = require("./catIntereses.controller");


router.post('/', controller.crearCatInteres);
router.get('/', controller.obtenerCatInteres);
router.get('/:id', controller.obtenerCatInteres);
router.put('/', controller.actualizarCatInteres);
router.delete('/', controller.eliminarCatInteres);

module.exports = router;