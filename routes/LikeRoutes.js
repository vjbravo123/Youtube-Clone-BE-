import express from "express";
import Video from "../models/Video.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Like a video
// @route   PUT /api/likes/:id/like
// @access  Private
router.put("/:id/like", protect, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!video.likes.includes(req.user._id)) {
      video.likes.push(req.user._id);
      video.dislikes = video.dislikes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    }

    await video.save();
    res.json({ message: "Video liked" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Dislike a video
// @route   PUT /api/likes/:id/dislike
// @access  Private
router.put("/:id/dislike", protect, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!video.dislikes.includes(req.user._id)) {
      video.dislikes.push(req.user._id);
      video.likes = video.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    }

    await video.save();
    res.json({ message: "Video disliked" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
