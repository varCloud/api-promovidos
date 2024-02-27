const { Router } = require("express");
const router = Router();
const controller = require("./tipoCliente.controller");

router.post('/', controller.crearTipoCliente);
router.get('/', controller.obtenerTipoCliente);
router.get('/:id', controller.obtenerTipoCliente);
router.put('/', controller.actualizarTipoCliente);
router.delete('/', controller.eliminarTipoCliente);

module.exports = router;