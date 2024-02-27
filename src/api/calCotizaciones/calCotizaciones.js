const { Router } = require("express")
const router = Router()
const controller = require('./calCotizaciones.controller')

router.post('/', controller.crearCalCotizacion);
router.get('/', controller.obtenerCalCotizacion);
router.get('/:id', controller.obtenerCalCotizacion);
router.put('/', controller.actualizarCalCotizacion);
router.delete('/', controller.eliminarCalCotizacion);

module.exports = router;