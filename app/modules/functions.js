const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");

const hash_string = (string) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(string, salt)
}

const compareResult = (password, oldPassword) => {
    return bcrypt.compareSync(password, oldPassword)
}

const VerifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async(err, payload) => {
            if(err) reject({ status: 401, message: "plz login again..." });

            resolve(payload)
        })
    })
};

const SignAccessToken = (userID) => {
    return new Promise(async(resolve, reject) => {

        const user = await UserModel.findById(userID);
        if(!user) reject({ status: 404, message: "user not found!!" });

        const payload = { mobile: user.mobile };
        const options = { expiresIn: "6h" };
        const secretKey = ACCESS_TOKEN_SECRET_KEY;

        jwt.sign(payload, secretKey, options, (err, token) => {
            if(err) reject({ status: 500, message: "Internal server error occured." });
            resolve(token)
        })
    })
};

const SignRefreshToken = async(userID) => {
    return new Promise(async(resolve, reject) => {

        const user = await UserModel.findById(userID);

        const payload = { mobile: user.mobile };
        const options = {
            expiresIn : "1y"
        };
        const secretKey = REFRESH_TOKEN_SECRET_KEY;

        jwt.sign(payload, secretKey, options, (err, token) => {
            if(err) reject({ status: 500, message: "plz try logging again..." });
            resolve(token)
        })
        
    })
};

const VerifRefreshToken = async(token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async(err, payload) => {

            if(err) reject({ status: 401, message: "please login again" });

            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile });
            if(!user) reject({ status: 401, message: "please login again" });

            resolve(mobile)
        })
    })
}

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
};

module.exports = {
    hash_string,
    compareResult,
    SignAccessToken,
    VerifyAccessToken,
    randomNumberGenerator,
    SignRefreshToken,
    VerifRefreshToken
}