const { Router } = require("express");
const router = Router();
const PromotoresController = require("./promotores.controller");
const { validateToken } = require("../token/tokenController");

router.post('/',validateToken ,PromotoresController.crearPromotor);
router.get('/',validateToken,PromotoresController.getPromotores);

module.exports = router;