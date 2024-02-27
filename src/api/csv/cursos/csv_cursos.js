const { Router } = require("express");
const router = Router();
const csv_cursos = require("./csv_cursos.controller")

router.get('/', csv_cursos.obtenerCursos);

module.exports = router;