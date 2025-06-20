const mongoose = require("mongoose");
const VideoSchema = mongoose.Schema({
     channelId:{type:mongoose.Schema.Types.ObjectId,ref:"Channel"},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
     title:{type:String,required:true},
     description:{type:String,required:true},
     uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
     views:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}],
     likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}],
     comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment",default:[]}],
     Video:{type:String,required:true,default:""},
     thumbnail:{type:String,required:true},
},{timestamps:true})
const Video = mongoose.model("Video",VideoSchema);
module.exports = Video