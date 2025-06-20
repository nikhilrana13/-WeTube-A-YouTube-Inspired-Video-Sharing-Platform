const User = require("../models/UserModel");
const Video = require("../models/videoModel");




const LikeAndDislike = async(req,res)=>{
    try {
        const CurrentuserId = req.user;
        const VideoId = req.params.id;
        // console.log("VideoId",VideoId,"CurrentuserId",CurrentuserId);
        if(!CurrentuserId){
            return res.status(404).json({message:"please log in first"});
        }

        const user = await User.findById(CurrentuserId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const video = await Video.findById(VideoId);
        if(!video){
            return res.status(404).json({message:"video not found"});
        }

        if(video.likes.includes(CurrentuserId)){
            video.likes.pull(CurrentuserId);
            await video.save();
            return res.json({message:"unliked"});
        }else{
            video.likes.push(CurrentuserId);
            await video.save();
            return res.json({message:"liked"});
        }
    } catch (error) {
        console.log("failed to like video",error)
        return res.status(500).json({message:"something went wrong"});
    }
}

module.exports = {LikeAndDislike};