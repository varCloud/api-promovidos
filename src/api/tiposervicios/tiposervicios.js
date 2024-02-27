const { Router } = require('express')
const router = Router()
const controller = require('./tiposervicios.controller')

router.post('/', controller.crearTiposervicios)
router.get('/', controller.obtenerTiposervicios)
router.get('/:id', controller.obtenerTiposervicios)
router.put('/', controller.actualizarTiposervicios)
router.delete('/', controller.eliminarTiposervicios)

module.exports = router