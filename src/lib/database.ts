import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);
  console.log("Running DB File");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    return false;
  }

  try {
    if (mongoose.connection.readyState) {
      console.log("MongoDB is running");
      return true;
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};
