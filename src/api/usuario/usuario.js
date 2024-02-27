const { Router } = require("express");
const router = Router();
const controller = require("./usuario.controller");


router.post('/', controller.crearUsuario);
router.get('/', controller.obtenerUsuarios);
router.get('/:id', controller.obtenerUsuarios);
router.put('/', controller.actualizarUsuario);
router.delete('/', controller.eliminarUsuario);


module.exports = router;