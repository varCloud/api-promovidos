const { Router } = require("express");
const router = Router();
const LoginController = require("./login.controller")

router.post('/iniciarSesion', LoginController.iniciaSesion);

module.exports = router;