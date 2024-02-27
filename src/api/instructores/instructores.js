const { Router } = require("express");
const router = Router();
const controller = require("./instructores.controller");

router.post('/', controller.crearInstructor);
router.get('/', controller.obtenerInstructor);
router.get('/:id', controller.obtenerInstructor);
router.put('/', controller.actualizarInstructor);
router.delete('/', controller.eliminarInstructor);

module.exports = router;