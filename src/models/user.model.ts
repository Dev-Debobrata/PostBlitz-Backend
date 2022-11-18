import { Schema, model } from "mongoose";
import { IUser } from "../utils/typings";

const userSchema = new Schema<IUser>({
  sessionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: false,
    },
  ],
  likedBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: false,
    },
  ],
  created_At: {
    type: Date,
    required: true,
  },
  updated_At: {
    type: Date,
    required: true,
  },
});

export const User = model<IUser>("User", userSchema);
