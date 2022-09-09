const { UserModel } = require("../../models/User");
const { VerifyAccessToken } = require("../../modules/functions");

const isAuthenticated = async(req, res, next) => {
    try{
            
        const authErrorMessage = { status : 401, message : "You have to login first" };

        const authorization = req.headers?.authorization;
        if(!authorization) throw authErrorMessage;

        const token = authorization.substring(7);

        if(!token) throw authErrorMessage;
        const result = await VerifyAccessToken(token);

        const mobile = result?.mobile || "";

        const user = await UserModel.findOne({ mobile });
        if(!user) throw authErrorMessage;

        req.user = user;
        req.isAuthenticated = true;
        
        next()
    }catch(err){
        next(err);
    }
}

module.exports = {
    isAuthenticated
}