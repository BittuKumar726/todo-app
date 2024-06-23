import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config({
  path: "../env", // Specify the path to your .env file if it's not in the root directory
});

const PORT = process.env.PORT || 5000; // Use the specified PORT from environment variables or default to 5000

// Connect to MongoDB and start the Express server
connectDB()
  .then(() => {
    // If MongoDB connection is successful, start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    // If MongoDB connection fails, log the error
    console.log("MongoDB connection Failed !!!", err);
  });
