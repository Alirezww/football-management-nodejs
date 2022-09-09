const { UserModel } = require("../../models/User");

class UserController{

    async profile(req, res, next){
        try{

            const userID = req.user.id;
            const user = await UserModel.findById(userID, { password: 0, otp: 0 } );

            return res.status(200).json({
                status: 200,
                data: {
                    user
                }
            })

        }catch(err){
            next(err);
        }
    }

    editProfile(){

    }

    editImageProfile(){

    }

    getAllRequests(){

    }

    getAllRequestsByStatus(){

    }

    changeRequestStatus(){

    }
};

module.exports = {
    UserController : new UserController()
}