const { Router } = require("express");
const router = Router();
const csv_UsuariosController = require("./usuarios.controller")

router.get('/', csv_UsuariosController.obtenerUsuarios);

module.exports = router;