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
router.post("/login-username", loginValidator(), errorValidaitonMapper, AuthController.loginUsername);

/**
 * @swagger
 * /auth/register-username:
 *      post:
 *          summary: register
 *          tags: [authenticationSection]
 *          description: register to site via username, email, mobile, password
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
 *          -   name: mobile
 *              in: formData
 *              required: true
 *              type: number
 * 
 *          -   name: email
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          -   name: password
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          -   name: confirmPassword
 *              in: formData
 *              required: true
 *              type: string
 */
router.post("/register-username",registerValidator(), errorValidaitonMapper , AuthController.registerUsername);

/**
 * @swagger
 * /auth/get-otp:
 *      post:
 *          summary: register
 *          tags: [authenticationSection]
 *          description: register to site via username, email, mobile, password
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 *              400:
 *                  description: BadRequest
 *          parameters:
 *          -   name: mobile
 *              in: formData
 *              required: true
 *              type: string
 */
router.post("/get-otp", AuthController.getOtp);

/**
 * @swagger
 * /auth/check-otp:
 *      post:
 *          summary: check code otp
 *          tags: [authenticationSection]
 *          description: check otp code via mobile and entered code
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 *              400:
 *                  description: BadRequest
 *          parameters:
 *          -   name: mobile
 *              in: formData
 *              required: true
 *              type: string
 * 
 *          -   name: code
 *              in: formData
 *              required: true
 *              type: string
 */
router.post("/check-otp", AuthController.checkOtp);

/**
 * @swagger
 * /auth/refresh-token:
 *      post:
 *          tags: [authenticationSection]
 *          summary: checking validation of refresh token and generate new refresh and access token
 *          parameters:
 *              -   name: refreshToken
 *                  in: header
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 *              404:
 *                  description: NotFound
 */
router.post("/refresh-token", AuthController.refreshToken);

module.exports = {
    AuthRoute : router
}