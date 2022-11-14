import { Schema, model } from "mongoose";
import { IUser } from "../utils/typings";

const userSchema = new Schema<IUser>({
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
      blogID: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: false,
      },
      liked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export const User = model<IUser>("User", userSchema);
