const { Router } = require("express");
const router = Router();
const controller = require("./intereses.controller");


router.post('/', controller.crearIntereses);
router.get('/', controller.obtenerIntereses);
router.get('/:id', controller.obtenerIntereses);
router.put('/', controller.actualizarIntereses);
router.delete('/', controller.eliminarIntereses);

module.exports = router;