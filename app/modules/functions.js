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
    const token = jwt.sign({ username }, "ASDMASIDJHFJ*$&#R", { expiresIn : "3 days" });
    return token;
}

module.exports = {
    hash_string,
    compareResult,
    generateWebToken
}