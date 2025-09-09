import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail, channelId } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      channel: channelId,
    });

    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "name")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
