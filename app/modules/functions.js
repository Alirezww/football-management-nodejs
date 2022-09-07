const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hash_string = (string) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(string, salt)
}

const compareResult = (password, oldPassword) => {
    return bcrypt.compareSync(password, oldPassword)
}

const generateWebToken = (username) => {
    const token = jwt.sign(username, "ASDMASIDJHFJ*$&#R", { expiresIn : "3 days" });
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

const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}

module.exports = {
    hash_string,
    compareResult,
    generateWebToken,
    verifyToken,
    randomNumberGenerator
}