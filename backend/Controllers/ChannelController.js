const Channel = require("../models/ChannelModel");
const User = require("../models/UserModel");
const sharp = require("sharp");
const cloudinary = require("../utils/cloudinary");

const CreateChannel = async (req, res) => {
  try {
    const { name, description } = req.body;
    // console.log("req.file",req.file)
    // console.log("req.body",req.body)
    const userId = req.user;
    console.log("userId", userId);
    // check user exist or not
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // check if user already has a channel or not
    let channel = await Channel.findOne({ userId: user._id });
    if (channel) {
      return res
        .status(400)
        .json({ message: "channel already exists", channel });
    }
    // optimize and upload cover image and profile picture
    const coverImageFile = req.files["coverimage"]?.[0];
    const profilePictureFile = req.files["profilepicture"]?.[0];
    //     console.log("Cover:", req.files["coverimage"]);
    // console.log("Profile:", req.files["profilepicture"]);

    const optimizedCover = await sharp(coverImageFile.buffer)
      .resize({ width: 500, height: 500, fit: "inside" })
      .toFormat("jpeg", { quality: 90 })
      .toBuffer();

    const coverUrl = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${optimizedCover.toString("base64")}`
    );

    //  Optimize and upload profile picture
    const optimizedProfile = await sharp(profilePictureFile.buffer)
      .resize({ width: 300, height: 300, fit: "cover" })
      .toFormat("jpeg", { quality: 90 })
      .toBuffer();

    const profileUrl = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${optimizedProfile.toString("base64")}`
    );
    // create channel
    channel = await Channel.create({
      userId: user._id,
      name,
      description,
      coverimage: coverUrl.secure_url,
      profilepicture: profileUrl.secure_url,
      
    });
    await channel.save();
    // send channel id  to user channel object
    user.channelId = channel._id;
    await user.save();
    return res.status(200).json({ message: "channel created", channel });
  } catch (error) {
    console.log("failed to create channel", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const GetChannelDetail = async (req, res) => {
  try {
    const userId = req.user;
    const channelid = req.params.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const channel = await Channel.findOne({ _id: channelid }).populate(
      "userId",
      "name Subcribers videos"
    );
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }
    return res.status(200).json({ message: "channel found", channel });
  } catch (error) {
    console.log("failed to get channel", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const UpdateChannelDetail = async (req, res) => {
  try {
    const userId = req.user;
    const channelid = req.params.id;
    const { name, description } = req.body;
    // console.log("req.body", req.body);
    // console.log("req.files", req.files);
    //  check user exists or not
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const channel = await Channel.findById({ _id: channelid });
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }
    if (user._id.toString() !== channel.userId.toString()) {
      return res.status(401).json({ message: "unauthorized" });
    }
    // if no cover image or profile picture is provided, use the existing ones
    let coverimage = channel.coverimage;
    let profilepicture = channel.profilepicture;

    if (req.files) {
      // optimize and upload cover image and profile picture
      const coverImageFile = req.files["coverimage"]?.[0];
      const profilePictureFile = req.files["profilepicture"]?.[0];
      //     console.log("Cover:", req.files["coverimage"]);
      // console.log("Profile:", req.files["profilepicture"]);
      if (coverImageFile) {
        const optimizedCover = await sharp(coverImageFile.buffer)
          .resize({ width: 500, height: 500, fit: "inside" })
          .toFormat("jpeg", { quality: 90 })
          .toBuffer();

        const coverUrl = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${optimizedCover.toString("base64")}`
        );
        coverimage = coverUrl.secure_url;
      }
      if (profilePictureFile) {
        //  Optimize and upload profile picture
        const optimizedProfile = await sharp(profilePictureFile.buffer)
          .resize({ width: 300, height: 300, fit: "cover" })
          .toFormat("jpeg", { quality: 90 })
          .toBuffer();

        const profileUrl = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${optimizedProfile.toString("base64")}`
        );
        profilepicture = profileUrl.secure_url;
      }
    }
    const updatedChannel = await Channel.findOneAndUpdate(
      { _id: channelid },
      {
        name,
        description,
        coverimage,
        profilepicture,
      },
      { new: true }
    );
    //  console.log("updated channel", updatedChannel);
    return res.status(200).json({ message: "channel updated", updatedChannel });
  } catch (error) {
    console.log("failed to update channel", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { CreateChannel, GetChannelDetail, UpdateChannelDetail };
