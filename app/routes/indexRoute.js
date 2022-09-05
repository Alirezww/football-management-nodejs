const { isAuthenticated } = require("../http/middlewares/isAuthenticated");

const router = require("express").Router();

router.get("/", isAuthenticated, (req, res, next) => {
    return res.send("ass")
});

module.exports = {
    IndexRoute : router
}