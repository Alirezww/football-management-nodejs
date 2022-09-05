const { isAuthenticated } = require("../http/middlewares/isAuthenticated");

const router = require("express").Router();

/**
 * @swagger
 * /:
 *      get:
 *          summary: index page of project
 *          tags : [IndexPage]
 *          description: get all needed datas
 *          responses:
 *              200:
 *                  description : success
 *              404:
 *                  description : notFound
 */
router.get("/", isAuthenticated, (req, res, next) => {
    return res.send("ass")
});

module.exports = {
    IndexRoute : router
}