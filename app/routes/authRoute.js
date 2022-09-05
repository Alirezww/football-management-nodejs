const { AuthController } = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validations/authValidator");

const router = require("express").Router();

router.post("/login", AuthController.login);

router.post("/register",registerValidator(), AuthController.register);

module.exports = {
    AuthRoute : router
}