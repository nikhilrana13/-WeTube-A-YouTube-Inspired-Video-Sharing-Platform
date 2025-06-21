const Channel = require("../models/ChannelModel");
const User = require("../models/UserModel");
const Video = require("../models/videoModel");
const Comment = require("../models/CommentModel");

const AddComment = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "please log in first" });
    }
    const channel = await Channel.findOne({ userId: user._id });
    if (!channel) {
      return res.status(404).json({ message: "please create a channel first" });
    }
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    const { commenttext } = req.body;
    console.log("req.body", req.body);

    if (!commenttext) {
      return res.status(400).json({ message: "comment is required" });
    }

    const comment = await Comment.create({
      userId: user._id,
      videoId: videoId,
      commenttext: commenttext,
      channelId: channel._id,
    });
    await Video.findByIdAndUpdate(
      videoId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    // popultae the comments in the video
    const populatecomment = await Comment.findById(comment._id).populate(
      "channelId",
      "name profilepicture"
    );
    return res
      .status(200)
      .json({ message: "comment added", comment: populatecomment });
  } catch (error) {
    console.log("failed to add comment", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const ShowAllComments = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    const comments = await Comment.find({ videoId: videoId }).populate(
      "channelId",
      "name profilepicture"
    );
    if ((!comments === comments.length) === 0) {
      return res
        .status(404)
        .json({ message: "no comments found for this video" });
      ``;
    }
    return res.status(200).json({ message: "comments found", comments });
  } catch (error) {
    console.log("failed to get comments", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
const DeleteComment = async (req, res) => {
  try {
    const userId = req.user;
    const commentId = req.params.id;
  
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403) .json({ message: "you are not authorized to delete this comment" });
    }
    await Comment.findByIdAndDelete(commentId);
    const video = await Video.findById(comment.videoId);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    video.comments.pull(commentId);
    await video.save();
    return res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    console.log("failed to delete comment", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { AddComment, ShowAllComments, DeleteComment };
