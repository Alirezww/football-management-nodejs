const { AuthRoute } = require("./authRoute");
const { IndexRoute } = require("./indexRoute");

const router = require("express").Router();

router.use('/', IndexRoute)
router.use('/auth', AuthRoute);

module.exports = {
    AllRoutes : router
}