const { AuthController } = require("../http/controllers/auth.controller");
const { errorValidaitonMapper } = require("../http/middlewares/errorsMapper");
const { registerValidator } = require("../http/validations/authValidator");

const router = require("express").Router();

router.post("/login", AuthController.login);

router.post("/register",registerValidator(), errorValidaitonMapper , AuthController.register);

module.exports = {
    AuthRoute : router
}