import mongoose, { Schema } from "mongoose";

const todoFormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done", "removed"],
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoFormSchema);
