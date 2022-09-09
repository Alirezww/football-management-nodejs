const { AuthRoute } = require("./authRoute");
const { IndexRoute } = require("./indexRoute");
const { UserRoute } = require("./userRoute");

const router = require("express").Router();

router.use('/', IndexRoute);
router.use("/user", UserRoute);
router.use('/auth', AuthRoute);

module.exports = {
    AllRoutes : router
}