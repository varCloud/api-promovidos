const { Router } = require("express");
const router = Router();
const controller = require("./cliente.controller");

router.post('/', controller.crearCliente);
router.get('/', controller.obtenerCliente);
router.get('/:id', controller.obtenerCliente);
router.put('/', controller.actualizarCliente);
router.delete('/', controller.eliminarCliente);

module.exports = router;