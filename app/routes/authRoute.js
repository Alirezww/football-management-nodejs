const { AuthController } = require("../http/controllers/auth.controller");
const { errorValidaitonMapper } = require("../http/middlewares/errorsMapper");
const { registerValidator, loginValidator } = require("../http/validations/authValidator");

const router = require("express").Router();

router.post("/login", loginValidator(), errorValidaitonMapper, AuthController.login);

router.post("/register",registerValidator(), errorValidaitonMapper , AuthController.register);

module.exports = {
    AuthRoute : router
}