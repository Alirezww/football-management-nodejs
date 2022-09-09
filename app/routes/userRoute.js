const { UserController } = require("../http/controllers/user.controller");
const { isAuthenticated } = require("../http/middlewares/isAuthenticated");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: profile
 *      description: all actions for user profile
 */

/**
 * @swagger
 * /profile/:
 *      get:
 *          summary: all data about logged in user
 *          tags: [profile]
 *          parameters:
 *              -   name: authorization
 *                  in: header
 *                  type: string
 *                  required: true
 * 
 *          responses:
 *              200:
 *                  description: success
 *              404:
 *                  description: notFound
 *              401:
 *                  description: unAuthorized
 *              500:
 *                  description: InternalErrorServer
 */
router.get("/", isAuthenticated ,UserController.profile)

module.exports = {
    UserRoute : router
}