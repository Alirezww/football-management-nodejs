const bcrypt = require("bcryptjs")

const hash_string = (string) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(string, salt)
}

module.exports = {
    hash_string
}