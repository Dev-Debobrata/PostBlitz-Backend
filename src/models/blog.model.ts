import { Schema, model } from "mongoose";
import { IBlog } from "../utils/typings";

const blogSchema = new Schema<IBlog>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  images: [
    {
      type: String,
      required: false,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  created_At: {
    type: Number,
    required: true,
  },
  updated_At: {
    type: Number,
    required: true,
  },
});

export const Blog = model<IBlog>("Blog", blogSchema);
