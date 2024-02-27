const { Router } = require("express");
const router = Router();
const RolesController = require("./roles.controller")

router.get('/', RolesController.obtenerRoles);

module.exports = router;