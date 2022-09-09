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

const generateWebToken = (username) => {
    const token = jwt.sign(username, ACCESS_TOKEN_SECRET_KEY, { expiresIn : "3 days" });
    return token;
}

const verifyToken = (token, secretKey) => {
    try{
        const result = jwt.verify(token, secretKey);
        if(!result?.username) false;
        return result;
    }catch(err){
        return false
    }
}

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
            console.log(token)
            resolve(token)
        })
        
    })
}

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}

module.exports = {
    hash_string,
    compareResult,
    generateWebToken,
    verifyToken,
    randomNumberGenerator,
    SignRefreshToken
}