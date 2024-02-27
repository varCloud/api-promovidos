const { Router } = require("express");
const router = Router();
const controller = require("./echoController.js");


/**
 * @swagger
 *  /echo:
 *  get:
 *     tags:
 *       - Echo
 *     description: Permite saber si se establece la comunicación con el api
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Respuesta del servicio exitoso
 *         schema:
 *            $ref: '#/definitions/ResponseEcho'
 * definitions:
 *  ResponseEcho:
 *   type: object
 *   properties:
 *     status:
 *       type: integer
 *       format: int64
 *       description: identificador  de la respuesta  de ejecucion del servicio
 *     message:
 *       type: string
 *       description: descripción del status
 *   xml:
 *     name: ResponseEcho
 */
router.get("/",controller.echo);

module.exports = router;