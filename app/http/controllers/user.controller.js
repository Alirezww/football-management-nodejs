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

    async editProfile(req, res, next){
        try{
            let data = req.body;
            const userID = req.user._id;

            let badValue = ["", " ", null, undefined, NaN, 0, -1, {}, []];
            let feilds = ["first_name", "last_name", "skills"];

            data["skills"] = data["skills"].split(",");
            Object.entries(data).forEach(([key, value]) => {
                if(badValue.includes(value)) delete data[key];
                if(!feilds.includes(key)) delete data[key];

                if(key == "skills" && (data["skills"].constructor === Array)){

                    if(data["skills"].length == 0) delete data["skills"]

                    data["skills"] = data["skills"].filter(value => {
                        if(!badValue.includes(value)) return value
                    });

                }
            });

            const updateResult = await UserModel.updateOne({ _id : userID }, { $set: data })
            if(updateResult.modifiedCount == 0) throw { status : 500, message: 'updating profile info was not successful!!!' };

            return res.status(200).json({
                status: 200,
                message: "updating the profile was successful..."
            });

        }catch(err){
            next(err)
        }
    }

    async editImageProfile(req, res, next){
        try{

        }catch(err){
            console.log(err)
        }
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