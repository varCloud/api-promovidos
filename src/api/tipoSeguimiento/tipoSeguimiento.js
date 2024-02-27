const { Router } = require('express')
const router = Router()
const controller = require('./tipoSeguimiento.controller')

router.post('/', controller.crearTipoSeguimiento);
router.get('/', controller.obtenerTipoSeguimiento);
router.get('/:id', controller.obtenerTipoSeguimiento);
router.put('/', controller.actualizarTipoSeguimiento);
router.delete('/', controller.eliminarTipoSeguimiento);

module.exports = router;