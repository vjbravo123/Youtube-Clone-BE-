import Channel from "../models/Channel.js";

// @desc    Create a new channel
// @route   POST /api/channels
// @access  Private
export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Channel.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Channel name already taken" });
    }

    const channel = await Channel.create({
      name,
      description,
      owner: req.user._id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all channels
// @route   GET /api/channels
// @access  Public
export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate("owner", "username email");
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
