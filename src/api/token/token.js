const { Router } = require("express");
const router = Router();
const controller = require("./tokenController");


/**
 * @swagger
 *  /token/generateToken:
 *  post:
 *     tags:
 *       - token
 *     description: Para poder interactuar con los demas servicios del api es necesario generar un TOKEN
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Usuario proporcionado por PagaPhone
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Contraseña proporcionada por PagaPhone.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Respuesta del servicio exitoso
 *         schema:
 *            $ref: '#/definitions/ResponseToken'
 * definitions:
 *  ResponseToken:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *       description: identificador  de la respuesta de ejecucion del servicio
 *     mensaje:
 *       type: string
 *       description: descripcion del status
 *     token:
 *       type: string
 *       description: indentificador de la transaccion en base de datos
 *   xml:
 *     name: ResponseToken
 */
router.post("/generateToken",controller.generateToken);

module.exports = router;
