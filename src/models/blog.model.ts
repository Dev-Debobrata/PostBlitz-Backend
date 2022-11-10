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
      data: Buffer,
      contentType: String,
      required: false,
    },
  ],
  urls: [
    {
      body: String,
      required: false,
    },
  ],
  likes: {
    type: String,
    default: 0,
  },
  shareLink: {
    type: String,
    required: true,
  },
});

export const Blog = model<IBlog>("Blog", blogSchema);
