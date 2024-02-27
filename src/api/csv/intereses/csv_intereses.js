const { Router } = require("express");
const router = Router();
const csv_interesesController = require('./csv_intereses.controller')

router.get('/', csv_interesesController.obtenerIntereses);

module.exports = router;