const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
      userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
      name:{type:String,required:true},
      description:{type:String},
      coverimage:{type:String},
      profilepicture:{type:String,default:"https://img.freepik.com/free-vector/gradient-abstract-background_23-2148512771.jpg?w=2000"},
      Subscribers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    },{timestamps:true})

const Channel = mongoose.model("Channel",ChannelSchema);
module.exports = Channel