const Channel = require("../models/ChannelModel");
const User = require("../models/UserModel");
const Video = require("../models/videoModel");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const sharp = require("sharp");

const UploadVideo = async (req, res) => {
  try {
    const UserId = req.user;
    // check user exist or not
    const user = await User.findOne({ _id: UserId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // check if user already has a channel or not
    let channel = await Channel.findOne({ userId: user._id });
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }
    // upload video
    const { title, description } = req.body;
//     console.log("req.files", req.files);
//     console.log("req.body", req.body);

//   console.log("req.files", req.files); 
// console.log("req.files['Video']", req.files["Video"]);
// console.log("Video file path", req.files["Video"]?.[0]?.path);

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required" });
    }

    if (!req.files ["Video"] || !req.files["thumbnail"]) {
      return res.status(400).json({ message: "video is required" });
    }

      const Videofile = req.files["Video"]?.[0];
       //upload thumnail to cloudinary
       const thumbnailUrl = req.files["thumbnail"]?.[0];
      const Optimizedthumbnail = await sharp(thumbnailUrl.path).resize({ width: 500, height: 500, fit: "inside" }).toFormat("jpeg", { quality: 90 }).toBuffer();
      const cloudthumbnail = await cloudinary.uploader.upload(`data:image/jpeg;base64,${Optimizedthumbnail.toString("base64")}`); 
      const thumbnail = cloudthumbnail.secure_url;
  
    // upload large videe using cloudinary
    const cloudresponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        Videofile.path,{resource_type: "video",chunk_size: 6000000,folder: "Videos",},(error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
    });
    // Delete local file after upload
    fs.unlink(Videofile.path, (err) => {
      if (err) console.error("Failed to delete local video file:", err);
    });
    // delete thumbnail from local after upload
    fs.unlink(thumbnailUrl.path, (err) => {
      if (err) console.error("Failed to delete local thumbnail file:", err);
    });
    const videoUrl = cloudresponse.secure_url;
    console.log("cloudresponse:", cloudresponse);
    // create video
    const video = await Video.create({
      userId: user._id,
      title,
      description,
      uploadedBy: user._id,
      Video: videoUrl,
      channelId:channel._id,
      thumbnail:thumbnail
    });
    // add video to user
    user.videos.push(video._id);
    await user.save();
    await video.save();
    return res
      .status(200)
      .json({ message: "video uploaded successfully", video });
  } catch (error) {
    console.log("failed to upload video", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const GetAllVideos = async(req,res)=>{
    try {
        const videos = await Video.find({}).populate("channelId","name coverimage profilepicture")
        if(!videos){
            return res.status(404).json({message:"videos not found"})
        }
        return res.status(200).json({message:"videos found",videos})
        
    } catch (error) {
        console.log("failed to get videos",error)
        return res.status(500).json({message:"something went wrong"}) 
    }
}

const GetSingleVideo = async(req,res)=>{
  try {
     const videoid = req.params.id;
     const video = await Video.findById(videoid).populate("channelId","name coverimage Subscribers profilepicture").populate("userId","name  videos");
     if(!video){
       return res.status(404).json({message:"video not found"})
     }
     return res.status(200).json({message:"video found",video})
    
  } catch (error) {
    console.log("failed to get video",error)
    return res.status(500).json({message:"something went wrong"})
  }
}

const GetEachUserVideos = async(req,res)=>{
  try {
     const userId = req.user;
     const user = await User.findById(userId).populate("videos");
     if(!user){
       return res.status(404).json({message:"user not found"})
     }
     return res.status(200).json({message:"videos found",user})
    
  } catch (error) {
    console.log("failed to get user",error)
    return res.status(500).json({message:"something went wrong"})
    
  }
}

const DeleteVideo = async(req,res)=>{
  try {
     const userId = req.user;
     const videoId = req.params.id;
     let user = await User.findById(userId);
     if(!user){
       return res.status(404).json({message:"user not found"})
     }
     const video = await Video.findByIdAndDelete(videoId);
     if(!video){
       return res.status(404).json({message:"video not found"})
     }
      
      user.videos.pull(videoId);
      await user.save();
      return res.status(200).json({message:"video deleted"})
    
  } catch (error) {
    console.log("failed to delete video",error)
    return res.status(500).json({message:"something went wrong"})
    
  }
}


module.exports = { UploadVideo, GetAllVideos,GetSingleVideo,GetEachUserVideos,DeleteVideo };
