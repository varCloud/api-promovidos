const { Router } = require("express");
const router = Router();
const controller = require("./cursos.controller");

router.post('/', controller.crearCurso);
router.get('/', controller.obtenerCursos);
router.get('/:id', controller.obtenerCursos);
router.put('/', controller.actualizarCurso);
router.delete('/', controller.eliminarCurso)


module.exports = router;