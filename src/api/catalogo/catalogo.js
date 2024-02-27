const { Router } = require("express");
const router = Router();
const controller = require("./catalogoController");
const token = require("../token/tokenController");

/**
 * @swagger
 *  /catalogo/nacionalidades:
 *  get:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de nacionalidades.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Regresa una lista de las nacionalidades disponibles
 *         schema:
 *           $ref: '#/definitions/BodyNacionalidad'
 *
 * definitions:
 *  BodyNacionalidad:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     nacionalidades:
 *        type: array
 *        items:
 *           $ref: '#/definitions/Nacionalidad'
 *   xml:
 *     name: BodyNacionalidad
 * 
 *  Nacionalidad:
 *   type: object
 *   properties:
 *     idNacionalidad:
 *       type: integer
 *       format: int64
 *     nacionalidad:
 *       type: string
 *       description:  nombre de la nacionalidad
 *     imageUrl:
 *       type: string
 *       description:  url de  imagen
 *   xml:
 *     name: Nacionalidad
 */
router.get("/nacionalidades", token.validateToken,controller.nacionalidades);

/**
 * @swagger
 *  /catalogo/ocupaciones:
 *  get:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de ocupaciones.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Regresa una lista de las ocupaciones disponibles
 *         schema:
 *           $ref: '#/definitions/BodyOcupacion'
 *
 * definitions:
 *  BodyOcupacion:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     ocupaciones:
 *        type: array
 *        items:
 *           $ref: '#/definitions/Ocupacion'
 *   xml:
 *     name: BodyOcupacion
 * 
 *  Ocupacion:
 *   type: object
 *   properties:
 *     idOcupacion:
 *       type: integer
 *       format: int64
 *     ocupacion:
 *       type: string
 *       description:  nombre de la ocupacion
 *   xml:
 *     name: Ocupacion
 */
router.get("/ocupaciones",token.validateToken, controller.ocupaciones);

/**
 * @swagger
 *  /catalogo/tiposIdentificaciones:
 *  get:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de tipos de identificaciones oficiales.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Regresa una lista de los tipos de identificaciones oficiales disponibles
 *         schema:
 *           $ref: '#/definitions/BodyTipoIdentificacion'
 *
 * definitions:
 *  BodyTipoIdentificacion:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     tiposIdentificaciones:
 *        type: array
 *        items:
 *           $ref: '#/definitions/Identificacion'
 *   xml:
 *     name: BodyTipoIdentificacion
 * 
 *  Identificacion:
 *   type: object
 *   properties:
 *     idIdentificacion:
 *       type: integer
 *       format: int64
 *     tipoIdentificacion:
 *       type: string
 *       description:  nombre del tipo de identificacion
 *   xml:
 *     name: TipoIdentificacion
 */
router.get("/tiposIdentificaciones", token.validateToken,controller.tiposIdentificaciones);

/**
 * @swagger
 *  /catalogo/genero:
 *  get:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de generos.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Regresa una lista de las generos disponibles
 *         schema:
 *           $ref: '#/definitions/BodyGenero'
 *
 * definitions:
 *  BodyGenero:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     generos:
 *        type: array
 *        items:
 *           $ref: '#/definitions/Genero'
 *   xml:
 *     name: BodyGenero
 * 
 *  Genero:
 *   type: object
 *   properties:
 *     idGenero:
 *       type: integer
 *       format: int64
 *     genero:
 *       type: string
 *       description:  descripción de genero
 *   xml:
 *     name: Genero
 */
router.get("/genero",token.validateToken, controller.genero);


/**
 * @swagger
 *  /catalogo/cadenasComerciales:
 *  get:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de las cadenas comerciales.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Regresa una lista de las cadenas comerciales disponibles
 *         schema:
 *           $ref: '#/definitions/BodyCadenaComercial'
 *
 * definitions:
 *  BodyCadenaComercial:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     cadenasComerciales:
 *        type: array
 *        items:
 *           $ref: '#/definitions/CadenaComercial'
 *   xml:
 *     name: BodyCadenaComercial
 * 
 *  CadenaComercial:
 *   type: object
 *   properties:
 *     idCadenaComercial:
 *       type: integer
 *       format: int64
 *     cadenaComercial:
 *       type: string
 *       description:  descripción de la cadena comercial
 *   xml:
 *     name: CadenaComercial
 */
router.get("/cadenasComerciales",token.validateToken, controller.cadenasComerciales);


/**
 * @swagger
 *  /catalogo/sucursalesCadenaComercial:
 *  post:
 *     tags:
 *       - Catalogo
 *     description: Obtiene la lista de las sucursales de una cadena comercial.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Request"
 *     responses:
 *       200:
 *         description: Regresa una lista de las sucursales disponibles de una cadena comercial
 *         schema:
 *           $ref: '#/definitions/BodySucursalesCadenaComercial'
 *
 * definitions:
 *  Request:
 *   type: object
 *   properties:
 *     idCadenaComercial:
 *       type: integer
 *       format: int64
 * 
 *  BodySucursalesCadenaComercial:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       format: int64
 *     mensaje:
 *       type: integer
 *       format: int64
 *     sucursales:
 *        type: array
 *        items:
 *           $ref: '#/definitions/Sucursal'
 *   xml:
 *     name: BodySucursalesCadenaComercial
 * 
 *  Sucursal:
 *   type: object
 *   properties:
 *     idSucursal:
 *       type: integer
 *       format: int64
 *     sucursal:
 *       type: string
 *       description:  descripción de la sucursal
 *   xml:
 *     name: Sucursal
 */
router.post("/sucursalesCadenaComercial",token.validateToken, controller.sucursalesCadenaComercial);

module.exports = router;