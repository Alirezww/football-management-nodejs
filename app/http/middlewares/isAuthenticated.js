const { UserModel } = require("../../models/User");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../modules/constant");
const { verifyToken } = require("../../modules/functions");

const isAuthenticated = async(req, res, next) => {
    try{
            
        const authErrorMessage = { status : 401, message : "You have to login first" };

        const authorization = req.headers?.authorization;
        if(!authorization) throw authErrorMessage;

        const token = authorization.substring(7);

        if(!token) throw authErrorMessage;
        const result = verifyToken(token, ACCESS_TOKEN_SECRET_KEY);
        if(!result) throw authErrorMessage; 

        const username = result?.username;

        const user = await UserModel.findOne({ username });
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