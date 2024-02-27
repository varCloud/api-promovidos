const { Router } = require('express')
const router = Router()
const controller = require('./ventas.controller')

router.post('/', controller.crearVenta);
router.get('/', controller.obtenerVenta);
router.get('/:id', controller.obtenerVenta);
router.put('/', controller.actualizarVenta);
router.delete('/', controller.eliminarVenta);

module.exports = router