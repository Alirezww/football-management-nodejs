const { validationResult } = require("express-validator");

const errorValidaitonMapper = (req, res, next) => {
    let messages = {};
    const result = validationResult(req);
    if(result?.errors?.length > 0){
        result.errors.forEach(err => {
            messages[err.param] = err.msg
        });

        return res.status(400).json({
            status : 400,
            success : false,
            messages
        })
    }
    next()
}

module.exports = {
    errorValidaitonMapper
}