const { AuthController } = require("../http/controllers/auth.controller");
const { errorValidaitonMapper } = require("../http/middlewares/errorsMapper");
const { registerValidator, loginValidator } = require("../http/validations/authValidator");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: authenticationSection
 *      description: this is for authentication section
 */

/**
 * @swagger
 * /auth/login-username:
 *      post:
 *          summary: login
 *          tags: [authenticationSection]
 *          description: login to user panel using username and email
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 *              400:
 *                  description: BadRequest
 *          parameters:
 *          -   name: username
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          -   name: password
 *              in: formData
 *              required: true
 *              type: string
 */
router.post("/login-username", loginValidator(), errorValidaitonMapper, AuthController.login);

router.post("/register",registerValidator(), errorValidaitonMapper , AuthController.register);

module.exports = {
    AuthRoute : router
}