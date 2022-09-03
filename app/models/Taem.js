const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name : { type : String, required : true, trim : true },
    desctription : { type : String, required : true, trim : true },
    captain : { type : mongoose.Types.ObjectId, required : true },
    members : { type : [mongoose.Types.ObjectId], default : [] },
    username : { type : String, required : true, trim : true, unique : true },
    profile_image : { type : String, required : true, trim : true }
}, { timestamps : true } );

const TeamModel = mongoose.model("Team", TeamSchema);

module.exports = {
    TeamModel
}