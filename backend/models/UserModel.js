const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
     uid:{type:String,required:true},
     name:{type:String},
     email:{type:String,required:true},
     picture:{type:String},
     channelId:{type:mongoose.Schema.Types.ObjectId,ref:"Channel"},
     videos:[{type:mongoose.Schema.Types.ObjectId,ref:"Video"}]

 },{timestamps:true})
 const User = mongoose.model("User",UserSchema);
 module.exports = User