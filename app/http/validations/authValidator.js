const { body } = require("express-validator");
const { UserModel } = require("../../models/User");

function registerValidator(){
    return [
        body("username")
            .notEmpty().withMessage("It is necessary that you enter a username")
            .isLength({ min : 5 , max : 40}).withMessage("Username should less than 6 chars and more than 40 chars")
            .custom(async(username, { req }) => {
                const usernameRegep = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if(!usernameRegep.test(value)) throw "Please enter a valid username";

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
                if(password !== req.confirmPassword) throw "Password and confirm Password filed should be same";
                return true;
            })
    ]
}

module.exports = {
    registerValidator
}