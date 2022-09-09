const mongoose = require("mongoose");

const InviteRequest = new mongoose.Schema({
    teamID : { type : mongoose.Types.ObjectId, required : true },
    status : { type : String, enum : ["pending", "rejected", "accepted"], default : "pending" },
    inviter : { type : String, required : true, trim : true }
});

const otpSchema = new mongoose.Schema({
    code : { type: Number, default: 0 },
    expiresIn: { type: Date, default: 0 },
    timeLeft: { type: Number, deafult: 0 }
})

const userSchama = new mongoose.Schema({
    first_name : { type : String, trim : true },
    last_name : { type : String, trim : true },
    mobile : { type : String, trim : true, unique : true },
    username : { type : String, trim : true, unique : true },
    email : { type : String, trim : true, unique : true },
    password : { type : String, trim : true},
    teams : { type : [mongoose.Types.ObjectId], defualt : [] },
    role : { type : String, enum : ["player", "coach", "judge"], default : "player" },
    skills : { type : [String], default : [] },
    last_login: { type: Date },
    token : { type : String, default : '' },
    otp : { type: otpSchema },
    profile_image : { type : String, default : '' },
    invite_requests : { type : [InviteRequest] }
}, { timestamps : true } )

const UserModel = mongoose.model("User", userSchama );

module.exports = {
    UserModel
}