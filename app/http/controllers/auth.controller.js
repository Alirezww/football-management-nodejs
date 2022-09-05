const { UserModel } = require("../../models/User");
const { hash_string } = require("../../modules/functions");

class AuthController {

    async login(req, res, next){
        try{
            
        }catch(err){
            next(err);
        }
    }

    async register(req, res, next){
        try{
            const { username, email, mobile, password } = req.body;
            const hashPassword = hash_string(password);
            const userCreateResult = await UserModel.create({ username, email, mobile, password : hashPassword });
            return res.status(201).json({
                status : 201,
                success : true,
                message : "You registered successfuly!!"
            })
        }catch(err){
            next(err);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}