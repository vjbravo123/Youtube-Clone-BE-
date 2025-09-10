import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// @desc    Add a new comment
// @route   POST /api/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = await Comment.create({
      text,
      user: req.user._id,
      video: videoId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get comments for a video
// @route   GET /api/comments/:videoId
// @access  Public
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
