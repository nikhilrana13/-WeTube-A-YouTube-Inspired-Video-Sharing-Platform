const User = require("../models/UserModel");
const Video = require("../models/videoModel");



const IncreaseViews = async(req,res)=>{
    try {
        const userId = req.user;
        const videoId = req.params.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        const video = await Video.findById(videoId);
        if(!video){
            return res.status(404).json({message:"video not found"});
        }

        if(!video.views.includes(userId)){
            video.views.push(userId);
            await video.save();
            return res.status(200).json({message:"views increased",video});
        }
    } catch (error) {
        console.log("failed to increase views",error);
        return res.status(500).json({message:"something went wrong"});
    }
}
module.exports = {IncreaseViews}