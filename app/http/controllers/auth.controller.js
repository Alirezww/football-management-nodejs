const { UserModel } = require("../../models/User");
const { hash_string, compareResult, SignAccessToken, randomNumberGenerator, SignRefreshToken, VerifRefreshToken } = require("../../modules/functions");

const autoBind = require("auto-bind");
const { getOtpSchema } = require("../validations/authValidator");

class AuthController {

    constructor(){
        autoBind(this)
    }

    async loginUsername(req, res, next){
        try{
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });
            if(!user) throw { status : 400, success : false, message : "Username or password is wrong." };

            const matchPassword = compareResult(password, user.password);
            if(!matchPassword) throw { status : 400, success : false, message : "Username or password is wrong." };

            const token = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);

            user.token = token;
            await user.save();

            return res.status(200).json({
                data : {
                    token,
                    refreshToken
                }
            })
        }catch(err){
            next(err);
        }
    }

    async registerUsername(req, res, next){
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
    };

    async getOtp(req, res, next){
        try{
            await getOtpSchema.validateAsync(req.body)

            const { mobile } = req.body;
            const code = randomNumberGenerator();
            
            const result = await this.saveUser(mobile, code);
            if(!result) throw { status: 401, message:"You cant log in !!!" };

            return res.status(200).json({
                data: {
                    statusCode: 200,
                    success: true,
                    message: "The validation code has sent to your mobile",
                    mobile,
                    code
                }
            })
        }catch(err){
            next(err);
        }
    }

    async checkOtp(req, res, next){
        try{

            const { mobile, code } = req.body;

            const user = await UserModel.findOne({ mobile });
            if(!user) throw { status: 404, message: "User with this mobile has not found!!" };
    
            if(user.otp.code != code) throw { status: 401, message: "The code is incorrect..." };
            const now = new Date().getTime();
            console.log(now);
            if(user.otp.expiresIn < now) throw { status: 401, message: "The code has been expired" };

            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            
            return res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            })
        }catch(err){
            next(err)
        }
    };

    async refreshToken(req, res, next){
        try{
            console.log(req.headers)
            const { refreshtoken: refreshToken } = req.headers;

            const mobile = await VerifRefreshToken(refreshToken);

            const user = await UserModel.findOne({ mobile });

            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);

            return res.status(200).json({
                data: {
                    accessToken,
                    newRefreshToken
                }
            });

        }catch(err){
            next(err);
        }
    }

    async saveUser(mobile, code){
        const otp = {
            code,
            expiresIn: new Date().getTime() + 120000
        }
        const result = await this.checkExistUser(mobile);
        if(result){
            return (await this.updateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            otp,
            mobile
        }))
    }

    async checkExistUser(mobile){
        const user = await UserModel.findOne({ mobile });
        return !!user
    }

    async updateUser(mobile, objData={}){
        Object.keys(objData).forEach(key => {
            if([NaN, null, undefined, 0, "0", "", " "].includes(objData[key])) delete objData[key]
        });

        const updateRes = await UserModel.updateOne({ mobile }, { $set: objData });
        return !!updateRes.modifiedCount
    }
}

module.exports = {
    AuthController : new AuthController()
}