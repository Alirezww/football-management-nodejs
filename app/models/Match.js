const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    name : { type : String, required : true, trim : true },
    stadium : { type : String, required : true, trim : true },
    date : { type : Date, required : true },
    status : { type : String, enum : ["playing", "canceled", "active"], default : "active" },
    teams : { type : [mongoose.Types.ObjectId], required : true, maxLength : 2, minLength :2 },
    league : { type : String, required : true },
    judges : { type : [mongoose.Types.ObjectId], required : true }
}, { timestamps : true } );

const MatchModel = mongoose.model("Match", MatchSchema);

module.exports = MatchModel