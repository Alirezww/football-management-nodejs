const { body } = require("express-validator");
const { UserModel } = require("../../models/User");
const Joi = require("@hapi/joi")

function registerValidator(){
    return [
        body("username")
            .notEmpty().withMessage("It is necessary that you enter a username")
            .isLength({ min : 5 , max : 40}).withMessage("Username should less than 6 chars and more than 40 chars")
            .custom(async(username, { req }) => {
                const usernameRegep = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if(!usernameRegep.test(username)) throw "Please enter a valid username";

                const user = await UserModel.findOne({ username });
                if(user) throw "The entered username is common.";;
                return true;
            }),

        body("email")
            .notEmpty().withMessage("It is necessary that you enter a email")

            .isEmail()
            .withMessage("Please enter a valid email")

            .custom(async(email, { req }) => {
                const user = await UserModel.findOne({ email });
                if(user) throw "The entered email is common.";;
                return true;
            }),

        body("mobile")
            .notEmpty().withMessage("It is necessary that you enter a mobile")

            .isMobilePhone("fa-IR")
            .withMessage("Please enter a valid mobile")

            .custom(async(mobile, { req }) => {
                const user = await UserModel.findOne({ mobile });
                if(user) throw "The entered mobile is common.";;
                return true;
            }),

        body("password")
            .notEmpty().withMessage("It is necessary that you enter a password")

            .isLength({ min : 6 , max : 16}).withMessage("Password should less than 6 chars and more than 16 chars")

            .custom((password, { req }) => {
                if(password !== req.body.confirmPassword) throw "Password and confirm Password filed should be same";
                return true;
            })
    ]
}

function loginValidator(){
    return [
        body("username")
            .notEmpty().withMessage("Username field should not be empty.")

            .custom((username, { req }) => {
                const usernameRegep = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if(!usernameRegep.test(username)) throw "Please enter a valid username";
                return true;
            }),

        body("password").notEmpty().withMessage("Password fled should not be empty.")
    ]
};

const getOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern((/^09[0-9]{9}$/)).error(new Error("mobile is not valid.."))
});

const checkOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern((/^09[0-9]{9}$/)).error(new Error("mobile is not valid..")),
    code: Joi.string().min(4).max(6).error(new Error("code is not valid..."))
})

module.exports = {
    registerValidator,
    loginValidator,
    getOtpSchema,
    checkOtpSchema
}