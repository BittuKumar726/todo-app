import mongoose, { Schema } from "mongoose";

// Define the schema for Todo items
const todoFormSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
      trim: true, // Trim whitespace from the beginning and end
      index: true, // Index this field for faster queries
    },
    desc: {
      type: String,
      required: true, // Description is required
      trim: true, // Trim whitespace from the beginning and end
      index: true, // Index this field for faster queries
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done", "removed"], // Status must be one of these values
      required: true, // Status is required
      trim: true, // Trim whitespace from the beginning and end
      index: true, // Index this field for faster queries
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create a Mongoose model based on the schema
export const Todo = mongoose.model("Todo", todoFormSchema);
