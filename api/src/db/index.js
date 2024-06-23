import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Function to connect to MongoDB
const connectDB = async () => {
  console.log("Connecting to MongoDB...");

  try {
    // Connect to MongoDB using Mongoose
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // If connection is successful, log connection details
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} &DB ${DB_NAME}`
    );

    console.log("Connected to DB");
  } catch (err) {
    // If connection fails, log the error and exit the process
    console.error("MongoDB connection FAILED", err);
    process.exit(1);
  }
};

export default connectDB;
