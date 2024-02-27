const { Router } = require("express");
const router = Router();
const csv_catInteresesController = require('./csv_catIntereses.controller')

router.get('/', csv_catInteresesController.obtenerCatIntereses);

module.exports = router;