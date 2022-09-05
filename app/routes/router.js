const { AuthRoute } = require("./authRoute");

const router = require("express").Router();

router.use('/auth', AuthRoute)

module.exports = {
    AllRoutes : router
}