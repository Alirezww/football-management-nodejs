const { isAuthenticated } = require("../http/middlewares/isAuthenticated");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: IndexPage
 *      description: index page routes
 */

/**
 * @swagger 
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all needed datas
 *      parameters:
 *          -   name: authorization
 *              description: an access token for auto authentication
 *              in: header
 *              type: string
 *              required: false
 *              example: Bearer YourToken....
 * 
 *      responses:
 *          200:
 *              description : success
 *          404:
 *              description : notFound
 */
router.get("/", isAuthenticated, (req, res, next) => {
    return res.send("ass")
});

module.exports = {
    IndexRoute : router
}