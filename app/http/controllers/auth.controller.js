const { UserModel } = require("../../models/User");
const { hash_string, compareResult, generateWebToken } = require("../../modules/functions");

class AuthController {

    async login(req, res, next){
        try{
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });
            if(!user) throw { status : 400, success : false, message : "Username or password is wrong." };

            const matchPassword = compareResult(password, user.password);
            if(!matchPassword) throw { status : 400, success : false, message : "Username or password is wrong." };

            const token = generateWebToken({ username })

            user.token = token;
            await user.save();

            return res.status(200).json({
                status : 200,
                success : true,
                message : "You logged in successfuly",
                token
            })
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