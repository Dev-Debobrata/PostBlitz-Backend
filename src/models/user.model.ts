import { Schema, model } from "mongoose";
import { IUser } from "../utils/typings";

const userSchema = new Schema<IUser>({
  sessionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [100, "Name is too long"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [6, "Minimum 6 characters are required"],
    maxlength: [30, "Username should not be more than 30 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters with one Uppercase, one lowercase, one special character and one number",
    ],
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Not a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    maxlength: [150, "Address is too long"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    minlength: [6, "Pincode is invalid"],
    maxlength: [6, "Pincode is invalid"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    maxlength: [50, "Country is too long"],
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
    type: Number,
    required: true,
  },
  updated_At: {
    type: Number,
    required: true,
  },
});

export const User = model<IUser>("User", userSchema);
