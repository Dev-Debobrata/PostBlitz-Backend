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
    required: [true, "Title is required"],
    maxlength: [100, "Title is too long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [200, "Description is too long"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: [100000, "Content is too long"],
  },
  categories: [
    {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Fantasy",
        "Horror",
        "Romance",
        "Thriller",
        "Mystery",
        "Sci-Fi",
        "Drama",
        "Comedy",
        "Action",
        "Adventure",
        "Crime",
        "Biography",
        "History",
        "Poetry",
        "Self-Help",
        "Travel",
        "Other",
      ],
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
