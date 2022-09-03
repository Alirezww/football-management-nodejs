const mongoose = require("mongoose");

const InviteRequest = new mongoose.Schema({
    teamID : { type : mongoose.Types.ObjectId, required : true },
    status : { type : String, enum : ["pending", "rejected", "accepted"], default : "pending" },
    inviter : { type : String, required : true, trim : true }
})

const userSchama = new mongoose.Schema({
    first_name : { type : String, trim : true },
    last_name : { type : String, trim : true },
    mobile : { type : String, trim : true, required : true, unique : true },
    username : { type : String, trim : true, required : true, unique : true },
    email : { type : String, trim : true, required : true, unique : true },
    password : { type : String, trim : true, required : true },
    teams : { type : [mongoose.Types.ObjectId], defualt : [] },
    skills : { type : [String], default : [] },
    token : { type : String, default : '' },
    profile_image : { type : String, default : '' },
    invite_requests : { type : [InviteRequest] }
}, { timestamps : true } )

const UserModel = mongoose.model("User", userSchama );

module.exports = UserModel