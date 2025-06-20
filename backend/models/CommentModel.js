const mongoose = require("mongoose");


const CommentSchema = mongoose.Schema({
     videoId:{type:mongoose.Schema.Types.ObjectId,ref:"Video",required:true},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
     channelId:{type:mongoose.Schema.Types.ObjectId,ref:"Channel",required:true},
     commenttext:{type:String,required:true},
},{timestamps:true})
const Comment = mongoose.model("Comment",CommentSchema);
module.exports = Comment