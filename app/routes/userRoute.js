const { UserController } = require("../http/controllers/user.controller");

const router = require("express").Router();

router.get("/", UserController.profile)

module.exports = {
    UserRoute : router
}