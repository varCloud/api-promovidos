const { Router } = require("express");
const router = Router();
const controller = require("./cotizaciones.controller");

router.post('/', controller.crearCotizacion);
router.get('/', controller.obtenerCotizacion);
router.get('/:id', controller.obtenerCotizacion);
router.put('/', controller.actualizarCotizacion);
router.delete('/', controller.eliminarCotizacion);

module.exports = router;