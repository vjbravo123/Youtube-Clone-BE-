import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();

    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });

    const channel = await Channel.create({
      name: "Test Channel",
      description: "This is a test channel",
      owner: user._id,
    });

    await Video.create({
      title: "First Test Video",
      description: "This is just a sample video",
      videoUrl: "https://example.com/video.mp4",
      channel: channel._id,
    });

    console.log("Seed data created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
