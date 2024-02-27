const { Router } = require("express");
const router = Router();
const PromotoresController = require("./promovidos.controller")

router.post('/', PromotoresController.crearPromotor);
router.get('/', PromotoresController.getPromotores);

module.exports = router;